module.exports = (sequelize, DataTypes) => {
  const Students = sequelize.define('Students', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    image: DataTypes.STRING,
  });

  Students.associate = (models) => {
    Students.belongsToMany(models.Teachers, {
      through: 'Students_Teachers',
    });
    Students.belongsToMany(models.Classes, {
      through: 'Students_Classes',
    });
    Students.hasMany(models.Topics);
    Students.hasMany(models.Quizzes);
  };
  return Students;
};
