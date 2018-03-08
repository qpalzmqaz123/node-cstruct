'use strict'

const assert = require('assert')
const struct = require('../index')

describe('test union', () => {
  it('test r/w', () => {
    class MyUnion extends struct.union {
      static get fields () {
        return [
          [ 'x', struct.char ],
          [ 'y', struct.int ]
        ]
      }
    }

    const a = new MyUnion()

    a.$value = {
      'x': 266
    }

    assert.equal(a.x.$value, 10)
    assert.equal(a.y.$value, 10)

    a.$value = {
      'y': 267
    }

    assert.equal(a.x.$value, 11)
    assert.equal(a.y.$value, 267)
  })

  it('test buffer', () => {
    class MyUnion extends struct.union {
      static get fields () {
        return [
          [ 'x', struct.char ],
          [ 'y', struct.int ]
        ]
      }
    }

    const a = new MyUnion({
      y: 0x1ff
    })

    assert.equal(Buffer.compare(
      a.$buffer,
      Buffer.from('ff010000', 'hex')
    ), 0)
  })
})
