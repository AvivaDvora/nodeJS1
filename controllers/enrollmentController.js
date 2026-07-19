// controllers/enrollmentController.js
// תפקיד: תרגום בין HTTP ללוגיקה עסקית של הרשמות
// משתמש ב-BaseController למניעת כפילויות

const BaseController = require('./BaseController');
const enrollmentService = require('../services/enrollmentService');

module.exports = {
  getAll:   BaseController.getAll(enrollmentService.getAllEnrollments),
  getById:  BaseController.getById(enrollmentService.getEnrollmentById),
  create:   BaseController.create(enrollmentService.createEnrollment),
  update:   BaseController.update(enrollmentService.updateEnrollment),
  remove:   BaseController.remove(enrollmentService.deleteEnrollment)
};
