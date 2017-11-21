module.exports = (sequelize, DataTypes) => {
  const Admins = sequelize.define('Admins', {
    username: DataTypes.STRING,
  });

  Admins.associate = (models) => {
    Admins.belongsTo(models.Schools);
  };
  return Admins;
};

