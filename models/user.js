module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true
            }
        },
      password: DataTypes.STRING,
      verifyPassword: DataTypes.STRING

      
    });
    User.associate = function(models) {
        User.hasOne(models.User)
      };
    return User;
  };
  