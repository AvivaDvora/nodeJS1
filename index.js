// index.js — הקובץ הראשי של הפרויקט
// תפקיד: הרכבת האפליקציה — מידלוור גלובלי, חיבור Routers, הפעלת השרת

require('dotenv').config();
const express = require('express');
const app = express();

// ======================================
// מידלוור גלובלי
// ======================================
app.use(express.json()); // פיענוח JSON מגוף הבקשה

// מידלוור אימות — רץ על כל בקשה לפני שהיא מגיעה ל-Router
const authMiddleware = require('./middleware/authMiddleware');
app.use(authMiddleware);

// ======================================
// ייבוא Routers
// ======================================
const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');

// ======================================
// דף הבית — מידע על ה-API
// ======================================
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

// ======================================
// חיבור Routers — כל Router עם הקידומת שלו
// ======================================
app.use('/courses', courseRoutes);
app.use('/students', studentRoutes);
app.use('/enrollment', enrollmentRoutes);

// ======================================
// טיפול בנתיב לא קיים
// ======================================
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Not found' });
});

// ======================================
// הפעלת השרת
// ======================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});