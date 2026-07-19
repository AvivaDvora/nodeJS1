// tests/middleware.test.js
// בדיקות ל-auth middleware

const { createApp, AUTH_KEY } = require('./helpers/setup');
const supertest = require('supertest');

describe('Auth Middleware', () => {
  let request;

  beforeAll(() => {
    const app = createApp();
    request = supertest(app);
  });

  // ── בדיקות ללא auth-key ──────────────────────────────────

  describe('ללא auth-key', () => {
    it('מחזיר 401 על GET /courses', async () => {
      const res = await request.get('/courses');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('missing');
    });

    it('מחזיר 401 על GET /students', async () => {
      const res = await request.get('/students');
      expect(res.status).toBe(401);
    });

    it('מחזיר 401 על POST /courses', async () => {
      const res = await request.post('/courses');
      expect(res.status).toBe(401);
    });

    it('מחזיר 401 על GET /enrollment', async () => {
      const res = await request.get('/enrollment');
      expect(res.status).toBe(401);
    });
  });

  // ── בדיקות עם auth-key שגוי ──────────────────────────────

  describe('עם auth-key שגוי', () => {
    it('מחזיר 401 על GET /courses', async () => {
      const res = await request.get('/courses').set('auth-key', 'wrong-key');
      expect(res.status).toBe(401);
      expect(res.body.error).toContain('invalid');
    });

    it('מחזיר 401 על POST /students', async () => {
      const res = await request.post('/students').set('auth-key', 'hacker-attempt');
      expect(res.status).toBe(401);
    });
  });

  // ── בדיקות עם auth-key תקין ─────────────────────────────

  describe('עם auth-key תקין', () => {
    it('מחזיר 200 על GET /courses', async () => {
      const res = await request.get('/courses').set('auth-key', AUTH_KEY);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('מחזיר 200 על GET /students', async () => {
      const res = await request.get('/students').set('auth-key', AUTH_KEY);
      expect(res.status).toBe(200);
    });

    it('מחזיר 200 על GET /enrollment', async () => {
      const res = await request.get('/enrollment').set('auth-key', AUTH_KEY);
      expect(res.status).toBe(200);
    });

    it('מחזיר 200 על GET / (דף הבית)', async () => {
      const res = await request.get('/').set('auth-key', AUTH_KEY);
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('API is running');
    });
  });
});
