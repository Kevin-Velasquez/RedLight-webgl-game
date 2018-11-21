/**
 * Specifies a Triangle. A subclass of Geometry.
 *
 * @author "Kevin Velasquez"
 * @this {Triangle}
 */
class Triangle extends Geometry {
  /**
   * Constructor for Triangle.
   */
  constructor(size, centerX, centerY) {
    super();
    this.generateTriangleVertices(size, centerX, centerY);
    this.vertices.push(triangleVertices);
    this.x.push(centerX);
    this.y.push(centerY);
    this.goingLeft = true;
  }

  /**
   * Generates the vertices of the Triangle.
   */
  generateTriangleVertices(size, centerX, centerY) {
    triangleVertices = new Float32Array([
      centerX, centerY-size,    centerX-size, centerY+size,    centerX+size, centerY+size 
    ]);
  }
  render() {
    super.render(3, gl.TRIANGLES, 2);
  }
}
