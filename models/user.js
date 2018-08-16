module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
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
        User.hasOne(models.Profile)
      };
    return User;
  };
  