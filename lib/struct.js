'use struct'

const BaseType = require('./base')
const IntType = require('./int')
const utils = require('./utils')

class StructType extends BaseType {
  constructor (config, value) {
    super(config, 0)

    if (value !== undefined) {
      this.$value = value
    }
  }

  set $value (value) {
    if (typeof value !== 'object') {
      throw new TypeError('argument should be object')
    }

    console.log('---------')
  }

  get $value () {
  }

  get $fields () {
  }

  static get structInfo () {
    if (!this._structInfo) {
      this._structInfo = utils.structInfo(this.fields)
    }

    return this._structInfo
  }
}

module.exports = StructType
