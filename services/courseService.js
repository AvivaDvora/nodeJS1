// services/courseService.js
// תפקיד: לוגיקה עסקית של קורסים — ולידציה וכללי עסקים
// כל פונקציה מחזירה Promise; שגיאות עולות ל-Controller דרך ה-catch

const courseData = require('../data/courses');
const { NotFoundError, ValidationError } = require('../utils/errors');

function getAllCourses() {
  return courseData.getAll();
}

function getCourseById(id) {
  return courseData.getById(id).then((course) => {
    if (!course) {
      throw new NotFoundError('Course not found');
    }
    return course;
  });
}

function createCourse({ name, description }) {
  if (!name || name.trim().length === 0) {
    throw new ValidationError('Name is required');
  }
  if (!description || description.trim().length === 0) {
    throw new ValidationError('Description is required');
  }
  return courseData.create({
    name: name.trim(),
    description: description.trim()
  });
}

function updateCourse(id, { name, description }) {
  return courseData.getById(id).then((course) => {
    if (!course) {
      throw new NotFoundError('Course not found');
    }
    if (name !== undefined && name.trim().length === 0) {
      throw new ValidationError('Name cannot be empty');
    }
    if (description !== undefined && description.trim().length === 0) {
      throw new ValidationError('Description cannot be empty');
    }
    return courseData.update(id, {
      name: name ? name.trim() : undefined,
      description: description ? description.trim() : undefined
    });
  });
}

function deleteCourse(id) {
  return courseData.getById(id).then((course) => {
    if (!course) {
      throw new NotFoundError('Course not found');
    }
    return courseData.remove(id);
  });
}

module.exports = { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse };
