module.exports = function (sequelize, DataTypes) {
    var Lifestyle = sequelize.define("Lifestyle", {
      text: DataTypes.STRING,
      description: DataTypes.TEXT,
      status: DataTypes.BOOLEAN
    });
    return Lifestyle;
  };