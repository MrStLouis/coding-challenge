const controllers = require('./controllers');

const studentData = require('./seeds/students.json');
const schoolData = require('./seeds/schools.json');
const adminData = require('./seeds/admin.json');
const classData = require('./seeds/classes.json');
const quizData = require('./seeds/quizzes.json');
const teacherData = require('./seeds/teachers.json');

const { dbControllers, userControllers } = controllers;

// add students
const addAllStudents = studentData.map((student) => {
  return dbControllers.Students.addStudent(student);
});
Promise.all(addAllStudents)
  .then((allStudents) => {
    console.log('seeding students');
    const allClassData = classData.map((currentClass) => {
      return userControllers.teachers.addStudentsToClass(allStudents, currentClass);
    });
    return Promise.all(allClassData);
  }).then(() => {
    console.log('seeding classes and topics');
    const allTopics = classData.map((currentClass) => {
      return userControllers.teachers.addTopicsToClass(currentClass.topics, currentClass);
    });
    return Promise.all(allTopics);
  }).then(() => {
    console.log('seeding quizes');
    const allQuizes = quizData.map((quiz) => {
      const quizTopic = { name: quiz.topic };
      return userControllers.teachers.addQuizzesToClassTopic([quiz], quizTopic);
    });
    return Promise.all(allQuizes);
  }).then(() => {
    console.log('seeding scores');
    const allScores = quizData.map((quiz) => {
      return userControllers.teachers.addStudentScoresToQuiz(quiz.scores, quiz);
    });
    return Promise.all(allScores);
  }).then(() => {
    console.log('seeding schools');
    // add admins to schools
    const addSchools = schoolData.map((school) => {
      return dbControllers.Schools.addSchools(school);
    });
    return Promise.all(addSchools);
  }).then(() => {
    console.log('seeding admins');
    const addAdmins = adminData.map((admin) => {
      return userControllers.admins.addAdminToSchool(admin, { name: admin.adminOf });
    });
    return Promise.all(addAdmins);
  }).then(() => {
    console.log('seeding teachers');
    const allSchoolTeachers = teacherData.map((currentTeacher) => {
      return userControllers.admins.addTeacherToSchool(currentTeacher, currentTeacher.school);
    });
    return Promise.all(allSchoolTeachers);
  }).then(() => {
    console.log('adding teachers to classses');
    const allTeachers = teacherData.map((currentTeacher) => {
      return userControllers.admins.addTeacherToClass(currentTeacher, currentTeacher.class);
    });
    return Promise.all(allTeachers);
  }).catch((err) => {
    console.log('error adding students/topics to classes', err);
  });

