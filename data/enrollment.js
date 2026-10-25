// data/enrollment.js
// תפקיד: שכבת נתונים של הרשמות — קוראת וכותבת ל-enrollment.json
// כל פונקציה מחזירה Promise (הנתונים מגיעים מהדיסק, לא מהזיכרון)

const { createFileStore } = require('./fileStore');

const store = createFileStore('enrollment.json', 11);
const { readAll, writeAll, allocateId } = store;

function getAll() {
  return readAll();
}

function getById(id) {
  return readAll().then((enrollments) =>
    enrollments.find((enroll) => enroll.id === parseInt(id))
  );
}

function getByStudentId(studentId) {
  return readAll().then((enrollments) =>
    enrollments.filter((enroll) => enroll.studentId === parseInt(studentId))
  );
}

function getByCourseId(courseId) {
  return readAll().then((enrollments) =>
    enrollments.filter((enroll) => enroll.courseId === parseInt(courseId))
  );
}

async function create({ studentId, courseId }) {
  const enrollments = await readAll();
  const newEnrollment = {
    id: allocateId(enrollments),
    studentId: parseInt(studentId),
    courseId: parseInt(courseId)
  };
  enrollments.push(newEnrollment);
  await writeAll(enrollments);
  return newEnrollment;
}

async function update(id, { studentId, courseId }) {
  const enrollments = await readAll();
  const enroll = enrollments.find((enroll) => enroll.id === parseInt(id));
  if (!enroll) return null;
  if (studentId !== undefined) enroll.studentId = parseInt(studentId);
  if (courseId !== undefined) enroll.courseId = parseInt(courseId);
  await writeAll(enrollments);
  return enroll;
}

async function remove(id) {
  const enrollments = await readAll();
  const index = enrollments.findIndex((enroll) => enroll.id === parseInt(id));
  if (index === -1) return null;
  const [removed] = enrollments.splice(index, 1);
  await writeAll(enrollments);
  return removed;
}

module.exports = { getAll, getById, getByStudentId, getByCourseId, create, update, remove };
