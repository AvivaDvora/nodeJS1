const enrollment = [
  { id: 1, studentId: 1, courseId: 1 },
  { id: 2, studentId: 1, courseId: 2 },
  { id: 3, studentId: 1, courseId: 3 },
  { id: 4, studentId: 2, courseId: 2 },
  { id: 5, studentId: 2, courseId: 4 },
  { id: 6, studentId: 3, courseId: 1 },
  { id: 7, studentId: 3, courseId: 5 },
  { id: 8, studentId: 4, courseId: 3 },
  { id: 9, studentId: 5, courseId: 4 },
  { id: 10, studentId: 6, courseId: 1 }
];

let nextId = 11; // ממשיך מהמזהה האחרון שהיה ב-index.js המקורי

function getAll() {
  return enrollment;
}

function getById(id) {
  return enrollment.find(enroll => enroll.id === parseInt(id));
}

function getByStudentId(studentId) {
  return enrollment.filter(enroll => enroll.studentId === parseInt(studentId));
}

function getByCourseId(courseId) {
  return enrollment.filter(enroll => enroll.courseId === parseInt(courseId));
}

function create({ studentId, courseId }) {
  const newEnrollment = {
    id: nextId++,
    studentId: parseInt(studentId),
    courseId: parseInt(courseId)
  };
  enrollment.push(newEnrollment);
  return newEnrollment;
}

function update(id, { studentId, courseId }) {
  const enroll = getById(id);
  if (!enroll) return null;
  if (studentId !== undefined) enroll.studentId = parseInt(studentId);
  if (courseId !== undefined) enroll.courseId = parseInt(courseId);
  return enroll;
}

function remove(id) {
  const index = enrollment.findIndex(enroll => enroll.id === parseInt(id));
  if (index === -1) return null;
  return enrollment.splice(index, 1)[0];
}

module.exports = { getAll, getById, getByStudentId, getByCourseId, create, update, remove };