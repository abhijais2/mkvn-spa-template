require('dotenv').config()

const path = require('path')
const appModulePath = require('app-module-path')
const nconf = require('nconf').argv().env()

nconf.defaults(require('../config'))
appModulePath.addPath(path.resolve(__dirname, '..'))

global.rootRequire = function (name) {
  return require(path.join(__dirname, '/..', name))
}

require('./init').register()

const app = require('./app')
const logger = require('./services/logger')

app.listen(process.env.PORT, function () {
  logger.debug({ 'NODE_ENV': process.env.NODE_ENV })
})

app.on('error', err => {
  logger.error(err)
})
