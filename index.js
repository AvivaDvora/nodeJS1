
const express = require('express');
const app = express();

app.use(express.json());

const { courses } = require('./courses.js');
const { students } = require('./students.js');
const { enrollment } = require('./enrollment.js');

let nextCourseId = 41;
let nextStudentId = 158;
let nextEnrollmentId = 11;

// Helper Functions - מניעת חזרתיות
function findById(array, id) {
  return array.find(item => item.id === parseInt(id));
}

function findIndexById(array, id) {
  return array.findIndex(item => item.id === parseInt(id));
}

function removeById(array, id) {
  const index = findIndexById(array, id);
  if (index === -1) return null;
  return array.splice(index, 1)[0];
}

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    routes: {
      courses: '/courses',
      students: '/students',
      enrollment: '/enrollment'
    }
  });
});

app.get('/courses', (req, res) => {
  res.json({ success: true, data: courses });
});

app.get('/courses/:id', (req, res) => {
  const course = findById(courses, req.params.id);
  if (!course) {
    return res.status(404).json({ success: false, error: 'Course not found' });
  }
  res.json({ success: true, data: course });
});

app.post('/courses', (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ success: false, error: 'Name and description are required' });
  }
  const newCourse = {
    id: nextCourseId++,
    name,
    description
  };
  courses.push(newCourse);
  res.status(201).json({ success: true, data: newCourse });
});

app.put('/courses/:id', (req, res) => {
  const course = findById(courses, req.params.id);
  if (!course) {
    return res.status(404).json({ success: false, error: 'Course not found' });
  }
  if (req.body.name) course.name = req.body.name;
  if (req.body.description) course.description = req.body.description;
  res.json({ success: true, data: course });
});

app.delete('/courses/:id', (req, res) => {
  const deletedCourse = removeById(courses, req.params.id);
  if (!deletedCourse) {
    return res.status(404).json({ success: false, error: 'Course not found' });
  }
  res.json({ success: true, message: 'Course deleted', data: deletedCourse });
});

app.get('/students', (req, res) => {
  res.json({ success: true, data: students });
});

app.get('/students/:id', (req, res) => {
  const student = findById(students, req.params.id);
  if (!student) {
    return res.status(404).json({ success: false, error: 'Student not found' });
  }
  res.json({ success: true, data: student });
});

app.post('/students', (req, res) => {
  const { name, age } = req.body;
  if (!name || age === undefined) {
    return res.status(400).json({ success: false, error: 'Name and age are required' });
  }
  const newStudent = {
    id: nextStudentId++,
    name,
    age
  };
  students.push(newStudent);
  res.status(201).json({ success: true, data: newStudent });
});

app.put('/students/:id', (req, res) => {
  const student = findById(students, req.params.id);
  if (!student) {
    return res.status(404).json({ success: false, error: 'Student not found' });
  }
  if (req.body.name) student.name = req.body.name;
  if (req.body.age !== undefined) student.age = req.body.age;
  res.json({ success: true, data: student });
});

app.delete('/students/:id', (req, res) => {
  const deletedStudent = removeById(students, req.params.id);
  if (!deletedStudent) {
    return res.status(404).json({ success: false, error: 'Student not found' });
  }
  res.json({ success: true, message: 'Student deleted', data: deletedStudent });
});

app.get('/enrollment', (req, res) => {
  res.json({ success: true, data: enrollment });
});

app.get('/enrollment/:id', (req, res) => {
  const enroll = findById(enrollment, req.params.id);
  if (!enroll) {
    return res.status(404).json({ success: false, error: 'Enrollment not found' });
  }
  res.json({ success: true, data: enroll });
});

app.post('/enrollment', (req, res) => {
  const { studentId, courseId } = req.body;
  if (!studentId || !courseId) {
    return res.status(400).json({ success: false, error: 'Student ID and Course ID are required' });
  }
  const student = findById(students, studentId);
  const course = findById(courses, courseId);
  if (!student || !course) {
    return res.status(404).json({ success: false, error: 'Student or Course not found' });
  }
  const newEnrollment = {
    id: nextEnrollmentId++,
    studentId,
    courseId
  };
  enrollment.push(newEnrollment);
  res.status(201).json({ success: true, data: newEnrollment });
});

app.put('/enrollment/:id', (req, res) => {
  const enroll = findById(enrollment, req.params.id);
  if (!enroll) {
    return res.status(404).json({ success: false, error: 'Enrollment not found' });
  }
  if (req.body.studentId) {
    const student = findById(students, req.body.studentId);
    if (!student) {
      return res.status(404).json({ success: false, error: 'Student not found' });
    }
    enroll.studentId = req.body.studentId;
  }
  if (req.body.courseId) {
    const course = findById(courses, req.body.courseId);
    if (!course) {
      return res.status(404).json({ success: false, error: 'Course not found' });
    }
    enroll.courseId = req.body.courseId;
  }
  res.json({ success: true, data: enroll });
});

app.delete('/enrollment/:id', (req, res) => {
  const deletedEnrollment = removeById(enrollment, req.params.id);
  if (!deletedEnrollment) {
    return res.status(404).json({ success: false, error: 'Enrollment not found' });
  }
  res.json({ success: true, message: 'Enrollment deleted', data: deletedEnrollment });
});

app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Not found' });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});