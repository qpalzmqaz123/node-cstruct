'use strict'

const CharType = require('./lib/char')
const IntType = require('./lib/int').IntType
const LongType = require('./lib/int').LongType
const StructType = require('./lib/struct')

class Struct {
  get char () {
    return CharType
  }

  get int () {
    return IntType
  }

  get long () {
    return LongType
  }

  get struct () {
    return StructType
  }

  get union () {
  
  }
}

module.exports = Struct
