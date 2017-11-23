module.exports = (sequelize) => {
  const StudentsClasses = sequelize.define('Students_Classes', {
  }, {
    timestamps: false,
  });

  return StudentsClasses;
};
