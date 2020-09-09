'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('police_officer', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      first_name: {
        type: Sequelize.STRING(32),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(32),
        allowNull: false,
      },
      created: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      is_available: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    })

    await queryInterface.addIndex('police_officer', {
      name: 'police_officer_email_idx1',
      fields: ['email'],
      unique: true,
    })

    await queryInterface.addIndex('police_officer', {
      name: 'police_officer_is_available_idx2',
      fields: ['is_available'],
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('police_officer')
  },
}
