const models = require('../');

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
  getTeacherData: teacher => new Promise((resolve, reject) => {
    module.exports.addTeacher(teacher)
      .then((foundTeacher) => {
        resolve(foundTeacher);
      }).catch((err) => {
        reject(err);
      });
  }),
  addTeacherToSchool: (teacher, school) => new Promise((resolve, reject) => {
    module.exports.getTeacherData(teacher)
      .then((foundTeacher) => {
        return foundTeacher.setSchool(school);
      }).then(() => {
        resolve();
      }).catch((err) => {
        reject(err);
      });
  }),
  getAllStudents: teacher => new Promise((resolve, reject) => {
    module.exports.getTeacherData(teacher)
      .then((foundTeacher) => {
        return foundTeacher.getClasses({
          include: [
            {
              model: models.Students,
            },
          ],
        });
      }).then((allStudents) => {
        resolve(allStudents);
      }).catch((err) => {
        reject(err);
      });
  }),
};
