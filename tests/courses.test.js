// tests/courses.test.js
// בדיקות unit ו-integration עבור קורסים

const { createApp, AUTH_KEY } = require('./helpers/setup');
const supertest = require('supertest');
const courseService = require('../services/courseService');
const { NotFoundError, ValidationError } = require('../utils/errors');

describe('Courses API', () => {
  let request;

  beforeAll(() => {
    const app = createApp();
    request = supertest(app);
  });

  // ══════════════════════════════════════════════════════════
  // Unit Tests — Service Layer
  // ══════════════════════════════════════════════════════════

  describe('Unit: courseService', () => {
    describe('getAllCourses', () => {
      it('מחזיר מערך לא ריק', () => {
        const courses = courseService.getAllCourses();
        expect(Array.isArray(courses)).toBe(true);
        expect(courses.length).toBeGreaterThan(0);
      });

      it('כל קורס מכיל id, name, description', () => {
        const courses = courseService.getAllCourses();
        courses.forEach(course => {
          expect(course).toHaveProperty('id');
          expect(course).toHaveProperty('name');
          expect(course).toHaveProperty('description');
        });
      });
    });

    describe('getCourseById', () => {
      it('מחזיר קורס לפי id קיים', () => {
        const course = courseService.getCourseById(1);
        expect(course.id).toBe(1);
        expect(course.name).toBe('HTML');
      });

      it('זורק NotFoundError על id לא קיים', () => {
        expect(() => courseService.getCourseById(99999)).toThrow(NotFoundError);
      });
    });

    describe('createCourse', () => {
      it('יוצר קורס חדש עם id', () => {
        const course = courseService.createCourse({ name: 'Test', description: 'Test desc' });
        expect(course).toHaveProperty('id');
        expect(course.name).toBe('Test');
        expect(course.description).toBe('Test desc');
      });

      it('זורק ValidationError על name ריק', () => {
        expect(() => courseService.createCourse({ name: '', description: 'x' }))
          .toThrow(ValidationError);
      });

      it('זורק ValidationError על description ריק', () => {
        expect(() => courseService.createCourse({ name: 'x', description: '' }))
          .toThrow(ValidationError);
      });
    });

    describe('updateCourse', () => {
      it('מעדכן קורס קיים', () => {
        // קורס 2 קיים תמיד
        const updated = courseService.updateCourse(2, { name: 'Updated Name' });
        expect(updated.name).toBe('Updated Name');
        // נשחזר
        courseService.updateCourse(2, { name: 'CSS' });
      });

      it('זורק NotFoundError על עדכון קורס לא קיים', () => {
        expect(() => courseService.updateCourse(99999, { name: 'X' }))
          .toThrow(NotFoundError);
      });
    });

    describe('deleteCourse', () => {
      it('זורק NotFoundError על מחיקת קורס לא קיים', () => {
        expect(() => courseService.deleteCourse(99999)).toThrow(NotFoundError);
      });
    });
  });

  // ══════════════════════════════════════════════════════════
  // Integration Tests — HTTP
  // ══════════════════════════════════════════════════════════

  describe('Integration: HTTP', () => {
    const auth = { 'auth-key': AUTH_KEY };

    it('GET /courses מחזיר 200 ומערך', async () => {
      const res = await request.get('/courses').set(auth);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('GET /courses/:id מחזיר קורס בודד', async () => {
      const res = await request.get('/courses/1').set(auth);
      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(1);
    });

    it('GET /courses/:id — 404 על id לא קיים', async () => {
      const res = await request.get('/courses/99999').set(auth);
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });

    it('POST /courses יוצר קורס ומחזיר 201', async () => {
      const res = await request.post('/courses').set(auth).send({
        name: 'Integration Test Course',
        description: 'Created during test'
      });
      expect(res.status).toBe(201);
      expect(res.body.data.name).toBe('Integration Test Course');
      expect(res.body.data).toHaveProperty('id');
    });

    it('POST /courses — 400 על name חסר', async () => {
      const res = await request.post('/courses').set(auth).send({ name: '' });
      expect(res.status).toBe(400);
    });

    it('PUT /courses/:id מעדכן קורס', async () => {
      const res = await request.put('/courses/3').set(auth).send({ name: 'JavaScript Updated' });
      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe('JavaScript Updated');
      // שחזור
      await request.put('/courses/3').set(auth).send({ name: 'JavaScript' });
    });

    it('PUT /courses/:id — 404 על id לא קיים', async () => {
      const res = await request.put('/courses/99999').set(auth).send({ name: 'X' });
      expect(res.status).toBe(404);
    });

    it('DELETE /courses/:id — 404 על id לא קיים', async () => {
      const res = await request.delete('/courses/99999').set(auth);
      expect(res.status).toBe(404);
    });
  });
});
