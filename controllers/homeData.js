const ctrl = require('./');

module.exports = (req, res) => {
  // console.log(user);
  const { user } = req.session;
  console.log(user);
  const isValidUser = true;
  if (user.authType === 'admin') {
    ctrl.userControllers.admins.getAllTeachersPerformance({ name: user.name })
      .then((all) => {
        res.send({ user, all, isValidUser });
      });
  } else if (user.authType === 'teacher') {
    ctrl.userControllers.teachers.getAllStudentsPerformance({ name: user.name })
      .then((all) => {
        res.send({ user, all, isValidUser });
      });
  } else if (user.authType === 'student') {
    ctrl.userControllers.students.viewAllPerformance({ name: user.name })
      .then((all) => {
        res.send({ user, all, isValidUser });
      });
  } else {
    res.send({ isValidUser: false });
  }
};
