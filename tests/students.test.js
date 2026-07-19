// tests/students.test.js
// בדיקות unit ו-integration עבור סטודנטים

const { createApp, AUTH_KEY } = require('./helpers/setup');
const supertest = require('supertest');
const studentService = require('../services/studentService');
const { NotFoundError, ValidationError } = require('../utils/errors');

describe('Students API', () => {
  let request;

  beforeAll(() => {
    const app = createApp();
    request = supertest(app);
  });

  // ══════════════════════════════════════════════════════════
  // Unit Tests — Service Layer
  // ══════════════════════════════════════════════════════════

  describe('Unit: studentService', () => {
    describe('getAllStudents', () => {
      it('מחזיר מערך לא ריק', () => {
        const students = studentService.getAllStudents();
        expect(Array.isArray(students)).toBe(true);
        expect(students.length).toBeGreaterThan(0);
      });

      it('כל סטודנט מכיל id, name, age', () => {
        const students = studentService.getAllStudents();
        students.forEach(student => {
          expect(student).toHaveProperty('id');
          expect(student).toHaveProperty('name');
          expect(student).toHaveProperty('age');
        });
      });
    });

    describe('getStudentById', () => {
      it('מחזיר סטודנט לפי id קיים', () => {
        const student = studentService.getStudentById(1);
        expect(student.id).toBe(1);
      });

      it('זורק NotFoundError על id לא קיים', () => {
        expect(() => studentService.getStudentById(99999)).toThrow(NotFoundError);
      });
    });

    describe('createStudent', () => {
      it('יוצר סטודנט חדש עם id', () => {
        const student = studentService.createStudent({ name: 'ישראל ישראלי', age: 25 });
        expect(student).toHaveProperty('id');
        expect(student.name).toBe('ישראל ישראלי');
        expect(student.age).toBe(25);
      });

      it('זורק ValidationError על name ריק', () => {
        expect(() => studentService.createStudent({ name: '', age: 20 }))
          .toThrow(ValidationError);
      });

      it('זורק ValidationError על גיל מחוץ לטווח (גבוה מדי)', () => {
        expect(() => studentService.createStudent({ name: 'Test', age: 150 }))
          .toThrow(ValidationError);
      });

      it('זורק ValidationError על גיל מחוץ לטווח (נמוך מדי)', () => {
        expect(() => studentService.createStudent({ name: 'Test', age: 0 }))
          .toThrow(ValidationError);
      });

      it('זורק ValidationError על גיל לא מספר', () => {
        expect(() => studentService.createStudent({ name: 'Test', age: 'twenty' }))
          .toThrow(ValidationError);
      });

      it('זורק ValidationError על age חסר', () => {
        expect(() => studentService.createStudent({ name: 'Test' }))
          .toThrow(ValidationError);
      });
    });

    describe('updateStudent', () => {
      it('מעדכן סטודנט קיים', () => {
        // סטודנט 5 קיים תמיד
        const updated = studentService.updateStudent(5, { name: 'משה כהן', age: 30 });
        expect(updated.name).toBe('משה כהן');
        expect(updated.age).toBe(30);
        // נשחזר
        studentService.updateStudent(5, { name: 'Eve Shalev', age: 20 });
      });

      it('זורק NotFoundError על עדכון סטודנט לא קיים', () => {
        expect(() => studentService.updateStudent(99999, { name: 'X' }))
          .toThrow(NotFoundError);
      });

      it('זורק ValidationError על גיל לא חוקי בעדכון', () => {
        expect(() => studentService.updateStudent(1, { age: -5 }))
          .toThrow(ValidationError);
      });
    });

    describe('deleteStudent', () => {
      it('זורק NotFoundError על מחיקת סטודנט לא קיים', () => {
        expect(() => studentService.deleteStudent(99999)).toThrow(NotFoundError);
      });
    });
  });

  // ══════════════════════════════════════════════════════════
  // Integration Tests — HTTP
  // ══════════════════════════════════════════════════════════

  describe('Integration: HTTP', () => {
    const auth = { 'auth-key': AUTH_KEY };

    it('GET /students מחזיר 200 ומערך', async () => {
      const res = await request.get('/students').set(auth);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('GET /students/:id מחזיר סטודנט בודד', async () => {
      const res = await request.get('/students/1').set(auth);
      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(1);
    });

    it('GET /students/:id — 404 על id לא קיים', async () => {
      const res = await request.get('/students/99999').set(auth);
      expect(res.status).toBe(404);
    });

    it('POST /students יוצר סטודנט ומחזיר 201', async () => {
      const res = await request.post('/students').set(auth).send({
        name: 'מנחם מנדל',
        age: 22
      });
      expect(res.status).toBe(201);
      expect(res.body.data.name).toBe('מנחם מנדל');
      expect(res.body.data).toHaveProperty('id');
    });

    it('POST /students — 400 על גיל לא חוקי', async () => {
      const res = await request.post('/students').set(auth).send({
        name: 'Test',
        age: 200
      });
      expect(res.status).toBe(400);
    });

    it('POST /students — 400 על name חסר', async () => {
      const res = await request.post('/students').set(auth).send({ age: 20 });
      expect(res.status).toBe(400);
    });

    it('PUT /students/:id — 404 על id לא קיים', async () => {
      const res = await request.put('/students/99999').set(auth).send({ name: 'X' });
      expect(res.status).toBe(404);
    });

    it('DELETE /students/:id — 404 על id לא קיים', async () => {
      const res = await request.delete('/students/99999').set(auth);
      expect(res.status).toBe(404);
    });
  });
});
