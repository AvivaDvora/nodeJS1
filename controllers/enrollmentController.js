// controllers/enrollmentController.js
// תפקיד: תרגום בין HTTP ללוגיקה עסקית של הרשמות

const enrollmentService = require('../services/enrollmentService');

function getAll(req, res) {
  try {
    const enrollments = enrollmentService.getAllEnrollments();
    res.json({ success: true, data: enrollments });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

function getById(req, res) {
  try {
    const id = req.params.id;
    const enrollment = enrollmentService.getEnrollmentById(id);
    res.json({ success: true, data: enrollment });
  } catch (err) {
    if (err.message === 'Enrollment not found') {
      return res.status(404).json({ success: false, error: err.message });
    }
    res.status(500).json({ success: false, error: err.message });
  }
}

function create(req, res) {
  try {
    const { studentId, courseId } = req.body;
    const enrollment = enrollmentService.createEnrollment({ studentId, courseId });
    res.status(201).json({ success: true, data: enrollment });
  } catch (err) {
    // ה-Service זורק שגיאות מתאימות — Controller רק מתרגם לסטטוס קוד
    res.status(400).json({ success: false, error: err.message });
  }
}

function update(req, res) {
  try {
    const id = req.params.id;
    const { studentId, courseId } = req.body;
    const enrollment = enrollmentService.updateEnrollment(id, { studentId, courseId });
    res.json({ success: true, data: enrollment });
  } catch (err) {
    if (err.message === 'Enrollment not found') {
      return res.status(404).json({ success: false, error: err.message });
    }
    res.status(400).json({ success: false, error: err.message });
  }
}

function remove(req, res) {
  try {
    const id = req.params.id;
    enrollmentService.deleteEnrollment(id);
    res.json({ success: true, message: 'Enrollment deleted' });
  } catch (err) {
    if (err.message === 'Enrollment not found') {
      return res.status(404).json({ success: false, error: err.message });
    }
    res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = { getAll, getById, create, update, remove };