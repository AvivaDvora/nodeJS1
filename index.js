
const express = require('express');
const app = express();
const { courses } = require('./courses.js');
const { students } = require('./students.js');

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    routes: {
      courses: '/courses',
      students: '/students'
    }
  });
});

app.get('/courses', (req, res) => {
  res.json({ success: true, data: courses });
});

app.get('/students', (req, res) => {
  res.json({ success: true, data: students });
});

app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Not found' });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');

});