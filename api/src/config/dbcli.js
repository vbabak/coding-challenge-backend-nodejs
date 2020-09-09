const lodash = require('lodash')
const env = process.env.NODE_ENV || 'production'
const dbconf = require(__dirname + '/database.config.json')

let config = {}
config['production'] = lodash.merge({}, dbconf['production'])
config['development'] = lodash.merge(
  {},
  dbconf['production'],
  dbconf['development']
)
config['test'] = lodash.merge({}, dbconf['production'], dbconf['test'])

module.exports = config[env]
