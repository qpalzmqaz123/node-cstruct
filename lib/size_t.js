'use strict'

const structConfig = require('./config')
const BaseIntType = require('./base-int')

class SSizeType extends BaseIntType {
  /**
   * @param {number} number
   * @param {Object} options
   * @param {Buffer} options.buffer - specify buffer to store c data
   * @param {Array} options.offset - specify [ head, tail ] bit offset of buffer
   */
  constructor (number, options = {}) {
    super(Object.assign({
      dataSize: structConfig.dataSize['size_t'],
    }, options), number)
  }

  static get byteSize () {
    return structConfig.dataSize['size_t']
  }
}

class SizeType extends SSizeType {
  constructor (number, options = {}) {
    options = Object.assign(options, {
      signed: false
    })

    super(number, options)
  }
}

exports.SSizeType = SSizeType
exports.SizeType = SizeType
