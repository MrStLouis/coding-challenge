const models = require('../db');

module.exports = {
  addTeacher: teacher => new Promise((resolve, reject) => {
    models.Teachers.findOrCreate({
      where: {
        name: teacher.name,
      },
    }).spread((newTeacher) => {
      resolve(newTeacher);
    }).catch((err) => {
      reject(err);
    });
  }),
  getTeacher: teacher => new Promise((resolve, reject) => {
    module.exports.addTeacher(teacher)
      .then((foundTeacher) => {
        resolve(foundTeacher);
      }).catch((err) => {
        reject(err);
      });
  }),
  addTeacherToSchool: (teacher, school) => new Promise((resolve, reject) => {
    module.exports.getTeacher(teacher)
      .then((foundTeacher) => {
        return foundTeacher.setSchool(school);
      }).then(() => {
        resolve();
      }).catch((err) => {
        reject(err);
      });
  }),
};
