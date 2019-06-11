'use strict'
module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    valid: DataTypes.BOOLEAN
  }, {})
  Token.associate = function (models) {
    // associations can be defined here
  }
  return Token
}
