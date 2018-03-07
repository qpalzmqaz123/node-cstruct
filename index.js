'use strict'

const BoolType = require('./lib/bool')
const CharType = require('./lib/char').CharType
const UCharType = require('./lib/char').UCharType
const IntType = require('./lib/int').IntType
const LongType = require('./lib/int').LongType
const StructType = require('./lib/struct')
const UnionType = require('./lib/union').UnionType

class Struct {
  get bool () {
    return BoolType
  }

  get char () {
    return CharType
  }

  get uchar () {
    return UCharType
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
    return UnionType
  }
}

module.exports = Struct
