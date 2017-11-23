module.exports = (sequelize, DataTypes) => {
  const Quizzes = sequelize.define('Quizzes', {
    name: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  Quizzes.associate = (models) => {
    Quizzes.belongsToMany(models.Students, {
      through: 'Students_Quizzes',
    });
    Quizzes.belongsTo(models.Topics);
  };
  return Quizzes;
};
