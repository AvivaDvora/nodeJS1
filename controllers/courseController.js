// controllers/courseController.js
// תפקיד: תרגום בין HTTP ללוגיקה עסקית של קורסים
// משתמש ב-BaseController למניעת כפילויות

const BaseController = require('./BaseController');
const courseService = require('../services/courseService');

module.exports = {
  getAll:   BaseController.getAll(courseService.getAllCourses),
  getById:  BaseController.getById(courseService.getCourseById),
  create:   BaseController.create(courseService.createCourse),
  update:   BaseController.update(courseService.updateCourse),
  remove:   BaseController.remove(courseService.deleteCourse)
};
