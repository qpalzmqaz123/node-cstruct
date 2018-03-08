'use strict'

const assert = require('assert')
const Struct = require('../index')

const struct = new Struct()

describe('test size_t', () => {
  it('test r/w', () => {
    const a = new struct.ssize_t()
    const b = new struct.size_t()

    a.$value = '100'
    b.$value = '100'

    assert.equal(a.$value.toString(10), '100')
    assert.equal(b.$value.toString(10), '100')
  })

  it('test negative', () => {
    const a = new struct.ssize_t()
    const b = new struct.size_t()

    a.$value = '-1'
    b.$value = '-1'
    assert.equal(a.$value.toString(10), '-1')
    assert.equal(b.$value.toString(10), '18446744073709551615')

    a.$value = '18446744073709551615'
    b.$value = '18446744073709551615'
    assert.equal(a.$value.toString(10), '-1')
    assert.equal(b.$value.toString(10), '18446744073709551615')
  })

  it('test buffer', () => {
    const a = new struct.ssize_t()
    const b = new struct.size_t()

    a.$value = '-1'
    b.$value = '12345678'

    assert.equal(Buffer.compare(
      a.$buffer,
      Buffer.from('ffffffffffffffff', 'hex')
    ), 0)
    assert.equal(Buffer.compare(
      b.$buffer,
      Buffer.from('4e61bc0000000000', 'hex')
    ), 0)
  })
})
