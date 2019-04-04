'use strict';

module.exports = function (sequelize, DataTypes) {
  var Building = sequelize.define('Building', {
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: "buildings"
  });
  Building.associate = function (models) {

    // many Building belongsTo one user.
    Building.belongsTo(models.User, {
      foreignKey: "user_id",
      onDelete: "CASCADE"
    });
  };
  return Building;
};