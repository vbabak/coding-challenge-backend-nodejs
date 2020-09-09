import { DataTypes, Sequelize } from 'sequelize'
import DBModel from '../classes/dbmodel.class'

export default class PoliceOfficer extends DBModel {
  static initialize(sequelize: Sequelize): void {
    PoliceOfficer.init(
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
        first_name: {
          type: DataTypes.STRING(32),
          allowNull: false,
        },
        last_name: {
          type: DataTypes.STRING(32),
          allowNull: false,
        },
        created: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        is_available: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1,
        },
      },
      {
        sequelize,
        modelName: 'PoliceOfficer',
        tableName: 'police_officer',
        indexes: [
          {
            name: 'police_officer_email_idx1',
            fields: ['email'],
            unique: true,
          },
          {
            name: 'police_officer_is_available_idx2',
            fields: ['is_available'],
          },
        ],
      }
    )
  }
}
