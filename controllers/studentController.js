// controllers/studentController.js
// תפקיד: תרגום בין HTTP ללוגיקה עסקית של סטודנטים
// כל פונקציה מקבלת Promise מה-service, מטפלת בו ב-then ומחזירה ללקוח,
// ותמיד מסתיימת ב-catch שמחזיר 500 — כדי שהשרת לא יקרוס

const studentService = require('../services/studentService');
const BaseController = require('./BaseController');

function getAll(req, res) {
  studentService.getAllStudents()
    .then((students) => {
      res.json({ success: true, data: students });
    })
    .catch((err) => BaseController.sendError(res, err));
}

function getById(req, res) {
  studentService.getStudentById(req.params.id)
    .then((student) => {
      res.json({ success: true, data: student });
    })
    .catch((err) => BaseController.sendError(res, err));
}

function create(req, res) {
  try {
    studentService.createStudent(req.body)
      .then((newStudent) => {
        res.status(201).json({ success: true, data: newStudent });
      })
      .catch((err) => BaseController.sendError(res, err));
  } catch (err) {
    // שגיאת ולידציה סינכרונית — נזרקת לפני שה-Promise נוצר
    BaseController.sendError(res, err);
  }
}

function update(req, res) {
  try {
    studentService.updateStudent(req.params.id, req.body)
      .then((student) => {
        res.json({ success: true, data: student });
      })
      .catch((err) => BaseController.sendError(res, err));
  } catch (err) {
    BaseController.sendError(res, err);
  }
}

function remove(req, res) {
  studentService.deleteStudent(req.params.id)
    .then(() => {
      res.json({ success: true, data: { message: 'Deleted successfully' } });
    })
    .catch((err) => BaseController.sendError(res, err));
}

module.exports = { getAll, getById, create, update, remove };
