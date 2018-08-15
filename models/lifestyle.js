module.exports = function (sequelize, DataTypes) {
    var Lifestyle = sequelize.define("Lifestyle", {
      goal: DataTypes.STRING,
      description: DataTypes.TEXT,
    });
    return Lifestyle;
  };