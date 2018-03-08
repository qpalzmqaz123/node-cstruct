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
const SSizeType = require('./lib/size_t').SSizeType
const SizeType = require('./lib/size_t').SizeType

const Int8Type = require('./lib/stdint').Int8Type
const UInt8Type = require('./lib/stdint').UInt8Type
const Int16Type = require('./lib/stdint').Int16Type
const UInt16Type = require('./lib/stdint').UInt16Type
const Int32Type = require('./lib/stdint').Int32Type
const UInt32Type = require('./lib/stdint').UInt32Type
const Int64Type = require('./lib/stdint').Int64Type
const UInt64Type = require('./lib/stdint').UInt64Type

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

  get size_t () {
    return SizeType
  }

  get ssize_t () {
    return SSizeType
  }

  get struct () {
    return StructType
  }

  get union () {
    return UnionType
  }
}

module.exports = Struct
