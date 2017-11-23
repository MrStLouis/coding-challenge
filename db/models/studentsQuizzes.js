module.exports = (sequelize, DataTypes) => {
  const StudentsQuizzes = sequelize.define('Students_Quizzes', {
    score: DataTypes.INTEGER,
  }, {
    timestamps: false,
  });
  return StudentsQuizzes;
};
