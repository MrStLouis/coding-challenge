const models = require('../db');

const createAdmin = (admin, foundSchool) => {
  return new Promise((resolve, reject) => {
    models.Admins.findOrCreate({
      where: {
        name: admin.name,
        SchoolId: foundSchool.id,
      },
      defaults: {
        username: admin.username,
      },
    }).spread((foundAdmin) => {
      resolve(foundAdmin);
    }).catch((err) => {
      reject(err);
    });
  });
};

module.exports = {
  createAdmin,
};
