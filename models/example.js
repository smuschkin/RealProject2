var Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    groupName: DataTypes.STRING,
    calorieCount: DataTypes.INTEGER,
  });
  return Example;
};


