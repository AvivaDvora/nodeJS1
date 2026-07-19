// services/enrollmentService.js
// תפקיד: לוגיקה עסקית של הרשמות — ולידציה, בדיקת תקינות קשרים

const enrollmentData = require('../data/enrollment');
const studentData = require('../data/students');
const courseData = require('../data/courses');

function getAllEnrollments() {
  return enrollmentData.getAll();
}

function getEnrollmentById(id) {
  const enrollment = enrollmentData.getById(id);
  if (!enrollment) {
    throw new Error('Enrollment not found');
  }
  return enrollment;
}

function createEnrollment({ studentId, courseId }) {
  // בדיקת שדות חובה
  if (!studentId || !courseId) {
    throw new Error('Student ID and Course ID are required');
  }

  // בדיקה שהסטודנט קיים
  const student = studentData.getById(studentId);
  if (!student) {
    throw new Error('Student not found');
  }

  // בדיקה שהקורס קיים
  const course = courseData.getById(courseId);
  if (!course) {
    throw new Error('Course not found');
  }

  // בדיקת כפילות — אותו סטודנט לא יכול להירשם פעמיים לאותו קורס
  const existingEnrollments = enrollmentData.getByStudentId(studentId);
  const alreadyEnrolled = existingEnrollments.find(
    enroll => enroll.courseId === parseInt(courseId)
  );
  if (alreadyEnrolled) {
    throw new Error('Student is already enrolled in this course');
  }

  return enrollmentData.create({ studentId, courseId });
}

function updateEnrollment(id, { studentId, courseId }) {
  const enrollment = enrollmentData.getById(id);
  if (!enrollment) {
    throw new Error('Enrollment not found');
  }

  if (studentId !== undefined) {
    const student = studentData.getById(studentId);
    if (!student) {
      throw new Error('Student not found');
    }
  }

  if (courseId !== undefined) {
    const course = courseData.getById(courseId);
    if (!course) {
      throw new Error('Course not found');
    }
  }

  // בדיקת כפילות אחרי עדכון
  const sid = studentId !== undefined ? parseInt(studentId) : enrollment.studentId;
  const cid = courseId !== undefined ? parseInt(courseId) : enrollment.courseId;

  const existingEnrollments = enrollmentData.getByStudentId(sid);
  const duplicate = existingEnrollments.find(
    enroll => enroll.courseId === cid && enroll.id !== parseInt(id)
  );
  if (duplicate) {
    throw new Error('Student is already enrolled in this course');
  }

  return enrollmentData.update(id, { studentId, courseId });
}

function deleteEnrollment(id) {
  const enrollment = enrollmentData.getById(id);
  if (!enrollment) {
    throw new Error('Enrollment not found');
  }
  enrollmentData.remove(id);
}

module.exports = { getAllEnrollments, getEnrollmentById, createEnrollment, updateEnrollment, deleteEnrollment };