'use strict'
module.exports = (sequelize, DataTypes) => {
  const Domain = sequelize.define('Domain', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    title: DataTypes.STRING,
    host: DataTypes.STRING
  }, {})
  Domain.associate = function (models) {
    // associations can be defined here
    Domain.hasMany(models.Record)
  }
  return Domain
}
