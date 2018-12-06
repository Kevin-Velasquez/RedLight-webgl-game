/**
 * Specifies a WebGL scene.
 *
 * @author "Your Name Here"
 * @this {Scene}
 */
class Scene {
  /**
   * Constructor for Scene.
   *
   * @constructor
   */
  constructor() {
    this.geometries = []; // Geometries being drawn on canvas
    this.worldObjects = [];
  }

  /**
   * Adds the given geometry to the the scene.
   */
  addWorldObject(worldObject) {
    this.worldObjects.push(worldObject);
  }

  addGeometry(geometry) {
    this.geometries.push(geometry);
  }

  /**
   * Clears all the geometry within the scene.
   */
  clearGeometry() {
    while (this.geometries.length > 0) {
      this.geometries.pop();
    }
  }

  //Rendering the objects will in turn also update the animations.
  //Updating is done individually through their own classes 
  updateAnimation() {
    myGeometry.updateAnimation();
  }
  
  renderWorldObjects() {
    //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    for(var k = 0; k < this.worldObjects.length; k++) {
      this.worldObjects[k].render();
    }
  }

  renderGeometry() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    for(var k = 0; k < this.geometries.length; k++) {
      this.geometries[k].render();
    }
  }

  renderGeometryRed() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    for(var k = 0; k < this.geometries.length; k++) {
      this.geometries[k].renderRed();
    }
  }
}
