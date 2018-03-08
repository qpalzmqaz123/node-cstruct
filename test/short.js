'use strict'

const assert = require('assert')
const struct = require('../index')

describe('test short', () => {
  it('test r/w', () => {
    const a = new struct.short()
    const b = new struct.ushort()

    a.$value = 100
    b.$value = 100
    assert.equal(a.$value, 100)
    assert.equal(b.$value, 100)
  })

  it('test negative', () => {
    const a = new struct.short()
    const b = new struct.ushort()
  
    a.$value = -1
    b.$value = -1
    assert.equal(a.$value, -1)
    assert.equal(b.$value, 65535)

    a.$value = 65535
    b.$value = 65535
    assert.equal(a.$value, -1)
    assert.equal(b.$value, 65535)
  })

  it('test overflow', () => {
    const a = new struct.short()
    const b = new struct.ushort()

    a.$value = 0x12345
    b.$value = 0x12345

    assert.equal(a.$value, 0x2345)
    assert.equal(b.$value, 0x2345)
  })

  it('test buffer', () => {
    const a = new struct.short()
    const b = new struct.ushort()

    a.$value = -1
    b.$value = 0x1234

    assert.equal(Buffer.compare(
      a.$buffer,
      Buffer.from('ffff', 'hex')
    ), 0)
    assert.equal(Buffer.compare(
      b.$buffer,
      Buffer.from('3412', 'hex')
    ), 0)
  })
})
