module.exports = {
  register () {
    require('./nconf')()
    require('./server-path')()
    require('./mongo')()
  }
}
