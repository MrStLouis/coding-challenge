const express = require('express');
const path = require('path');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const bodyParser = require('body-parser');

const router = require('./routes');
const isLoggedIn = require('./middleware/isLoggedIn');
const login = require('./middleware/login');
const signup = require('./middleware/signup');

const app = express();
const client = redis.createClient();

app.use(session({
  secret: 'get dat paper yo',
  saveUninitialized: false,
  resave: false,
  store: new RedisStore({
    host: 'localhost',
    port: 6379,
    client,
  }),
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(express.static(path.join(__dirname, '../class-tracker-ui/angular')));

app.post('/login', login);
app.post('/signup', signup);

app.post('/logout', (req, res) => {
  req.session.userAuth = req.body.userAuth;
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

app.use('/home', isLoggedIn, router);

app.all('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../class-tracker-ui/angular/index.html'));
});

app.listen(4420, () => console.log('Example app listening on port 4420!'));
