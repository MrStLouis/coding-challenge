const models = require('../db');

module.exports = {
  addSchools: (school) => {
    return new Promise((resolve, reject) => {
      models.Schools.findOrCreate({
        where: {
          name: school.name,
        },
      }).spread((foundSchool) => {
        resolve(foundSchool);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  getSchoolData: (school) => {
    return new Promise((resolve, reject) => {
      models.Schools.findOne({
        where: {
          name: school.name,
        },
      }).then((foundSchool) => {
        resolve(foundSchool);
      }).catch((err) => {
        reject(err);
      });
    });
  },
};
