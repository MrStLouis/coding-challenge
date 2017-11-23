// db controllers:
// deals with functions that use only one model
// i.e. retrieving all item information from a model

const Admins = require('./admin.js');
const Teachers = require('./teachers.js');
const Classes = require('./classes.js');
const Students = require('./students.js');
const Quizzes = require('./quizzes.js');
const Topics = require('./topics.js');
const Schools = require('./schools.js');

// user controllers:
// a user with these rights can do the following functions
// i.e. admin can do all functions, teacher { teacher, student }, student { student }

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
    Teachers.getTeacher(teacher)
      .then((foundTeacher) => {
        return Classes.addTeacherToClass(foundTeacher, classInfo);
      }).then(() => {
        resolve();
      }).catch((err) => {
        reject(err);
      });
  }),
};

// Teacher
const teachers = {
  addStudentsToClass: (students, classInfo) => new Promise((resolve, reject) => {
    Classes.addStudentsToClass(students, classInfo)
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
};

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
  viewPerformanceInQuiz: (student, quiz) => new Promise((resolve, reject) => {
    Quizzes.getPerformanceOnQuiz(student, quiz)
      .then((quizResult) => {
        resolve(quizResult);
      }).catch((err) => {
        reject(err);
      });
  }),
  viewPerformanceInTopic: (student, topic) => new Promise((resolve, reject) => {
    Topics.getAllQuizes(topic)
      .then((allQuizes) => {
        const getAllQuizPerformance = allQuizes.map((quiz) => {
          return student.viewPerformanceInQuiz(student, quiz);
        });
        return Promise.all(getAllQuizPerformance)
      }).then((allQuizResults) => {
        resolve(allQuizResults);
      }).catch((err) => {
        reject(err);
      });
  }),
  viewPerformanceInClass: (student, findClass) => new Promise((resolve, reject) => {
    Classes.getAllTopics(findClass)
      .then((allTopicsInClass) => {
        const getAllQuizPerformanceInClass = allTopicsInClass.map((topic) => {
          return student.viewPerformanceInTopic(student, topic);
        });
        return Promise.all(getAllQuizPerformanceInClass)
      }).then((allQuizResults) => {
        resolve(allQuizResults);
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
