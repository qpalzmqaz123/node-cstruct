'use strict'

const structConfig = require('./config')
const BaseType = require('./base')

class BoolType extends BaseType {
  /**
   * @param {Boolean} value
   * @param {Object} options
   * @param {Buffer} options.buffer - specify buffer to store c data
   */
  constructor (value, options = {}) {
    super(structConfig.dataSize['bool'], options.buffer)

    if (value !== undefined && value !== null) {
      this.$value = value
    }
  }

  set $value (value) {
    if (typeof value !== 'boolean') {
      throw new Error('value should be boolean')
    }

    this.$_buffer[0] = value ? 1 : 0
  }

  get $value () {
    return this.$_buffer[0] === 0 ? false : true
  }

  static get byteSize () {
    return structConfig.dataSize['bool']
  }
}

module.exports = BoolType
