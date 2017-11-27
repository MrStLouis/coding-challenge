const ctrl = require('../controllers/users');

module.exports = (req, res) => {
  if (req.body.user) {
    ctrl.login(req.body.user)
      .then((foundUser) => {
        req.session.user = foundUser;
        req.session.save(() => {
          res.send(req.session.user);
        });
      });
  } else {
    res.send('invalid user');
  }
};
