'use strict'

const assert = require('assert')
const struct = require('../index')

describe('test struct', () => {
  it('test base', () => {
    class Point extends struct.struct {
      static get fields () {
        return [
          [ 'x', struct.int ],
          [ 'y', struct.int ]
        ]
      }
    }

    const point = new Point({
      x: 1,
      y: 10
    })

    point.y.$value = 2

    assert(Buffer.compare(
      point.$buffer,
      Buffer.from('0100000002000000', 'hex')
    ) === 0)
  })

  /* TODO: unsupported
  it('test specify bit size', () => {
    class Point extends struct.struct {
      static get fields () {
        return [
          [ 'x', struct.int, 4 ],
          [ 'y', struct.int, 4 ]
        ]
      }
    }

    const point = new Point()

    point.x.$value = 1
    point.y.$value = 2

    assert(Buffer.compare(
      point.$buffer,
      Buffer.from('21000000', 'hex')
    ) === 0)
  })
  */

  it('test nested 1', () => {
    class Point extends struct.struct {
      static get fields () {
        return [
          [ 'x', struct.int ],
          [ 'y', struct.int ]
        ]
      }
    }

    class MyStruct extends struct.struct {
      static get fields () {
        return [
          [ 'a', struct.char ],
          [ 's', Point ],
          [ 'b', struct.char ],
          [ 'c', struct.char ]
        ]
      }
    }

    const s = new MyStruct()

    s.a.$value = 1
    s.s.x.$value = 2
    s.s.y.$value = 4
    s.b.$value = 8
    s.c.$value = 5

    assert(Buffer.compare(
      s.$buffer,
      Buffer.from('01000000020000000400000008050000', 'hex')
    ) === 0)
  })

  it('test nested 2', () => {
    class Test extends struct.struct {
      static get fields () {
        return [
          [ 'n', struct.int ]
        ]
      }
    }

    class MyStruct extends struct.struct {
      static get fields () {
        return [
          [ 'a', struct.char ],
          [ 's', Test.times(3) ],
          [ 'b', struct.char ]
        ]
      }
    }

    const s = new MyStruct()

    s.a.$value = 1
    s.s[0].n.$value = 3
    s.s[1].n.$value = 4
    s.s[2].n.$value = 5
    s.b.$value = 2

    assert(Buffer.compare(
      s.$buffer,
      Buffer.from('0100000003000000040000000500000002000000', 'hex')
    ) === 0)
  })
})
