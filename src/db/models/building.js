'use strict';
module.exports = (sequelize, DataTypes) => {
  const Building = sequelize.define('Building', {
    location: DataTypes.STRING,
    type: DataTypes.STRING,
    gender: DataTypes.STRING,
    city: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    tableName: "buildings"
  });
  Building.associate = function(models) {
   
    // many Building belongsTo one user.
        Building.belongsTo(models.User, {
          foreignKey: "user_id",
          onDelete: "CASCADE"
        });
  };
  return Building;
};