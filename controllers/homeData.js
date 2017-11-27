const ctrl = require('./');

module.exports = (req, res, next) => {
  // console.log(user);
  res.send(req.session.user);
  // if (req.session.user.authType === 'admin') {
  //   ctrl.userControllers.admins.getAllTeachersPerformance({ name: user })
  //     .then((all) => {
  //       res.send(all);
  //     });
  // } else if (req.session.user.authType === 'teacher') {
  //   ctrl.userControllers.teachers.getAllStudentsPerformance({ name: user })
  //     .then((all) => {
  //       res.send(all);
  //     });
  // } else if (req.session.user.authType === 'student') {
  //   ctrl.userControllers.students.viewAllPerformance({ name: user })
  //     .then((all) => {
  //       res.send(all);
  //     });
  // }
};
