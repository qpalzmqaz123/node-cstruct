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

const StructType = require('./lib/struct').StructType
const UnionType = require('./lib/union').UnionType

module.exports = {
  bool: BoolType,
  char: CharType,
  uchar: UCharType,
  short: ShortType,
  ushort: UShortType,
  int: IntType,
  uint: UIntType,
  long: LongType,
  ulong: ULongType,
  longlong: LongLongType,
  ulonglong: ULongLongType,
  float: FloatType,
  double: DoubleType,
  size_t: SizeType,
  ssize_t: SSizeType,

  int8_t: Int8Type,
  uint8_t: UInt8Type,
  int16_t: Int16Type,
  uint16_t: UInt16Type,
  int32_t: Int32Type,
  uint32_t: UInt32Type,
  int64_t: Int64Type,
  uint64_t: UInt64Type,

  struct: StructType,
  union: UnionType
}
