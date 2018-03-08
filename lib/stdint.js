'use strict'

const structConfig = require('./config')
const BaseIntType = require('./base-int')

const arr = [
  [ 'int8', 'Int8Type', 'UInt8Type' ],
  [ 'int16', 'Int16Type', 'UInt16Type' ],
  [ 'int32', 'Int32Type', 'UInt32Type' ],
  [ 'int64', 'Int64Type', 'UInt64Type' ]
]

arr.reduce((acc, value) => {
  let [ type, cls1, cls2 ] = value

  const class1 = class extends BaseIntType {
    constructor (number = null, options = {}) {
      super(Object.assign({
        dataSize: structConfig.dataSize[type],
      }, options), number)
    }

    static get byteSize () {
      return structConfig.dataSize[type]
    }
  }

  const class2 = class extends class1 {
    constructor (number = null, options = {}) {
      options = Object.assign(options, {
        signed: false
      })

      super(number, options)
    }
  }

  acc[cls1] = class1
  acc[cls2] = class2

  return acc
}, exports)
