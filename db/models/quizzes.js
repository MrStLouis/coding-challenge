module.exports = (sequelize, DataTypes) => {
  const Quizzes = sequelize.define('Quizzes', {
    name: DataTypes.STRING,
  });

  Quizzes.associate = (models) => {
    Quizzes.belongsTo(models.Students);
    Quizzes.belongsTo(models.Topics);
  };
  return Quizzes;
};
