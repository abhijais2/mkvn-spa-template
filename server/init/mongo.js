const mongoose = require('mongoose')
const { MONGODB_URI } = require('nconf').get('mongodb')
const logger = rootRequire('server/services/logger')

// TODO: abstract out error with extending error class
module.exports = () => {
  mongoose.connect(MONGODB_URI, { auto_reconnect: true })

  mongoose.connection.on('connecting', function () {
    logger.debug('Mongoose connecting to mlab @ ' + MONGODB_URI);
  })

  mongoose.connection.on('connected', function () {
    logger.debug('Mongoose default connection open to ' + MONGODB_URI);
  })

  mongoose.connection.on('error',function (err) {
    logger.error('Mongoose default connection error: ' + err);
  })

  mongoose.connection.on('disconnected', function () {
    logger.debug('Mongoose default connection disconnected');
  })

  process.on('SIGINT', function() {
    mongoose.connection.close(function () {
      logger.error('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  })
}
