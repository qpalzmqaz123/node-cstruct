'use strict'

const utils = require('./utils')
const structConfig = require('./config')
const BaseType = require('./base')

class DoubleType extends BaseType {
  /**
   * @param {number} number
   * @param {Object} options
   * @param {Buffer} options.buffer - specify buffer to store c data
   */
  constructor(number = null, options = {}) {
    super(structConfig.dataSize['double'], options.buffer)

    if (number !== null) {
      this.$value = number
    }
  }

  set $value (number) {
    if (typeof number !== 'number') {
      throw new TypeError('value should be number')
    }

    const tmpBuffer = Buffer.alloc(structConfig.dataSize['double'])

    if (structConfig.endianness === 'LE') {
      tmpBuffer.writeDoubleLE(number)
    } else {
      tmpBuffer.writeDoubleBE(number)
    }

    utils.memcpy(this.$_buffer, tmpBuffer, structConfig.dataSize['double'])
  }

  get $value () {
    const tmpBuffer = Buffer.from(this.$_buffer)

    return structConfig.endianness === 'LE' ?
      tmpBuffer.readDoubleLE(0) :
      tmpBuffer.readDoubleBE(0)
  }

  static get byteSize () {
    return structConfig.dataSize['double']
  }
}

exports.DoubleType = DoubleType
