const http = require('http');
const chalk = require('chalk');
const Mycourses = [
  { id: 1, name: 'HTML', description: 'HyperText Markup Language' },
  { id: 2, name: 'CSS', description: 'Cascading Style Sheets' },
  { id: 3, name: 'JavaScript', description: 'Programming Language for Web Development' },
  { id: 4, name: 'Node.js', description: 'JavaScript Runtime Environment' },
  { id: 5, name: 'React', description: 'JavaScript Library for Building User Interfaces' },
  { id: 6, name: 'Express.js', description: 'Web Application Framework for Node.js' },
  { id: 7, name: 'MongoDB', description: 'NoSQL Database for Storing Data' },
  { id: 8, name: 'Git', description: 'Version Control System for Tracking Changes in Code' },
  { id: 9, name: 'GitHub', description: 'Web-based Platform for Hosting and Collaborating on Git Repositories' }
];
function buildHtml() {
  const courseItems = Mycourses
    .map(course => `
      <li>
        <strong>${course.name}</strong>
        <p>${course.description}</p>
      </li>
    `)
    .join('');
  return `
    <!DOCTYPE html>

    <html lang="he">
      <head>
        <meta charset="UTF-8" />
        <title>רשימת קורסים</title>
      </head>
      <body>
        <h1>רשימת קורסים</h1>
        <ul>${courseItems}</ul>
      </body>
    </html>
  `;
}
function logCourses() {
  console.log(chalk.red('=== רשימת הקורסים ==='));
  Mycourses.forEach(course => {
    console.log(chalk.blue(`קורס #${course.id}: `) +
      chalk.yellow(course.name) +
      chalk.green(` - ${course.description}`)+'😊');
  });
}
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    logCourses();
    console.log(chalk.green('HTML page generated successfully.'));
    res.end(buildHtml());

  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});
server.listen(3000, () => {
  console.log(chalk.yellow('Server is running on http://localhost:3000'));
});