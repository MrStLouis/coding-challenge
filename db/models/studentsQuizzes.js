module.exports = (sequelize, DataTypes) => {
  const StudentsQuizzes = sequelize.define('Students_Quizzes', {
    score: DataTypes.INTEGER,
  }, {
    timestamps: false,
  });
  // StudentsQuizzes.associate = (models) => {
  //   StudentsQuizzes.
  // };
  return StudentsQuizzes;
};
