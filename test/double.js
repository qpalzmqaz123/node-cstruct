'use strict'

const assert = require('assert')
const struct = require('../index')

describe('test double', () => {
  it('test r/w', () => {
    const a = new struct.double(12.345)

    assert.equal(a.$value, 12.345)
  })

  it('test buffer', () => {
    const a = new struct.double(12.345)

    assert.equal(Buffer.compare(
      a.$buffer,
      Buffer.from('713D0AD7A3B02840', 'hex')
    ), 0)
  })
})
