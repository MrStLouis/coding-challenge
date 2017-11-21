module.exports = (sequelize, DataTypes) => {
  const Classes = sequelize.define('Classes', {
    name: DataTypes.STRING,
  });

  Classes.associate = function (models) {
    // Using additional options like CASCADE etc for demonstration
    // Can also simply do Classes.belongsTo(models.User);
    Classes.belongsToMany(models.Students, {
      through: 'Students_Classes',
    });
    Classes.belongsTo(models.Teachers);
    Classes.hasMany(models.Topics);
  };

  return Classes;
};
