module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    authType: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  return Users;
};
