// routes/studentRoutes.js
// תפקיד: ניתוב בקשות HTTP הקשורות לסטודנטים אל ה-Controller המתאים
// "שלום, מה הכתובת שלך? ← הנה הפונקציה שמטפלת בך"

const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// GET /students — שליפת כל הסטודנטים
router.get('/', studentController.getAll);

// GET /students/7 — שליפת סטודנט לפי מזהה
router.get('/:id', studentController.getById);

// POST /students — יצירת סטודנט חדש
// שולחים בגוף הבקשה: { "name": "...", "age": 20 }
router.post('/', studentController.create);

// PUT /students/7 — עדכון סטודנט קיים
router.put('/:id', studentController.update);

// DELETE /students/7 — מחיקת סטודנט
router.delete('/:id', studentController.remove);

module.exports = router;