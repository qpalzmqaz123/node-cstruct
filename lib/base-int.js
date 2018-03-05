'use strict'

const structConfig = require('./config')
const BaseType = require('./base')
const utils = require('./utils')

class BaseIntType extends BaseType {
  /**
   * @param {Object} options
   * @param {Object} options.dataSize
   * @param {Buffer} options.buffer - specify buffer to store c data
   * @param {Array} options.offset - specify head/tail bit offset of buffer
   * @param {Array} options.signed - specify signed(default)/unsigned
   * @param {number} number
   */
  constructor (options, number) {
    options = Object.assign({
      buffer: null,
      offset: null,
      signed: true
    }, options)

    super(options.dataSize, options.buffer)

    if (options.offset) {
      this.$_offset = {
        head: options.offset[0],
        tail: options.offset[1]
      }
    }

    this.$_signed = options.signed

    if (number !== undefined && number !== null) {
      this.$value = number
    }
  }

  set $value (number) {
    if (!Number.isInteger(number)) {
      throw new TypeError('argument should be integer')
    }

    /* set buffer */
    const byteSize = this.constructor.byteSize
    const tmpBuffer = new Uint8Array(byteSize)
    for (let i = 0; i < byteSize; i++) {
      if (structConfig.endianness === 'BE') { /* BE */
          tmpBuffer[i] = (number >> ((this.$_buffer.length - 1 - i) * 8)) & 0xff
      } else { /* LE */
          tmpBuffer[i] = (number >> (i * 8)) & 0xff
      }
    }

    this.$_writeBuffer(tmpBuffer)
  }

  get $value () {
    let res = 0
    let bitSize = 0

    if (!this.$_offset) {
      bitSize = this.constructor.byteSize * 8

      for (let i = 0; i < this.constructor.byteSize; i++) {
        res <<= 8

        if (structConfig.endianness === 'BE') { /* BE */
          res |= this.$_buffer[i] & 0xff
        } else {
          res |= this.$_buffer[this.constructor.byteSize - i - 1] & 0xff
        }
      }
    } else {
      bitSize = this.$_offset.tail - this.$_offset.head
    }

    /* caculate real value */
    res &= utils.fillBits(bitSize)

    if (this.$_signed) {
      if (res & (1 << (bitSize - 1))) { /* negative */
        res = -(utils.fillBits(bitSize) - res + 1)
      } else { /* positive */
        res = utils.uint(res, bitSize - 1)
      }
    }

    return res
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
