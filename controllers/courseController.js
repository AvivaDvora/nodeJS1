// controllers/courseController.js
// תפקיד: תרגום בין HTTP ללוגיקה עסקית של קורסים
// כל פונקציה: מחלצת מ-req ← קוראת ל-Service ← מחזירה דרך res

const courseService = require('../services/courseService');

function getAll(req, res) {
  try {
    const courses = courseService.getAllCourses();
    res.json({ success: true, data: courses });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

function getById(req, res) {
  try {
    const id = req.params.id;
    const course = courseService.getCourseById(id);
    res.json({ success: true, data: course });
  } catch (err) {
    if (err.message === 'Course not found') {
      return res.status(404).json({ success: false, error: err.message });
    }
    res.status(500).json({ success: false, error: err.message });
  }
}

function create(req, res) {
  try {
    const { name, description } = req.body;
    const course = courseService.createCourse({ name, description });
    res.status(201).json({ success: true, data: course });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

function update(req, res) {
  try {
    const id = req.params.id;
    const { name, description } = req.body;
    const course = courseService.updateCourse(id, { name, description });
    res.json({ success: true, data: course });
  } catch (err) {
    if (err.message === 'Course not found') {
      return res.status(404).json({ success: false, error: err.message });
    }
    res.status(400).json({ success: false, error: err.message });
  }
}

function remove(req, res) {
  try {
    const id = req.params.id;
    courseService.deleteCourse(id);
    res.json({ success: true, message: 'Course deleted' });
  } catch (err) {
    if (err.message === 'Course not found') {
      return res.status(404).json({ success: false, error: err.message });
    }
    res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = { getAll, getById, create, update, remove };