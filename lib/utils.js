
exports.fillBits = bits => {
  let res = 0;

  for (let i = 0; i < bits; i++) {
    res <<= 1
    res |= 1
  }

  return res
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
 *     fields: {
 *       x: {
 *         type: struct.int,
 *         offset: 0,
 *         bitField: {
 *           head: 0,
 *           tail: 5
 *         },
 *         subField: null
 *       },
 *       y: {
 *         type: struct.int,
 *         offset: 0,
 *         bitField: {
 *           head: 5,
 *           tail: 10
 *         },
 *         subField: null
 *       }
 *     }
 *   }
 */
exports.structInfo = function structInfo (fields) {
  for (let field of fields) {
    let [ key, type, bitSize ] = field
  }
}
