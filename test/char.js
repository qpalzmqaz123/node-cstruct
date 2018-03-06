'use strict'

const assert = require('assert')
const Struct = require('../index')

const struct = new Struct()

describe('test char', () => {
  it('test r/w', () => {
    const a = new struct.char(127)
    const b = new struct.char(128)
    const c = new struct.uchar(127)
    const d = new struct.uchar(128)

    assert.equal(a.$value, 127)
    assert.equal(b.$value, -128)
    assert.equal(c.$value, 127)
    assert.equal(d.$value, 128)
  })

  it('test out of range', () => {
    const a = new struct.char(257)

    assert.equal(a.$value, 1)
  })

  it('test buffer', () => {
    const a = new struct.char(10)
  
    assert(Buffer.compare(
      a.$buffer,
      Buffer.from('0a', 'hex')
    ) === 0)
  })
})
