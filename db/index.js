const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const config = require('./config');

const sequelize = new Sequelize(config.database, config.username, config.password, config.options);

const db = {};

fs
  .readdirSync(path.join(__dirname, '/models'))
  .filter((file) => {
    return (file.indexOf('.') !== 0);
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, '/models', file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return true;
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
    return false;
  });

db.sequelize.sync();

module.exports = db;
