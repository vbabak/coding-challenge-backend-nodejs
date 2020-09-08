import { Sequelize } from 'sequelize'
import { db_production, db_test, db_development } from '../config/database'
import DB from '../interfaces/db.interface'
const env = process.env.NODE_ENV || 'production'

const config =
  env == 'production' ? db_production : env == 'test' ? db_test : db_development
const sequelize = new Sequelize(config)

import PoliceOfficer from './policeofficer'
PoliceOfficer.initialize(sequelize)

import Case from './case'
Case.initialize(sequelize)

const db: DB = {
  instance: sequelize,
  models: { PoliceOfficer, Case },
}

db.models['PoliceOfficer'] = PoliceOfficer

Object.keys(db.models).forEach((modelName) => {
  if (typeof db.models[modelName].associate == 'function') {
    db.models[modelName].associate(db.models)
  }
})

export default db
