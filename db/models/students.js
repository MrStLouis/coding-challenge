module.exports = (sequelize, DataTypes) => {
  const Students = sequelize.define('Students', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  Students.associate = (models) => {
    // Students.belongsToMany(models.Teachers, {
    //   through: 'Students_Teachers',
    // });
    Students.belongsToMany(models.Classes, {
      through: 'Students_Classes',
    });
    Students.belongsToMany(models.Quizzes, {
      through: 'Students_Quizzes',
    });
  };
  return Students;
};
