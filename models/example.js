var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
// var sequelize = require("../models/index.js");

// // Creates a "Chirp" model that matches up with DB
// var Example = sequelize.define("Example", {
//   text: Sequelize.STRING,
//   description: Sequelize.STRING,
//   // status: Sequelize.BOOLEAN
// });

// // Syncs with DB
// Example.sync();

// // Makes the Chirp Model available for other files (will also create a table)
// module.exports = Example;

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


