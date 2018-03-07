'use strict'

const structConfig = require('./config')
const BaseIntType = require('./base-int')

class LongLongType extends BaseIntType {
  /**
   * @param {number} number
   * @param {Object} options
   * @param {Buffer} options.buffer - specify buffer to store c data
   * @param {Array} options.offset - specify [ head, tail ] bit offset of buffer
   */
  constructor (number, options = {}) {
    super(Object.assign({
      dataSize: structConfig.dataSize['long long'],
    }, options), number)
  }

  static get byteSize () {
    return structConfig.dataSize['long long']
  }
}

class ULongLongType extends LongLongType {
  constructor (number, options = {}) {
    options = Object.assign(options, {
      signed: false
    })

    super(number, options)
  }
}

exports.LongLongType = LongLongType
exports.ULongLongType = ULongLongType
