const models = require('../db');

module.exports = {
  getClass: classInfo => new Promise((resolve, reject) => {
    module.exports.addClass(classInfo)
      .then((foundClass) => {
        resolve(foundClass);
      }).catch((err) => {
        reject(err);
      });
  }),
  addClass: classInfo => new Promise((resolve, reject) => {
    models.Classes.findOrCreate({
      where: {
        name: classInfo.name,
      },
      defaults: {
        rootClassCode: classInfo.rootCode,
      },
    }).spread((newClass) => {
      resolve(newClass);
    }).catch((err) => {
      reject(err);
    });
  }),
  addStudentsToClass: (students, classInfo) => new Promise((resolve, reject) => {
    module.exports.getClass(classInfo)
      .then((foundClass) => {
        return foundClass.setStudents(students);
      }).then(() => {
        resolve();
      }).catch((err) => {
        reject(err);
      });
  }),
  removeStudentFromClass: (student, classInfo) => new Promise((resolve, reject) => {
    module.exports.getClass(classInfo)
      .then((foundClass) => {
        return foundClass.removeStudent(student);
      }).then(() => {
        resolve();
      }).catch((err) => {
        reject(err);
      });
  }),
  addTeacherToClass: (teacher, classInfo) => new Promise((resolve, reject) => {
    module.exports.getClass(classInfo)
      .then((foundClass) => {
        return foundClass.setTeacher(teacher);
      }).then(() => {
        resolve();
      }).catch((err) => {
        reject(err);
      });
  }),
};
