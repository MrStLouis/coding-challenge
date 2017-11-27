module.exports = (sequelize, DataTypes) => {
  const Admins = sequelize.define('Admins', {
    name: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  Admins.associate = (models) => {
    Admins.belongsTo(models.Schools);
  };
  return Admins;
};

