'use strict'

const assert = require('assert')
const Struct = require('../index')

const struct = new Struct()

describe('test float', () => {
  it('test r/w', () => {
    const a = new struct.float(3.5)

    assert.equal(a.$value, 3.5)
  })

  it('test buffer', () => {
    const a = new struct.float(3.5)

    assert.equal(Buffer.compare(
      a.$buffer,
      Buffer.from('00006040', 'hex')
    ), 0)
  })
})
