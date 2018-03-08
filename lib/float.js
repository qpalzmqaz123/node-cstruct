'use strict'

const utils = require('./utils')
const structConfig = require('./config')
const BaseType = require('./base')

class FloatType extends BaseType {
  /**
   * @param {number} number
   * @param {Object} options
   * @param {Buffer} options.buffer - specify buffer to store c data
   */
  constructor(number = null, options = {}) {
    super(structConfig.dataSize['float'], options.buffer)

    if (number !== null) {
      this.$value = number
    }
  }

  set $value (number) {
    if (typeof number !== 'number') {
      throw new TypeError('value should be number')
    }

    const tmpBuffer = Buffer.alloc(structConfig.dataSize['float'])

    if (structConfig.endianness === 'LE') {
      tmpBuffer.writeFloatLE(number)
    } else {
      tmpBuffer.writeFloatBE(number)
    }

    utils.memcpy(this.$_buffer, tmpBuffer, structConfig.dataSize['float'])
  }

  get $value () {
    const tmpBuffer = Buffer.from(this.$_buffer)

    return structConfig.endianness === 'LE' ?
      tmpBuffer.readFloatLE() :
      tmpBuffer.readFloatBE()
  }

  static get byteSize () {
    return structConfig.dataSize['float']
  }
}

exports.FloatType = FloatType
