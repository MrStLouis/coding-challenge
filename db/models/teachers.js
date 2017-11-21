module.exports = (sequelize, DataTypes) => {
  const Teachers = sequelize.define('Teachers', {
    username: DataTypes.STRING,
  });

  Teachers.associate = (models) => {
    Teachers.belongsTo(models.Schools);
    Teachers.hasMany(models.Classes);
    Teachers.belongsToMany(models.Students, {
      through: 'Students_Teachers',
    });
  };
  return Teachers;
};
