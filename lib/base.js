'use strict'

class BaseType {
  constructor (config, dataSize, buffer = null) {
    this.$_config = config
    this.$_dataSize = dataSize
    this.$_buffer = buffer ? buffer : new Uint8Array(dataSize)
  }

  get $buffer () {
    return Buffer.from(this.$_buffer)
  }

  get $arrayBuffer () {
    return this.$_buffer.buffer
  }

  get $hex () {
    return this.$buffer.toString('hex')
  }

  set $value (value) {
  }

  get $value () {
  }

  $times (number) {
  }
}

module.exports = BaseType
