'use strict'

const structConfig = require('./config')
const BaseIntType = require('./base-int')

class CharType extends BaseIntType {
  /**
   * @param {number} number
   * @param {Object} options
   * @param {Buffer} options.buffer - specify buffer to store c data
   * @param {Array} options.offset - specify [ head, tail ] bit offset of buffer
   */
  constructor (number, options = {}) {
    super(Object.assign({
      dataSize: structConfig.dataSize['char'],
    }, options), number)
  }

  static get byteSize () {
    return structConfig.dataSize['char']
  }
}

class UCharType extends CharType {
  constructor (number, options = {}) {
    options = Object.assign(options, {
      signed: false
    })

    super(number, options)
  }
}

exports.CharType = CharType
exports.UCharType = UCharType
