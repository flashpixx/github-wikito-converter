'use strict'

var winston = require('winston')

// Configure CLI on an instance of winston.Logger
var logger = winston.createLogger({
  transports: [
    new (winston.transports.Console)({ level: 'warn' })
  ]
})

module.exports = logger
