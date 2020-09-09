import { DataTypes, Sequelize } from 'sequelize'
import DBModel from '../classes/dbmodel.class'

export default class Case extends DBModel {
  static associate(models: { [key: string]: typeof DBModel }): void {
    Case.belongsTo(models.PoliceOfficer, {
      foreignKey: 'police_officer_id',
    })
  }
  static initialize(sequelize: Sequelize): void {
    Case.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        email: {
          type: DataTypes.STRING(64),
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING(32),
          allowNull: false,
        },
        first_name: {
          type: DataTypes.STRING(32),
          allowNull: false,
        },
        last_name: {
          type: DataTypes.STRING(32),
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING(2048),
          allowNull: false,
        },
        created: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        police_officer_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        status: {
          type: DataTypes.ENUM('new', 'in progress', 'succeeded', 'failed'),
          allowNull: false,
          defaultValue: 'new',
        },
      },
      {
        sequelize,
        modelName: 'Case',
        tableName: 'case',
        indexes: [
          { name: 'case_email_idx1', fields: ['email'], unique: true },
          { name: 'case_police_officer_id_fk1', fields: ['police_officer_id'] },
        ],
      }
    )
  }
}
