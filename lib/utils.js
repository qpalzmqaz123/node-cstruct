'use strict'

const BN = require('bn.js')

exports.fillBits = bits => {
  return new BN('1'.repeat(bits), 2)
}

exports.hexStringToByte = (str, byteSize = null) => {
  if (!str) {
    return new Uint8Array();
  }

  const arr = []

  for (let i = 0; i < str.length; i += 2) {
    let left = str.length - 2 - i
    let length = 2

    if (left < 0) {
      left = 0
      length = 1
    }

    let subStr = str.substr(left, length)

    arr.unshift(parseInt(subStr, 16))
  }

  if (byteSize) {
    for (let i = 0; i < byteSize - arr.length; i++) {
      arr.unshift(0)
    }
  }

  return new Uint8Array(arr)
}

exports.uint = (number, bitSize) => {
  let sum = 0

  for (let i = 0; i < bitSize; i++) {
    sum += number & (1 << i) ? 2 ** i : 0
  }

  return sum
}


/**
 * for example: 
 *   fields: [ // [ key, type, bitSize(number|null|undefined) ]
 *     [ 'x', struct.int, 5 ],
 *     [ 'y', struct.int, 5 ]
 *   ]
 *
 * return:
 *   {
 *     size: 4,
 *     alignedSize: 4,
 *     type: 'struct', // struct|union
 *     fields: [
 *       {
 *         key: 'x',
 *         type: struct.int,
 *         offset: 0,
 *         bitField: {
 *           head: 0,
 *           tail: 5
 *         },
 *         subField: null
 *       },
 *       {
 *         key: 'y',
 *         type: struct.int,
 *         offset: 0,
 *         bitField: {
 *           head: 5,
 *           tail: 10
 *         },
 *         subField: null
 *       }
 *     ]
 *   }
 */
exports.structInfo = function structInfo (fields) {
  let maxAlignedSize = 0
  let remainIndex = 0
  let bitOffset = 0

  if (fields.length === 0) {
    return {
      size: 0,
      alignedSize: 0,
      type: 'struct',
      fields: []
    }
  }

  const resFields = fields.reduce((acc, field) => {
    let [ key, type, bitSize ] = field
    let byteSize = type.byteSize
    let alignedSize = type.alignedSize

    if (maxAlignedSize < alignedSize) {
      maxAlignedSize = alignedSize
    }

    let obj = {
      key,
      type,
      subField: null
    }

    if (bitSize) {
      let tail = bitOffset + bitSize

      obj.offset = remainIndex
      obj.bitField = {
        head: bitOffset,
        tail: tail
      }

      remainIndex += parseInt(tail / 8)
      bitOffset = tail % 8
    } else {
      if (bitOffset) {
        bitOffset = 0
        remainIndex += 1
      }

      remainIndex = Math.ceil(remainIndex / alignedSize) * alignedSize

      obj.offset = remainIndex
      obj.bitField = null

      remainIndex += byteSize
    }

    acc.push(obj)
    return acc
  }, [])

  var size = Math.ceil(remainIndex / maxAlignedSize) * maxAlignedSize

  return {
    alignedSize: maxAlignedSize,
    size,
    type: 'struct',
    fields: resFields
  }
}
