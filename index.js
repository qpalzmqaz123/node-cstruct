'use strict'

const BoolType = require('./lib/bool')
const CharType = require('./lib/char').CharType
const UCharType = require('./lib/char').UCharType
const ShortType = require('./lib/short').ShortType
const UShortType = require('./lib/short').UShortType
const IntType = require('./lib/int').IntType
const UIntType = require('./lib/int').UIntType
const LongType = require('./lib/long').LongType
const ULongType = require('./lib/long').ULongType
const LongLongType = require('./lib/longlong').LongLongType
const ULongLongType = require('./lib/longlong').ULongLongType
const FloatType = require('./lib/float').FloatType
const DoubleType = require('./lib/double').DoubleType
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

  get short () {
    return ShortType
  }

  get ushort () {
    return UShortType
  }

  get int () {
    return IntType
  }

  get uint () {
    return UIntType
  }

  get long () {
    return LongType
  }

  get ulong () {
    return ULongType
  }

  get longlong () {
    return LongLongType
  }

  get ulonglong () {
    return ULongLongType
  }

  get float () {
    return FloatType
  }

  get double () {
    return DoubleType
  }

  get struct () {
    return StructType
  }

  get union () {
    return UnionType
  }
}

module.exports = Struct
