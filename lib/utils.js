
exports.fillBits = bits => {
  let res = 0

  for (let i = 0; i < bits; i++) {
    res <<= 1
    res |= 1
  }

  return res
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

  return {
    alignedSize: maxAlignedSize,
    size: Math.ceil(remainIndex / maxAlignedSize) * maxAlignedSize,
    type: 'struct',
    fields: resFields
  }
}
