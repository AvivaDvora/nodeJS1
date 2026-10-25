// controllers/enrollmentController.js
// תפקיד: תרגום בין HTTP ללוגיקה עסקית של הרשמות
// כל פונקציה מקבלת Promise מה-service, מטפלת בו ב-then ומחזירה ללקוח,
// ותמיד מסתיימת ב-catch שמחזיר 500 — כדי שהשרת לא יקרוס

const enrollmentService = require('../services/enrollmentService');
const BaseController = require('./BaseController');

function getAll(req, res) {
  enrollmentService.getAllEnrollments()
    .then((enrollments) => {
      res.json({ success: true, data: enrollments });
    })
    .catch((err) => BaseController.sendError(res, err));
}

function getById(req, res) {
  enrollmentService.getEnrollmentById(req.params.id)
    .then((enrollment) => {
      res.json({ success: true, data: enrollment });
    })
    .catch((err) => BaseController.sendError(res, err));
}

function create(req, res) {
  try {
    enrollmentService.createEnrollment(req.body)
      .then((newEnrollment) => {
        res.status(201).json({ success: true, data: newEnrollment });
      })
      .catch((err) => BaseController.sendError(res, err));
  } catch (err) {
    // שגיאת ולידציה סינכרונית — נזרקת לפני שה-Promise נוצר
    BaseController.sendError(res, err);
  }
}

function update(req, res) {
  try {
    enrollmentService.updateEnrollment(req.params.id, req.body)
      .then((enrollment) => {
        res.json({ success: true, data: enrollment });
      })
      .catch((err) => BaseController.sendError(res, err));
  } catch (err) {
    BaseController.sendError(res, err);
  }
}

function remove(req, res) {
  enrollmentService.deleteEnrollment(req.params.id)
    .then(() => {
      res.json({ success: true, data: { message: 'Deleted successfully' } });
    })
    .catch((err) => BaseController.sendError(res, err));
}

module.exports = { getAll, getById, create, update, remove };
