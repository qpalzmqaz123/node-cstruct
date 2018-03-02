
const Struct = require('./index.js')

const struct = new Struct()

class Point extends struct.struct {
  static get fields () {
    return [
      [ 'x', struct.int ],
      [ 'y', struct.int, 5 ],
      [ 'z', struct.int, 5 ],
      /*
      [ 'x', struct.char.times(10) ],
      [ 'y', struct.int ]
      */
      /*
      [ 'x', struct.char ],
      [ 'y', struct.int ]
      */
    ]
  }
}

const point = new Point({
  x: 2,
  y: 3,
  z: 4
})

console.log(point.$buffer)
