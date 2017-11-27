const ctrl = require('../controllers/users');

module.exports = (req, res) => {
  if (req.body.user) {
    ctrl.signup(req.body.user)
      .then((authType) => {
        req.session.user = req.body.user;
        req.session.user.authType = authType;
        req.session.save(() => {
          res.send(req.session.user);
        });
      });
  } else {
    res.send('invalid user');
  }
};
