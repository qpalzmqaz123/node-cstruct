'use strict'

const BN = require('bn.js')
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
    const byteSize = this.constructor.byteSize

    if (byteSize <= 4 && !Number.isInteger(number)) {
      throw new TypeError('argument should be integer')
    } else if (byteSize === 8 && !BN.isBN(number) && typeof number !== 'string') {
      throw new TypeError('64 bit int should be string or BN')
    }

    let num = new BN(number)

    if (num.isNeg()) {
      num = utils.fillBits(byteSize * 8).add(num)
      num = num.addn(1)
    }

    /* set tmp buffer */
    const tmpBuffer = utils.hexStringToByte(num.toString(16), byteSize)
    if (structConfig.endianness === 'LE') {
      tmpBuffer.reverse()
    }

    /* write buffer */
    this.$_writeBuffer(tmpBuffer)
  }

  get $value () {
    let tmpBuffer = this.$_readBuffer()

    if (structConfig.endianness === 'LE') {
      tmpBuffer.reverse()
    }

    let number = new BN(Buffer.from(tmpBuffer).toString('hex'), 16)

    if (this.$_signed) {
      const tmpNumber = new BN(1) << (this.constructor.byteSize * 8 - 1)
      if (tmpNumber & number) { /* negative */
        number = utils.fillBits(this.constructor.byteSize * 8).sub(number).addn(1).neg()
      }
    }

    return this.constructor.byteSize < 8 ? number.toNumber() : number
  }

  $_writeBuffer (buffer) {
    if (!this.$_offset) {
      for (let i = 0; i < buffer.length; i++) {
        this.$_buffer[i] = buffer[i]
      }
    } else {
      /* FIXME: bit fields is unsupported */
      throw new Error('bit fields is unsupported')
      /*
      let bitSize = this.$_offset.tail - this.$_offset.head
      let byteSize = parseInt(bitSize / 8) + 1
      let startIndex = parseInt(this.$_offset.head / 8)

      for (let i = 0; i < byteSize; i++) {
        let remainder = this.$_offset.head % 8
        let mask = utils.fillBits(remainder)

        console.log(mask, remainder)

        this.$_buffer[startIndex + i] &= mask & 0xff
        this.$_buffer[startIndex + i] |= buffer[i] << remainder;
        if (startIndex + i + 1 < byteSize) {
          this.$_buffer[startIndex + i + 1] &= ~mask & 0xff
          this.$_buffer[startIndex + i + 1] |= (buffer[i] >> (8 - remainder)) & 0xff
        }
      }
      */
    }
  }

  $_readBuffer () {
    let tmpBuffer
    const byteSize = this.constructor.byteSize

    if (!this.$_offset) {
      tmpBuffer = this.$_buffer.slice(0, byteSize)
    } else {
    }

    return tmpBuffer
  }
}

module.exports = BaseIntType
