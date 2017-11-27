// db controllers:
// deals with functions that use only one model
// i.e. retrieving all item information from a model

const Admins = require('../db/controllers/admins.js');
const Teachers = require('../db/controllers/teachers.js');
const Classes = require('../db/controllers/classes.js');
const Students = require('../db/controllers/students.js');
const Quizzes = require('../db/controllers/quizzes.js');
const Topics = require('../db/controllers/topics.js');
const Schools = require('../db/controllers/schools.js');

// user controllers:
// a user with these rights can do the following functions
// i.e. admin can do all functions, teacher { teacher, student }, student { student }

// Student
const students = {
  addClass: (student, classInfo) => new Promise((resolve, reject) => {
    Classes.addStudentsToClass(student, classInfo)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  }),
  dropClass: (student, classInfo) => new Promise((resolve, reject) => {
    Classes.removeStudentFromClass(student, classInfo)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  }),
  viewAllPerformance: student => new Promise((resolve, reject) => {
    Students.getStudentId(student)
      .then((foundStudent) => {
        return Students.getStudentPerformance(foundStudent);
      }).then((allClassPerformance) => {
        resolve(allClassPerformance);
      }).catch((err) => {
        reject(err);
      });
  }),

};

// Teacher
const teachers = {
  addStudentsToClass: (classStudents, classInfo) => new Promise((resolve, reject) => {
    Classes.addStudentsToClass(classStudents, classInfo)
      .then(() => {
        resolve();
      }).catch((err) => {
        reject(err);
      });
  }),
  addTopicsToClass: (topics, classInfo) => new Promise((resolve, reject) => {
    Classes.addClass(classInfo)
      .then((foundClass) => {
        return Topics.addTopics(topics, foundClass);
      }).then(() => {
        resolve();
      }).catch((err) => {
        reject(err);
      });
  }),
  addQuizzesToClassTopic: (quizzes, topic) => new Promise((resolve, reject) => {
    Topics.getTopicId(topic)
      .then((foundTopic) => {
        return Quizzes.addQuizzesToTopic(quizzes, foundTopic);
      }).then(() => {
        resolve();
      }).catch((err) => {
        reject(err);
      });
  }),
  addStudentScoresToQuiz: (scores, quiz) => new Promise((resolve, reject) => {
    const allStudentScores = scores.map((currentTest) => {
      return Students.getStudentId(currentTest.student)
        .then((foundStudent) => {
          Quizzes.addStudentScoreToQuiz(foundStudent, currentTest, quiz);
        });
    });
    Promise.all(allStudentScores)
      .then(() => {
        resolve();
      }).catch((err) => {
        reject(err);
      });
  }),
  getAllStudentsPerformance: teacher => new Promise((resolve, reject) => {
    Teachers.getAllStudents(teacher)
      .then((allClasses) => {
        const classStudents = allClasses.map((currentClass) => {
          return Classes.getClassPerformance(currentClass);
        });
        return Promise.all(classStudents);
      }).then((allStudentsPerformance) => {
        resolve(allStudentsPerformance);
      }).catch((err) => {
        reject(err);
      });
  }),
};

// Admin
const admins = {
  addAdminToSchool: (admin, school) => new Promise((resolve, reject) => {
    Schools.getSchoolData(school)
      .then((foundSchool) => {
        return Admins.createAdmin(admin, foundSchool);
      }).then((createdAdmin) => {
        resolve(createdAdmin);
      }).catch((err) => {
        reject(err);
      });
  }),
  addTeacher: teacher => new Promise((resolve, reject) => {
    Teachers.addTeacher(teacher)
      .then((newTeacher) => {
        resolve(newTeacher);
      }).catch((err) => {
        reject(err);
      });
  }),
  addTeacherToSchool: (teacher, school) => new Promise((resolve, reject) => {
    Schools.getSchoolData(school)
      .then((foundSchool) => {
        return Teachers.addTeacherToSchool(teacher, foundSchool);
      }).then(() => {
        resolve();
      }).catch((err) => {
        reject(err);
      });
  }),
  addTeacherToClass: (teacher, classInfo) => new Promise((resolve, reject) => {
    Teachers.getTeacherData(teacher)
      .then((foundTeacher) => {
        return Classes.addTeacherToClass(foundTeacher, classInfo);
      }).then(() => {
        resolve();
      }).catch((err) => {
        reject(err);
      });
  }),
  getAllTeachersPerformance: admin => new Promise((resolve, reject) => {
    Admins.getAdminData(admin)
      .then((foundAdmin) => {
        return Admins.getAllTeachers(foundAdmin);
      }).then((allTeachersInSchool) => {
        console.log(allTeachersInSchool);
        const allTeachersPerformance = allTeachersInSchool.Teachers.map((teacher) => {
          return teachers.getAllStudentsPerformance(teacher);
        });
        return Promise.all(allTeachersPerformance);
      }).then((allTeachersStudentsPerformance) => {
        resolve(allTeachersStudentsPerformance);
      }).catch((err) => {
        reject(err);
      });
  }),
};


module.exports = {
  dbControllers: {
    Admins,
    Teachers,
    Classes,
    Students,
    Quizzes,
    Topics,
    Schools,
  },
  userControllers: {
    students,
    teachers,
    admins,
  },
};
