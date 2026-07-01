const courses = [
  { id: 1, name: 'HTML', description: 'HyperText Markup Language' },
  { id: 2, name: 'CSS', description: 'Cascading Style Sheets' },
  { id: 3, name: 'JavaScript', description: 'Programming Language for Web Development' },
  { id: 4, name: 'Node.js', description: 'JavaScript Runtime Environment' },
  { id: 5, name: 'React', description: 'JavaScript Library for Building User Interfaces' },
  { id: 6, name: 'Express.js', description: 'Web Application Framework for Node.js' },
  { id: 7, name: 'MongoDB', description: 'NoSQL Database for Storing Data' },
  { id: 8, name: 'Git', description: 'Version Control System for Tracking Changes in Code' },
  { id: 9, name: 'GitHub', description: 'Web-based Platform for Hosting and Collaborating on Git Repositories' },
  { id: 10, name: 'TypeScript', description: 'Superset of JavaScript that Adds Static Typing' },
  { id: 11, name: 'Python', description: 'High-level Programming Language for General-purpose Programming' },
  { id: 12, name: 'Django', description: 'Python Web Framework for Rapid Development' },
  { id: 13, name: 'Flask', description: 'Lightweight Python Web Framework' },
  { id: 14, name: 'Java', description: 'Object-oriented Programming Language' },
  { id: 15, name: 'Spring Boot', description: 'Java-based Framework for Building Web Applications' },
  { id: 16, name: 'C#', description: 'Object-oriented Programming Language Developed by Microsoft' },
  { id: 17, name: '.NET', description: 'Framework for Building Windows Applications and Web Services' },
  { id: 18, name: 'Ruby', description: 'Dynamic, Object-oriented Programming Language' },
  { id: 19, name: 'Ruby on Rails', description: 'Web Application Framework for Ruby' },
  { id: 20, name: 'PHP', description: 'Server-side Scripting Language for Web Development' },
  { id: 21, name: 'Laravel', description: 'PHP Web Framework for Building Web Applications' },
  { id: 22, name: 'C++', description: 'General-purpose Programming Language with Object-oriented Features' },
  { id: 23, name: 'C', description: 'General-purpose Programming Language' },
  { id: 24, name: 'Go', description: 'Statically typed Programming Language Developed by Google' },
  { id: 25, name: 'Rust', description: 'Systems Programming Language Focused on Safety and Performance' },
  { id: 26, name: 'Kotlin', description: 'Statically typed Programming Language for JVM and Android Development' },
  { id: 27, name: 'Swift', description: 'Programming Language for iOS and macOS Development' },
  { id: 28, name: 'Objective-C', description: 'Object-oriented Programming Language for macOS and iOS Development' },
  { id: 29, name: 'SQL', description: 'Structured Query Language for Managing Relational Databases' },
  { id: 30, name: 'NoSQL', description: 'Non-relational Database Management System' },
  { id: 31, name: 'GraphQL', description: 'Query Language for APIs' },
  { id: 32, name: 'REST', description: 'Architectural Style for Designing Networked Applications' },
  { id: 33, name: 'Docker', description: 'Platform for Developing, Shipping, and Running Applications in Containers' },
  { id: 34, name: 'Kubernetes', description: 'Open-source System for Automating Deployment, Scaling, and Management of Containerized Applications' },
  { id: 35, name: 'AWS', description: 'Amazon Web Services - Cloud Computing Platform' },
  { id: 36, name: 'Azure', description: 'Microsoft Azure - Cloud Computing Platform' },
  { id: 37, name: 'Google Cloud', description: 'Google Cloud Platform - Cloud Computing Services' },
  { id: 38, name: 'Machine Learning', description: 'Field of Artificial Intelligence that Focuses on Building Systems that Learn from Data' },
  { id: 39, name: 'Deep Learning', description: 'Subset of Machine Learning that Uses Neural Networks to Model and Solve Complex Problems' },
  { id: 40, name: 'Artificial Intelligence', description: 'Field of Computer Science that Focuses on Creating Intelligent Machines that Can Perform Tasks that Typically Require Human Intelligence' }
];

function getCourse(id) {
  return courses.find(course => course.id === id);
}

module.exports = {
  courses,
  getCourse
};