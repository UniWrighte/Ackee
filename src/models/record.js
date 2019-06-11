'use strict'
module.exports = (sequelize, DataTypes) => {
  const Record = sequelize.define('Record', {
    DomainId: DataTypes.UUID,
    siteLocation: DataTypes.STRING,
    siteReferrer: DataTypes.STRING,
    siteTitle: DataTypes.STRING,
    siteLanguage: DataTypes.STRING,
    screenWidth: DataTypes.INTEGER,
    screenHeight: DataTypes.INTEGER,
    screenColorDepth: DataTypes.INTEGER,
    deviceName: DataTypes.STRING,
    deviceManufacturer: DataTypes.STRING,
    osName: DataTypes.STRING,
    osVersion: DataTypes.STRING,
    browserName: DataTypes.STRING,
    browserVersion: DataTypes.STRING,
    browserWidth: DataTypes.INTEGER,
    browserHeight: DataTypes.INTEGER
  }, {})
  Record.associate = function (models) {
    // associations can be defined here
    Record.belongsTo(models.Domain)
  }
  return Record
}
