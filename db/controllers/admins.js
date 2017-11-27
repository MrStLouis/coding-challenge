const models = require('../');

module.exports = {
  createAdmin: (admin, foundSchool) => new Promise((resolve, reject) => {
    models.Admins.findOrCreate({
      where: {
        name: admin.name,
        SchoolId: foundSchool.id,
      },
    }).spread((foundAdmin) => {
      resolve(foundAdmin);
    }).catch((err) => {
      reject(err);
    });
  }),
  getAdminData: admin => new Promise((resolve, reject) => {
    models.Admins.findOne({
      where: {
        name: admin.name,
      },
    }).then((foundAdmin) => {
      resolve(foundAdmin);
    }).catch((err) => {
      reject(err);
    });
  }),
  getAllTeachers: admin => new Promise((resolve, reject) => {
    admin.getSchool({
      include: [
        {
          model: models.Teachers,
        },
      ],
    }).then((teachers) => {
      resolve(teachers);
    }).catch((err) => {
      reject(err);
    });
  }),
};

