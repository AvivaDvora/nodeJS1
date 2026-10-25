// data/courses.js
// תפקיד: שכבת נתונים של קורסים — קוראת וכותבת ל-courses.json
// כל פונקציה מחזירה Promise (הנתונים מגיעים מהדיסק, לא מהזיכרון)

const { createFileStore } = require('./fileStore');

const store = createFileStore('courses.json', 41);
const { readAll, writeAll, allocateId } = store;

function getAll() {
  return readAll();
}

function getById(id) {
  return readAll().then((courses) =>
    courses.find((course) => course.id === parseInt(id))
  );
}

async function create({ name, description }) {
  const courses = await readAll();
  const newCourse = {
    id: allocateId(courses),
    name,
    description
  };
  courses.push(newCourse);
  await writeAll(courses);
  return newCourse;
}

async function update(id, { name, description }) {
  const courses = await readAll();
  const course = courses.find((course) => course.id === parseInt(id));
  if (!course) return null;
  if (name !== undefined) course.name = name;
  if (description !== undefined) course.description = description;
  await writeAll(courses);
  return course;
}

async function remove(id) {
  const courses = await readAll();
  const index = courses.findIndex((course) => course.id === parseInt(id));
  if (index === -1) return null;
  const [removed] = courses.splice(index, 1);
  await writeAll(courses);
  return removed;
}

module.exports = { getAll, getById, create, update, remove };
