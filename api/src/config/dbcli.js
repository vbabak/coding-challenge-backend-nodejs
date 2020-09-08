const lodash = require('lodash')
const env = process.env.NODE_ENV || 'production'
const config = require(__dirname + '/database.config.js')

let config = {}
config['production'] = lodash.merge({}, dbconf['production'])
config['development'] = lodash.merge({}, db_production, dbconf['development'])
config['test'] = lodash.merge({}, db_production, dbconf['test'])

module.exports = config[env]
