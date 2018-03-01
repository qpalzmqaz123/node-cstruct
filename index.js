'use strict'

const StructConfig = require('./lib/config')
const BaseType = require('./lib/base')
const IntType = require('./lib/int')
const StructType = require('./lib/struct')

class Struct {
  constructor () {
    this.$_config = new StructConfig()
  }

  get int () {
    const self = this

    return class extends IntType {
      constructor (number) {
        super({
          config: self.$_config
        }, number)
      }

      static get byteSize () {
        return self.$_config.dataSize['int']
      }
    }
  }

  get struct () {
    const self = this

    return class extends StructType {
      constructor (value) {
        super(self.$_config, value)
      }
    }
  }

  get union () {
  
  }
}

module.exports = Struct
