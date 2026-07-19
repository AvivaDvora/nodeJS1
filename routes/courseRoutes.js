// routes/courseRoutes.js
// תפקיד: ניתוב בקשות HTTP הקשורות לקורסים אל ה-Controller המתאים
// ה-Router הוא "מפת דרכים" — מפנה, לא מטפל

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// GET /courses — שליפת כל הקורסים
// דוגמה: הדפדפן מבקש /courses ← תן לי את הרשימה המלאה
router.get('/', courseController.getAll);

// GET /courses/5 — שליפת קורס אחד לפי המזהה שלו
// דוגמה: הדפדפן מבקש /courses/5 ← תן לי את הקורס שמספרו 5
// הפרמטר :id נכנס אוטומטית ל-req.params.id
router.get('/:id', courseController.getById);

// POST /courses — יצירת קורס חדש
// דוגמה: שליחת טופס עם name ו-description ← צור קורס ושמור אותו
router.post('/', courseController.create);

// PUT /courses/5 — עדכון קורס קיים
// דוגמה: שינוי השם של קורס 5 ← עדכן את השדות שנשלחו
router.put('/:id', courseController.update);

// DELETE /courses/5 — מחיקת קורס
// דוגמה: מחיקת קורס 5 מהמערכת
router.delete('/:id', courseController.remove);

module.exports = router;