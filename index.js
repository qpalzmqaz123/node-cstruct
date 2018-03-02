'use strict'

const CharType = require('./lib/char')
const IntType = require('./lib/int')
const StructType = require('./lib/struct')

class Struct {
  get char () {
    return CharType
  }

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
