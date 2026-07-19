// tests/enrollment.test.js
// בדיקות unit ו-integration עבור הרשמות

const { createApp, AUTH_KEY } = require('./helpers/setup');
const supertest = require('supertest');
const enrollmentService = require('../services/enrollmentService');
const { NotFoundError, ValidationError, DuplicateError } = require('../utils/errors');

describe('Enrollment API', () => {
  let request;

  beforeAll(() => {
    const app = createApp();
    request = supertest(app);
  });

  // ══════════════════════════════════════════════════════════
  // Unit Tests — Service Layer
  // ══════════════════════════════════════════════════════════

  describe('Unit: enrollmentService', () => {
    describe('getAllEnrollments', () => {
      it('מחזיר מערך לא ריק', () => {
        const enrollments = enrollmentService.getAllEnrollments();
        expect(Array.isArray(enrollments)).toBe(true);
        expect(enrollments.length).toBeGreaterThan(0);
      });

      it('כל הרשמה מכילה id, studentId, courseId', () => {
        const enrollments = enrollmentService.getAllEnrollments();
        enrollments.forEach(enroll => {
          expect(enroll).toHaveProperty('id');
          expect(enroll).toHaveProperty('studentId');
          expect(enroll).toHaveProperty('courseId');
        });
      });
    });

    describe('getEnrollmentById', () => {
      it('מחזיר הרשמה לפי id קיים', () => {
        const enrollment = enrollmentService.getEnrollmentById(1);
        expect(enrollment.id).toBe(1);
      });

      it('זורק NotFoundError על id לא קיים', () => {
        expect(() => enrollmentService.getEnrollmentById(99999)).toThrow(NotFoundError);
      });
    });

    describe('createEnrollment', () => {
      it('יוצר הרשמה חדשה (סטודנט 7, קורס 6 — לא קיים עדיין)', () => {
        const enrollment = enrollmentService.createEnrollment({ studentId: 7, courseId: 6 });
        expect(enrollment).toHaveProperty('id');
        expect(enrollment.studentId).toBe(7);
        expect(enrollment.courseId).toBe(6);
      });

      it('זורק ValidationError על שדות חסרים', () => {
        expect(() => enrollmentService.createEnrollment({ studentId: 1 }))
          .toThrow(ValidationError);
      });

      it('זורק NotFoundError על studentId לא קיים', () => {
        expect(() => enrollmentService.createEnrollment({ studentId: 99999, courseId: 1 }))
          .toThrow(NotFoundError);
      });

      it('זורק NotFoundError על courseId לא קיים', () => {
        expect(() => enrollmentService.createEnrollment({ studentId: 1, courseId: 99999 }))
          .toThrow(NotFoundError);
      });

      it('זורק DuplicateError על הרשמה כפולה', () => {
        // student 1, course 1 — already exists in data
        expect(() => enrollmentService.createEnrollment({ studentId: 1, courseId: 1 }))
          .toThrow(DuplicateError);
      });
    });

    describe('updateEnrollment', () => {
      it('זורק NotFoundError על עדכון הרשמה לא קיימת', () => {
        expect(() => enrollmentService.updateEnrollment(99999, { studentId: 1 }))
          .toThrow(NotFoundError);
      });
    });

    describe('deleteEnrollment', () => {
      it('זורק NotFoundError על מחיקת הרשמה לא קיימת', () => {
        expect(() => enrollmentService.deleteEnrollment(99999)).toThrow(NotFoundError);
      });
    });
  });

  // ══════════════════════════════════════════════════════════
  // Integration Tests — HTTP
  // ══════════════════════════════════════════════════════════

  describe('Integration: HTTP', () => {
    const auth = { 'auth-key': AUTH_KEY };

    it('GET /enrollment מחזיר 200 ומערך', async () => {
      const res = await request.get('/enrollment').set(auth);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('GET /enrollment/:id מחזיר הרשמה בודדת', async () => {
      const res = await request.get('/enrollment/1').set(auth);
      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(1);
    });

    it('GET /enrollment/:id — 404 על id לא קיים', async () => {
      const res = await request.get('/enrollment/99999').set(auth);
      expect(res.status).toBe(404);
    });

    it('POST /enrollment יוצר הרשמה ומחזיר 201', async () => {
      // סטודנט 8, קורס 7 — לא קיימים בנתוני ההרשמה
      const res = await request.post('/enrollment').set(auth).send({
        studentId: 8,
        courseId: 7
      });
      expect(res.status).toBe(201);
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data.studentId).toBe(8);
    });

    it('POST /enrollment — 400 על שדות חסרים', async () => {
      const res = await request.post('/enrollment').set(auth).send({ studentId: 1 });
      expect(res.status).toBe(400);
    });

    it('POST /enrollment — 404 על studentId לא קיים', async () => {
      const res = await request.post('/enrollment').set(auth).send({
        studentId: 99999,
        courseId: 1
      });
      expect(res.status).toBe(404);
    });

    it('POST /enrollment — 409 על הרשמה כפולה', async () => {
      const res = await request.post('/enrollment').set(auth).send({
        studentId: 1,
        courseId: 1
      });
      expect(res.status).toBe(409);
    });

    it('PUT /enrollment/:id — 404 על id לא קיים', async () => {
      const res = await request.put('/enrollment/99999').set(auth).send({ courseId: 2 });
      expect(res.status).toBe(404);
    });

    it('DELETE /enrollment/:id — 404 על id לא קיים', async () => {
      const res = await request.delete('/enrollment/99999').set(auth);
      expect(res.status).toBe(404);
    });
  });
});
