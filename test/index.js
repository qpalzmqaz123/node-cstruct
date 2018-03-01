const assert = require('assert')
const Struct = require('../index')

const struct = new Struct()

/*
struct.packedValueSize = {
  bool: 1,
  char: 1,
  short: 2,
  int: 4,
  long: 4,
  'long long': 8,
  float: 4,
  double: 8,
  size_t: 4,
  'void *': 4
}
*/

struct.packedValueSize = {
  bool: 1,
  char: 1,
  short: 2,
  int: 4,
  long: 8,
  'long long': 8,
  float: 4,
  double: 8,
  size_t: 8,
  'void *': 8
}

struct.isBigEndian = false

describe('test int', () => {
  it('test 1', () => {
    const int1 = new struct.int(1)

    assert(Buffer.compare(
      int1.$buffer,
      Buffer.from('01000000', 'hex')
    ) === 0)
  })
})

describe('test array', () => {
  it('test int', () => {
    const arr = new struct.int.times(3)

    for (let i = 0; i < arr.length; i++) {
      arr[i].$value = i + 1
    }

    assert(Buffer.compare(
      arr.$buffer,
      Buffer.from('010000000200000003000000', 'hex')
    ) === 0)
  })
})

describe('struct', () => {
  it('test base', () => {
    const point = struct.struct([
      [ 'x', struct.int ],
      [ 'y', struct.int ]
    ])

    point.x = 1
    point.y = 2

    assert(Buffer.compare(
      point.$buffer,
      Buffer.from('0100000002000000', 'hex')
    ) === 0)
  })

  it('test specify bit size', () => {
    const point = struct.struct([
      [ 'x', struct.int, 4 ],
      [ 'y', struct.int, 4 ]
    ])

    point.x = 1
    point.y = 2

    assert(Buffer.compare(
      point.$buffer,
      Buffer.from('21000000', 'hex')
    ) === 0)
  })

  it('test nested', () => {
    const testStruct = struct.struct([
      [ 'a', struct.int ],
      [ 'point', struct.struct([
        [ 'x', struct.int ],
        [ 'y', struct.int ]
      ]) ],
      [ 'b', struct.int ]
    ])

    testStruct.a = 1
    testStruct.b = 2
    testStruct.point.x = 3
    testStruct.point.y = 4

    assert(Buffer.compare(
      point.$buffer,
      Buffer.from('01000000030000000400000002000000', 'hex')
    ) === 0)
  })
})

describe('union', () => {
  it('test union', () => {
    const vaule = struct.union([
      [ 'i', struct.int ],
      [ 'f', struct.float ]
    ])

    value.f = 1

    assert(Buffer.compare(
      point.$buffer,
      Buffer.from('0x0000803F', 'hex')
    ) === 0)
  })
})
