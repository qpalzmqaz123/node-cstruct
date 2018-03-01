'use strict'

const os = require('os')

class StructConfig {
  constructor () {
    this.endianness = os.endianness()

    if (['x64', 'arm64', 'ppc64'].indexOf(process.arch) !== -1) {
      this.dataSize = {
        long: 8,
        size_t: 8,
        'void *': 8
      }
    } else {
      this.dataSize = {}
    } 
  }

  set endianness (value) {
    if (value !== 'LE' && value !== 'BE') {
      throw new TypeError('Invalid endianness type')
    }

    this._endianness
  }

  get endianness () {
    return this._endianness
  }

  set dataSize (config) {
    this._dataSize = Object.assign({
      bool: 1,
      char: 1,
      short: 2,
      int: 4,
      long: 4,
      'long long': 8,
      float: 4,
      double: 8,
      size_t: 4,
      'void *': 4
    }, config)
  }

  get dataSize () {
    return this._dataSize
  }
}

module.exports = StructConfig
