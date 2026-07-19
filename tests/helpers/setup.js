// tests/helpers/setup.js
// תפקיד: יצירת אפליקציית Express לבדיקות אינטגרציה עם supertest
// מפרידים את יצירת ה-app מהאזנה לפורט — כדי ש-supertest יוכל לבדוק בלי פורט אמיתי

const express = require('express');
const supertest = require('supertest');

// מייבאים את המידלוור וה-routers (בלי app.listen)
const authMiddleware = require('../../middleware/authMiddleware');
const courseRoutes = require('../../routes/courseRoutes');
const studentRoutes = require('../../routes/studentRoutes');
const enrollmentRoutes = require('../../routes/enrollmentRoutes');

function createApp() {
  const app = express();

  // מידלוור גלובלי — חוזר על הסדר מ-index.js
  app.use(express.json());
  app.use(authMiddleware);

  // דף הבית
  app.get('/', (req, res) => {
    res.json({
      success: true,
      message: 'API is running',
      routes: {
        courses: '/courses',
        students: '/students',
        enrollment: '/enrollment'
      }
    });
  });

  // Routers
  app.use('/courses', courseRoutes);
  app.use('/students', studentRoutes);
  app.use('/enrollment', enrollmentRoutes);

  // 404
  app.use((req, res) => {
    res.status(404).json({ success: false, error: 'Not found' });
  });

  return app;
}

const AUTH_KEY = 'my-secret-key-2024';

module.exports = { createApp, AUTH_KEY };
