// data/students.js
// תפקיד: שכבת נתונים של סטודנטים — קוראת וכותבת ל-students.json
// כל פונקציה מחזירה Promise (הנתונים מגיעים מהדיסק, לא מהזיכרון)

const { createFileStore } = require('./fileStore');

const store = createFileStore('students.json', 158);
const { readAll, writeAll, allocateId } = store;

function getAll() {
  return readAll();
}

function getById(id) {
  return readAll().then((students) =>
    students.find((student) => student.id === parseInt(id))
  );
}

async function create({ name, age }) {
  const students = await readAll();
  const newStudent = {
    id: allocateId(students),
    name,
    age
  };
  students.push(newStudent);
  await writeAll(students);
  return newStudent;
}

async function update(id, { name, age }) {
  const students = await readAll();
  const student = students.find((student) => student.id === parseInt(id));
  if (!student) return null;
  if (name !== undefined) student.name = name;
  if (age !== undefined) student.age = age;
  await writeAll(students);
  return student;
}

async function remove(id) {
  const students = await readAll();
  const index = students.findIndex((student) => student.id === parseInt(id));
  if (index === -1) return null;
  const [removed] = students.splice(index, 1);
  await writeAll(students);
  return removed;
}

module.exports = { getAll, getById, create, update, remove };
