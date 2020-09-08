import { Model, Sequelize } from 'sequelize'
export default class DBModel extends Model {
  static associate(models: { [key: string]: typeof DBModel }): void {
    Object.keys(models)
  }
  static initialize(sequelize: Sequelize): void {
    Object.keys(sequelize)
  }
}
