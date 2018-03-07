'use strict'

const assert = require('assert')
const Struct = require('../index')

const struct = new Struct()

describe('test bool', () => {
  it('test r/w', () => {
    const a = new struct.bool(true)

    assert.equal(a.$value, true)
  })

  it('test buffer', () => {
    const a = new struct.bool(true)
    const b = new struct.bool(false)

    assert.equal(Buffer.compare(
      a.$buffer,
      Buffer.from('01', 'hex')
    ), 0)

    assert.equal(Buffer.compare(
      b.$buffer,
      Buffer.from('00', 'hex')
    ), 0)
  })
})
