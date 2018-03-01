
const Struct = require('./index.js')

const struct = new Struct()

class Point extends struct.struct {
  static get fields () {
    return [
      [ 'x', struct.int, 4 ],
      [ 'y', struct.int, 4 ]
    ]
  }
}

const point = new Point({
  x: 2,
  y: 3
})

//console.log(point)

console.log(Point.structInfo)
