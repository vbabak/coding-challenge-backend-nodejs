'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('case', {
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
      phone: {
        type: Sequelize.STRING(32),
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
      description: {
        type: Sequelize.STRING(2048),
        allowNull: false,
      },
      created: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      police_officer_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('new', 'in progress', 'succeeded', 'failed'),
        allowNull: false,
        defaultValue: 'new',
      },
    })

    await queryInterface.addIndex('case', {
      name: 'case_email_idx1',
      fields: ['email'],
    })

    await queryInterface.addIndex('case', {
      name: 'case_status_idx2',
      fields: ['status'],
    })

    await queryInterface.addConstraint('case', {
      name: 'case_police_officer_id_fk1',
      fields: ['police_officer_id'],
      type: 'foreign key',
      references: {
        table: 'police_officer',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('case')
  },
}
