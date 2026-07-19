// services/studentService.js
// תפקיד: לוגיקה עסקית של סטודנטים — ולידציה וכללי עסקים

const studentData = require('../data/students');
const { NotFoundError, ValidationError } = require('../utils/errors');

function getAllStudents() {
  return studentData.getAll();
}

function getStudentById(id) {
  const student = studentData.getById(id);
  if (!student) {
    throw new NotFoundError('Student not found');
  }
  return student;
}

function createStudent({ name, age }) {
  if (!name || name.trim().length === 0) {
    throw new ValidationError('Name is required');
  }
  if (age === undefined || age === null) {
    throw new ValidationError('Age is required');
  }
  if (typeof age !== 'number' || age < 1 || age > 120) {
    throw new ValidationError('Age must be a number between 1 and 120');
  }
  return studentData.create({
    name: name.trim(),
    age
  });
}

function updateStudent(id, { name, age }) {
  const student = studentData.getById(id);
  if (!student) {
    throw new NotFoundError('Student not found');
  }
  if (name !== undefined && name.trim().length === 0) {
    throw new ValidationError('Name cannot be empty');
  }
  if (age !== undefined) {
    if (typeof age !== 'number' || age < 1 || age > 120) {
      throw new ValidationError('Age must be a number between 1 and 120');
    }
  }
  return studentData.update(id, {
    name: name ? name.trim() : undefined,
    age: age !== undefined ? age : undefined
  });
}

function deleteStudent(id) {
  const student = studentData.getById(id);
  if (!student) {
    throw new NotFoundError('Student not found');
  }
  studentData.remove(id);
}

module.exports = { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent };
