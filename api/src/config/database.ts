import lodash from 'lodash'
import * as dbconf from './database.config.json'
import { Options } from 'sequelize'

export const db_production = <Options>lodash.merge({}, dbconf['production'])
export const db_development = lodash.merge(
  {},
  db_production,
  dbconf['development']
)
export const db_test = lodash.merge({}, db_production, dbconf['test'])
