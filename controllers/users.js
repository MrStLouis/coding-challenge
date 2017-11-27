const models = require('../db');

const {
  Users,
  Admins,
  Teachers,
  Students,
} = models;

module.exports = {
  login: userInfo => new Promise((resolve, reject) => {
    Users.findOne({
      where: {
        username: userInfo.username,
        password: userInfo.password,
      },
    }).then((foundUser) => {
      resolve(foundUser);
    }).catch((err) => {
      console.error('did not find user in db', err);
      reject(err);
    });
  }),
  signup: userInfo => new Promise((resolve, reject) => {
    Users.findOne({
      where: {
        username: userInfo.username,
      },
    }).then((foundUser) => {
      if (foundUser) {
        resolve(foundUser.get('authType'));
      } else {
        return Admins.findOne({
          where: {
            name: userInfo.name,
          },
        });
      }
    }).then((foundAdmin) => {
      if (foundAdmin) {
        const authType = 'admin';
        module.exports.createUser(userInfo, authType);
        resolve(authType);
      } else {
        return Teachers.findOne({
          where: {
            name: userInfo.name,
          },
        });
      }
    }).then((foundTeacher) => {
      if (foundTeacher) {
        const authType = 'teacher';
        module.exports.createUser(userInfo, authType);
        resolve(authType);
      } else {
        return Students.findOne({
          where: {
            name: userInfo.name,
          },
        });
      }
    }).then((foundStudent) => {
      if (foundStudent) {
        const authType = 'student';
        module.exports.createUser(userInfo, authType);
        resolve(authType);
      } else {
        reject();
      }
    }).catch((err) => {
      console.error('did not find user in db', err);
    });
  }),
  createUser: (userInfo, authType) => new Promise((resolve, reject) => {
    Users.create({
      username: userInfo.username,
      name: userInfo.name,
      password: userInfo.password,
      authType,
    }).then((newUser) => {
      resolve(newUser);
    }).catch((err) => {
      reject(err);
    });
  }),
};
