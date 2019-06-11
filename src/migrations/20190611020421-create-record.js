'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Records', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      DomainId: {
        type: Sequelize.UUID,
        references: {
          model: 'Domains',
          key: 'id',
          as: 'DomainId'
        },
        allowNull: false
      },
      siteLocation: {
        type: Sequelize.STRING,
        allowNull: false
      },
      siteReferrer: {
        type: Sequelize.STRING
      },
      siteTitle: {
        type: Sequelize.STRING
      },
      siteLanguage: {
        type: Sequelize.STRING(2)
      },
      screenWidth: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      screenHeight: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      screenColorDepth: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      deviceName: {
        type: Sequelize.STRING
      },
      deviceManufacturer: {
        type: Sequelize.STRING
      },
      osName: {
        type: Sequelize.STRING
      },
      osVersion: {
        type: Sequelize.STRING
      },
      browserName: {
        type: Sequelize.STRING
      },
      browserVersion: {
        type: Sequelize.STRING
      },
      browserWidth: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      browserHeight: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Records')
  }
}
