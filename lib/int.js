'use strict'

const BaseIntType = require('./base-int')

class IntType extends BaseIntType {
  /**
   * @param {Object} options
   * @param {Object} options.config - a instance of StructConfig
   * @param {Buffer} options.buffer - specify buffer to store c data
   * @param {Array} options.offset - specify head/tail bit offset of buffer
   * @param {number} number
   */
  constructor (options, number) {
    super(Object.assign({
      dataSize: options.config.dataSize['int']
    }, options), number)
  }
}

module.exports = IntType
