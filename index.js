'use strict'

const BaseType = require('./lib/base')
const IntType = require('./lib/int')
const StructType = require('./lib/struct')

class Struct {
  get int () {
    return IntType
  }

  get struct () {
    return StructType
  }

  get union () {
  
  }
}

module.exports = Struct
