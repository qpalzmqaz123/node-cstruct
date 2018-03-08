'use strict'

const assert = require('assert')
const struct = require('../index')

describe('test array', () => {
  it('test int', () => {
    const arr = new (struct.int.times(3))()

    for (let i = 0; i < arr.length; i++) {
      arr[i].$value = i + 1
    }

    assert(Buffer.compare(
      arr.$buffer,
      Buffer.from('010000000200000003000000', 'hex')
    ) === 0)
  })
})

