'use struct'

const BaseType = require('./base')
const utils = require('./utils')

class UnionType extends BaseType {
  /**
   * @param {Object} value - union value
   * @param {Object} options
   * @param {Buffer} options.buffer - specify buffer to store c data
   */
  constructor (value = null, options = {}) {
    super(0)

    const unionInfo = this.constructor.unionInfo
    this.$_buffer = options.buffer ? options.buffer : new Uint8Array(unionInfo.size)

    for (let field of unionInfo.fields) {
      const obj = new field.type(null, { buffer: this.$_buffer })

      this[field.key] = obj
    }

    if (value !== null) {
      this.$value = value
    }
  }

  set $value (value) {
    if (typeof value !== 'object') {
      throw new TypeError('value should be object')
    }

    if (Object.keys(value).length !== 1) {
      throw new Error('value can only have one key')
    }

    let [ key, val ] = Object.entries(value)[0]

    this[key].$value = val
  }

  get $value () {
    return Object.keys(this).filter(key => key[0] !== '$').reduce((acc, key) => {
      acc[key] = this[key].$value

      return acc
    }, {})
  }

  static get unionInfo () {
    if (!this._unionInfo) {
      this._unionInfo = utils.unionInfo(this.fields)
    }

    return this._unionInfo
  }

  static get byteSize () {
    return this.unionInfo.size
  }

  static get alignedSize () {
    return this.unionInfo.alignedSize
  }
}

exports.UnionType = UnionType
