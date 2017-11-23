module.exports = (sequelize, DataTypes) => {
  const Admins = sequelize.define('Admins', {
    username: DataTypes.STRING,
    name: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  Admins.associate = (models) => {
    Admins.belongsTo(models.Schools);
  };
  return Admins;
};

