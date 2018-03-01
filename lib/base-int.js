'use strict'

const BaseType = require('./base')
const utils = require('./utils')

class BaseIntType extends BaseType {
  /**
   * @param {Object} options
   * @param {Object} options.config - a instance of StructConfig
   * @param {Object} options.dataSize
   * @param {Buffer} options.buffer - specify buffer to store c data
   * @param {Array} options.offset - specify head/tail bit offset of buffer
   * @param {number} number
   */
  constructor (options, number) {
    super(options.config, options.dataSize, options.buffer)

    if (options.offset) {
      this.$_offset = {
        head: options.offset[0],
        tail: options.offset[1]
      }
    }

    if (number !== undefined) {
      this.$value = number
    }
  }

  set $value (number) {
    if (!Number.isInteger(number)) {
      throw new TypeError('argument should be integer')
    }

    /* set value */
    this.$_value = number

    /* set buffer */
    const tmpBuffer = new Uint8Array(this.$_dataSize)
    if (this.$_config.endianness === 'BE') { /* BE */
      for (let i = 0; i < this.$_dataSize; i++) {
        tmpBuffer[i] = (this.$_value >> ((this.$_buffer.length - 1 - i) * 8)) & 0xff
      }
    } else { /* LE */
      for (let i = 0; i < this.$_dataSize; i++) {
        tmpBuffer[i] = (this.$_value >> (i * 8)) & 0xff
      }
    }

    this.$_writeBuffer(tmpBuffer)
  }

  get $value () {
    return this.$_value
  }

  $_writeBuffer (buffer) {
    if (!this.$_offset) {
      for (let i = 0; i < buffer.length; i++) {
        this.$_buffer[i] = buffer[i]
      }
    } else {
      let bitSize = this.$_offset.tail - this.$_offset.head
      let byteSize = parseInt(bitSize / 8) + 1
      let startIndex = parseInt(this.$_offset.head / 8)

      for (let i = 0; i < byteSize; i++) {
        let remainder = this.$_offset.head % 8
        if (remainder === 0) {
          this.$_buffer[startIndex + i] = buffer[i]
        } else {
          let mask = utils.fillBits(remainder)

          this.$_buffer[startIndex + i] &= mask & 0xff
          this.$_buffer[startIndex + i] |= buffer[i] << remainder;
          this.$_buffer[startIndex + i + 1] &= ~mask & 0xff
          this.$_buffer[startIndex + i + 1] |= (buffer[i] >> (8 - remainder)) & 0xff
        }
      }
    }
  }
}

module.exports = BaseIntType
