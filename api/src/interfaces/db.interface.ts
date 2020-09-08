import { Sequelize } from 'sequelize'
import DBModel from '../classes/dbmodel.class'

export default interface DB {
  instance: Sequelize
  models: { [key: string]: typeof DBModel }
}
