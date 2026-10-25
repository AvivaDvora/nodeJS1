// services/enrollmentService.js
// תפקיד: לוגיקה עסקית של הרשמות — ולידציה, בדיקת תקינות קשרים
// כל פונקציה מחזירה Promise; בדיקות תלויות-נתונים יושבות בתוך ה-then

const enrollmentData = require('../data/enrollment');
const studentData = require('../data/students');
const courseData = require('../data/courses');
const { NotFoundError, ValidationError, DuplicateError } = require('../utils/errors');

function getAllEnrollments() {
  return enrollmentData.getAll();
}

function getEnrollmentById(id) {
  return enrollmentData.getById(id).then((enrollment) => {
    if (!enrollment) {
      throw new NotFoundError('Enrollment not found');
    }
    return enrollment;
  });
}

function createEnrollment({ studentId, courseId }) {
  // בדיקת שדות חובה
  if (!studentId || !courseId) {
    throw new ValidationError('Student ID and Course ID are required');
  }

  // הסטודנט והקורס נקראים במקביל — אין תלות ביניהם
  return Promise.all([
    studentData.getById(studentId),
    courseData.getById(courseId)
  ])
    .then(([student, course]) => {
      if (!student) {
        throw new NotFoundError('Student not found');
      }
      if (!course) {
        throw new NotFoundError('Course not found');
      }
      // בדיקת כפילות — אותו סטודנט לא יכול להירשם פעמיים לאותו קורס
      return enrollmentData.getByStudentId(studentId);
    })
    .then((existingEnrollments) => {
      const alreadyEnrolled = existingEnrollments.find(
        (enroll) => enroll.courseId === parseInt(courseId)
      );
      if (alreadyEnrolled) {
        throw new DuplicateError('Student is already enrolled in this course');
      }
      return enrollmentData.create({ studentId, courseId });
    });
}

function updateEnrollment(id, { studentId, courseId }) {
  return enrollmentData.getById(id).then((enrollment) => {
    if (!enrollment) {
      throw new NotFoundError('Enrollment not found');
    }

    // אם נשלח studentId — בדיקה שהסטודנט החדש קיים
    const studentCheck = studentId === undefined
      ? Promise.resolve(true)
      : studentData.getById(studentId).then((student) => {
          if (!student) {
            throw new NotFoundError('Student not found');
          }
          return true;
        });

    // אם נשלח courseId — בדיקה שהקורס החדש קיים
    const courseCheck = courseId === undefined
      ? Promise.resolve(true)
      : courseData.getById(courseId).then((course) => {
          if (!course) {
            throw new NotFoundError('Course not found');
          }
          return true;
        });

    // שתי הבדיקות בלתי תלויות — רצות במקביל
    return Promise.all([studentCheck, courseCheck]).then(() => {
      // בדיקת כפילות (רק אם אחד השדות השתנה)
      const sid = studentId !== undefined ? parseInt(studentId) : enrollment.studentId;
      const cid = courseId !== undefined ? parseInt(courseId) : enrollment.courseId;

      return enrollmentData.getByStudentId(sid).then((existingEnrollments) => {
        const duplicate = existingEnrollments.find(
          (enroll) => enroll.courseId === cid && enroll.id !== parseInt(id)
        );
        if (duplicate) {
          throw new DuplicateError('Student is already enrolled in this course');
        }
        return enrollmentData.update(id, { studentId, courseId });
      });
    });
  });
}

function deleteEnrollment(id) {
  return enrollmentData.getById(id).then((enrollment) => {
    if (!enrollment) {
      throw new NotFoundError('Enrollment not found');
    }
    return enrollmentData.remove(id);
  });
}

module.exports = { getAllEnrollments, getEnrollmentById, createEnrollment, updateEnrollment, deleteEnrollment };
