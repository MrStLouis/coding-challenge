module.exports = (sequelize, DataTypes) => {
  const Topics = sequelize.define('Topics', {
    name: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  Topics.associate = (models) => {
    Topics.belongsTo(models.Classes);
    Topics.hasMany(models.Quizzes);
  };
  return Topics;
};
