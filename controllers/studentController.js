// controllers/studentController.js
// תפקיד: תרגום בין HTTP ללוגיקה עסקית של סטודנטים
// משתמש ב-BaseController למניעת כפילויות

const BaseController = require('./BaseController');
const studentService = require('../services/studentService');

module.exports = {
  getAll:   BaseController.getAll(studentService.getAllStudents),
  getById:  BaseController.getById(studentService.getStudentById),
  create:   BaseController.create(studentService.createStudent),
  update:   BaseController.update(studentService.updateStudent),
  remove:   BaseController.remove(studentService.deleteStudent)
};
