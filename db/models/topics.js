module.exports = (sequelize, DataTypes) => {
  const Topics = sequelize.define('Topics', {
    name: DataTypes.STRING,
  });

  Topics.associate = (models) => {
    Topics.belongsTo(models.Students);
    Topics.belongsTo(models.Classes);
    Topics.hasMany(models.Quizzes);
  };
  return Topics;
};
