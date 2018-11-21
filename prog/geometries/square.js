/**
 * Specifies a Square. A subclass of Geometry.
 *
 * @author "Kevin Velasquez"
 * @this {Square}
 */
class Square extends Geometry {
  /**
   * Constructor for Square.
   */
  constructor(size, centerX, centerY) {
    super();
    this.generateSquareVertices(size, centerX, centerY);
    this.vertices.push(squareVertices);
    this.x.push(centerX);
    this.y.push(centerY);
    //super.render(squareVertices, 4, renderMethod);
  }

  /**
   * Generates the vertices of the square.
   */
  generateSquareVertices(size, centerX, centerY) {
    squareVertices = new Float32Array([
      centerX-size, centerY+size,    centerX-size, centerY-size,    centerX+size, centerY+size,    centerX+size, centerY-size
    ]);
  }
  render() {
    super.render(4, gl.TRIANGLE_STRIP, 2);
  }
}
