// routes/enrollmentRoutes.js
// תפקיד: ניתוב בקשות HTTP הקשורות להרשמות אל ה-Controller המתאים

const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');

// GET /enrollment — שליפת כל ההרשמות
router.get('/', enrollmentController.getAll);

// GET /enrollment/3 — שליפת הרשמה אחת לפי המזהה שלה
router.get('/:id', enrollmentController.getById);

// POST /enrollment — יצירת הרשמה חדשה
// שולחים: { "studentId": 1, "courseId": 5 }
// הלוגיקה (בדיקת קיום, מניעת כפילות) כבר מטופלת ב-Service
router.post('/', enrollmentController.create);

// PUT /enrollment/3 — עדכון הרשמה (שינוי קורס או סטודנט)
router.put('/:id', enrollmentController.update);

// DELETE /enrollment/3 — מחיקת הרשמה (ביטול רישום לקורס)
router.delete('/:id', enrollmentController.remove);

module.exports = router;