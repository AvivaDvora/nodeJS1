// controllers/courseController.js
// תפקיד: תרגום בין HTTP ללוגיקה עסקית של קורסים
// כל פונקציה מקבלת Promise מה-service, מטפלת בו ב-then ומחזירה ללקוח,
// ותמיד מסתיימת ב-catch שמחזיר 500 — כדי שהשרת לא יקרוס

const courseService = require('../services/courseService');
const BaseController = require('./BaseController');

function getAll(req, res) {
  courseService.getAllCourses()
    .then((courses) => {
      res.json({ success: true, data: courses });
    })
    .catch((err) => BaseController.sendError(res, err));
}

function getById(req, res) {
  courseService.getCourseById(req.params.id)
    .then((course) => {
      res.json({ success: true, data: course });
    })
    .catch((err) => BaseController.sendError(res, err));
}

function create(req, res) {
  try {
    courseService.createCourse(req.body)
      .then((newCourse) => {
        res.status(201).json({ success: true, data: newCourse });
      })
      .catch((err) => BaseController.sendError(res, err));
  } catch (err) {
    // שגיאת ולידציה סינכרונית — נזרקת לפני שה-Promise נוצר
    BaseController.sendError(res, err);
  }
}

function update(req, res) {
  try {
    courseService.updateCourse(req.params.id, req.body)
      .then((course) => {
        res.json({ success: true, data: course });
      })
      .catch((err) => BaseController.sendError(res, err));
  } catch (err) {
    BaseController.sendError(res, err);
  }
}

function remove(req, res) {
  courseService.deleteCourse(req.params.id)
    .then(() => {
      res.json({ success: true, data: { message: 'Deleted successfully' } });
    })
    .catch((err) => BaseController.sendError(res, err));
}

module.exports = { getAll, getById, create, update, remove };
