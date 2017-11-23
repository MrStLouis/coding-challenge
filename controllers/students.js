const models = require('../db');

module.exports = {
  getStudentId: student => new Promise((resolve, reject) => {
    models.Students.findOne({
      where: {
        name: student.name,
      },
    }).then((foundStudent) => {
      resolve(foundStudent);
    }).catch((err) => {
      reject(err);
    });
  }),
  addStudent: (student) => {
    return new Promise((resolve, reject) => {
      models.Students.findOrCreate({
        where: {
          name: student.name,
        },
        defaults: {
          email: student.email,
          image: student.image,
        },
      }).spread((dbStudent) => {
        resolve(dbStudent);
      }).catch((err) => {
        reject(err);
      });
    });
  },
};
