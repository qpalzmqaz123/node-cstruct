'use strict'

const assert = require('assert')
const Struct = require('../index')

const struct = new Struct()

describe('test int', () => {
  it('test r/w', () => {
    const a = new struct.int()
    const b = new struct.uint()

    a.$value = 100
    b.$value = 100
    assert.equal(a.$value, 100)
    assert.equal(b.$value, 100)
  })

  it('test negative', () => {
    const a = new struct.int()
    const b = new struct.uint()

    a.$value = -1
    b.$value = -1
    assert.equal(a.$value, -1)
    assert.equal(b.$value, 4294967295)

    a.$value = 4294967295
    b.$value = 4294967295
    assert.equal(a.$value, -1)
    assert.equal(b.$value, 4294967295)
  })

  it('test overflow', () => {
    const a = new struct.int()
    const b = new struct.uint()

    a.$value = 0x123456789
    b.$value = 0x123456789

    assert.equal(a.$value, 0x23456789)
    assert.equal(b.$value, 0x23456789)
  })

  it('test buffer', () => {
    const a = new struct.int()
    const b = new struct.uint()

    a.$value = -1
    b.$value = 0x12345678

    assert.equal(Buffer.compare(
      a.$buffer,
      Buffer.from('ffffffff', 'hex')
    ), 0)
    assert.equal(Buffer.compare(
      b.$buffer,
      Buffer.from('78563412', 'hex')
    ), 0)
  })
})
