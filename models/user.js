module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        email: {
            type: Sequelize.STRING(255),
            unique: true,
            validate: {
                isEmail: true
            }
        },
      password: DataTypes.STRING,
      verifyPassword: DataTypes.STRING

      
    });
    return User;
  };
  