'use strict'

const structConfig = require('./config')
const BaseIntType = require('./base-int')

class IntType extends BaseIntType {
  /**
   * @param {number} number
   * @param {Object} options
   * @param {Buffer} options.buffer - specify buffer to store c data
   * @param {Array} options.offset - specify [ head, tail ] bit offset of buffer
   */
  constructor (number, options = {}) {
    super(Object.assign({
      dataSize: structConfig.dataSize['int'],
    }, options), number)
  }

  static get byteSize () {
    return structConfig.dataSize['int']
  }
}

module.exports = IntType
