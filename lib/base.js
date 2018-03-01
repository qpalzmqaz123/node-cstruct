'use strict'

class BaseArrayType {
  constructor (constructor, length) {
    this._constructor = constructor
    this._length = length

    this._buffer = new Uint8Array(constructor.byteSize * length)

    for (let i = 0; i < this.length; i++) {
      const buffer = this._buffer.subarray(i * constructor.byteSize, (i + 1) * constructor.byteSize)
      const obj = new constructor(null, { buffer })

      Object.defineProperty(this, i.toString(), {
        value: obj
      })
    }
  }

  get length () {
    return this._length
  }

  get $buffer () {
    return Buffer.from(this._buffer)
  }

  get $arrayBuffer () {
    return this._buffer.buffer
  }
}

class BaseType {
  constructor (dataSize, buffer = null) {
    if (dataSize) {
      this.$_buffer = buffer ? buffer : new Uint8Array(dataSize)
    }
  }

  get $buffer () {
    return Buffer.from(this.$_buffer)
  }

  get $arrayBuffer () {
    return this.$_buffer.buffer
  }

  get $hex () {
    return this.$buffer.toString('hex')
  }

  set $value (value) {
  }

  get $value () {
  }

  static get byteSize () {
  }

  static get alignedSize () {
    return this.byteSize
  }

  static get times () {
    const self = this

    return class extends BaseArrayType {
      constructor (length) {
        super(self, length)
      }
    }
  }
}

module.exports = BaseType
