module.exports = (sequelize, DataTypes) => {
  const Schools = sequelize.define('Schools', {
    name: DataTypes.STRING,
  });

  Schools.associate = function (models) {
    Schools.hasMany(models.Admins);
    Schools.hasMany(models.Teachers);
  };

  return Schools;
};
