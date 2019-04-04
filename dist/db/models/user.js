"use strict";

var bcrypt = require("bcrypt");
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    hashedPassword: {
      type: DataTypes.STRING,
      field: "hashed_password",
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING

    }
  }, {
    tableName: "users",
    hooks: {
      beforeCreate: function beforeCreate(user) {
        var hashCost = 10;
        user.hashedPassword = bcrypt.hashSync(user.hashedPassword, hashCost);
      }
    }
  });

  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword);
  };

  User.prototype.bcrypt = function (password) {
    // authentication will take approximately 13 seconds
    // https://pthree.org/wp-content/uploads/2016/06/bcrypt.png
    var hashCost = 10;
    this.hashedPassword = bcrypt.hashSync(password, hashCost);
    this.save();
  };

  User.associate = function (models) {
    // one user has many Buildings
    User.hasMany(models.Building, {
      foreignKey: "user_id",
      as: "Building"
    });
  };
  return User;
};