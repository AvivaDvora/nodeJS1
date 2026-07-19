// services/courseService.js
// תפקיד: לוגיקה עסקית של קורסים — ולידציה וכללי עסקים

const courseData = require('../data/courses');

function getAllCourses() {
  return courseData.getAll();
}

function getCourseById(id) {
  const course = courseData.getById(id);
  if (!course) {
    throw new Error('Course not found');
  }
  return course;
}

function createCourse({ name, description }) {
  if (!name || name.trim().length === 0) {
    throw new Error('Name is required');
  }
  if (!description || description.trim().length === 0) {
    throw new Error('Description is required');
  }
  return courseData.create({
    name: name.trim(),
    description: description.trim()
  });
}

function updateCourse(id, { name, description }) {
  const course = courseData.getById(id);
  if (!course) {
    throw new Error('Course not found');
  }
  if (name !== undefined && name.trim().length === 0) {
    throw new Error('Name cannot be empty');
  }
  if (description !== undefined && description.trim().length === 0) {
    throw new Error('Description cannot be empty');
  }
  return courseData.update(id, {
    name: name ? name.trim() : undefined,
    description: description ? description.trim() : undefined
  });
}

function deleteCourse(id) {
  const course = courseData.getById(id);
  if (!course) {
    throw new Error('Course not found');
  }
  courseData.remove(id);
}

module.exports = { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse };