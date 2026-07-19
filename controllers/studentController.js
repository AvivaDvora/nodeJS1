// controllers/studentController.js
// תפקיד: תרגום בין HTTP ללוגיקה עסקית של סטודנטים

const studentService = require('../services/studentService');

function getAll(req, res) {
  try {
    const students = studentService.getAllStudents();
    res.json({ success: true, data: students });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

function getById(req, res) {
  try {
    const id = req.params.id;
    const student = studentService.getStudentById(id);
    res.json({ success: true, data: student });
  } catch (err) {
    if (err.message === 'Student not found') {
      return res.status(404).json({ success: false, error: err.message });
    }
    res.status(500).json({ success: false, error: err.message });
  }
}

function create(req, res) {
  try {
    const { name, age } = req.body;
    const student = studentService.createStudent({ name, age });
    res.status(201).json({ success: true, data: student });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

function update(req, res) {
  try {
    const id = req.params.id;
    const { name, age } = req.body;
    const student = studentService.updateStudent(id, { name, age });
    res.json({ success: true, data: student });
  } catch (err) {
    if (err.message === 'Student not found') {
      return res.status(404).json({ success: false, error: err.message });
    }
    res.status(400).json({ success: false, error: err.message });
  }
}

function remove(req, res) {
  try {
    const id = req.params.id;
    studentService.deleteStudent(id);
    res.json({ success: true, message: 'Student deleted' });
  } catch (err) {
    if (err.message === 'Student not found') {
      return res.status(404).json({ success: false, error: err.message });
    }
    res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = { getAll, getById, create, update, remove };