/**
 * Specifies a Circle. A subclass of Geometry.
 *
 * @author "Kevin Velasquez"
 * @this {Circle}
 */
class Circle extends Geometry {
  /**
   * Constructor for Circle.
   */
  constructor(radius, segments, centerX, centerY) {
    super();
    this.generateCircleVertices(radius, segments, centerX, centerY);
    this.vertices.push(circleVertices);
    this.x.push(centerX);
    this.y.push(centerY);
  }

  /**
   * Generates the vertices of the Circle.
   */
  generateCircleVertices(radius, segments, centerX, centerY) {
    var degreePerFan = (2 * Math.PI)/ segments;
    vertexData = [centerX, centerY];
    for (var j = 0; j <= segments; j++) {
      var index = 2 * j+2;
      var angle = degreePerFan * (j+1);
      vertexData[index] = centerX + Math.cos(angle) * radius;
      vertexData[index+1] = centerY + Math.sin(angle) * radius;
    }
    circleVertices = new Float32Array(vertexData);
  }
  render() {
    super.render(vertexData.length/2, gl.TRIANGLE_FAN, 2);
  }
}
