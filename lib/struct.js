'use struct'

const BaseType = require('./base')
const utils = require('./utils')

class StructType extends BaseType {
  /**
   * @param {Object} value - struct value
   * @param {Object} options
   * @param {Buffer} options.buffer - specify buffer to store c data
   */
  constructor (value, options = {}) {
    super(0)

    const structInfo = this.constructor.structInfo
    this.$_buffer = options.buffer ? options.buffer : new Uint8Array(structInfo.size)

    for (let field of structInfo.fields) {
      const tmpBuffer = this.$_buffer.subarray(field.offset, field.offset + field.type.byteSize)
      const obj = new field.type(null, {
        buffer: tmpBuffer,
        offset: field.bitField ? [ field.bitField.head, field.bitField.tail ] : undefined
      })

      this[field.key] = obj
    }

    if (value) {
      this.$value = value
    }
  }

  set $value (value) {
    if (value && typeof value !== 'object') {
      throw new TypeError('argument should be object')
    }

    for (let [ key, val ] of Object.entries(value)) {
      this[key].$value = val
    }
  }

  get $value () {
    return Object.keys(this).filter(key => key[0] !== '$').reduce((acc, key) => {
      acc[key] = this[key].$value

      return acc
    }, {})
  }

  static get structInfo () {
    if (!this._structInfo) {
      this._structInfo = utils.structInfo(this.fields)
    }

    return this._structInfo
  }

  static get byteSize () {
    return this.structInfo.size
  }

  static get alignedSize () {
    return this.structInfo.alignedSize
  }
}

exports.StructType = StructType
