'use strict'

class Type {
  get $buffer () {
  }

  get $arrayBuffer () {
  }

  static get byteSize () {
  }

  static get alignedSize () {
  }
}

class BaseArrayType extends Type {
  constructor (constructor, length, list = null, buffer = null) {
    super()

    this._constructor = constructor
    this._length = length

    this._buffer = buffer ? buffer : new Uint8Array(constructor.byteSize * length)

    for (let i = 0; i < this.length; i++) {
      const tmpBuffer = this._buffer.subarray(i * constructor.byteSize, (i + 1) * constructor.byteSize)
      const obj = new constructor(null, { buffer: tmpBuffer })

      Object.defineProperty(this, i.toString(), {
        value: obj
      })

      if (Array.isArray(list)) {
        obj.$value = list[i]
      }
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

class BaseType extends Type {
  constructor (dataSize, buffer = null) {
    super()

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

  static times (length) {
    const self = this

    return class extends BaseArrayType {
      constructor (list = null, options = {}) {
        super(self, length, list, options.buffer)
      }

      static get byteSize () {
        return length * self.byteSize
      }

      static get alignedSize () {
        return self.byteSize
      }
    }
  }
}

module.exports = BaseType
