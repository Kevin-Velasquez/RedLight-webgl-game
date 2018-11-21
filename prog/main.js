//Kevin Velasquez, ksvelasq@ucsc.edu
/**
 * Variable definitions for all js files.
 */

var gl, ev;
var slider, nearslider, farslider, output, nearoutput, faroutput, interSlider;
var a_Position, u_FragColor, a_PointSize, u_ModelMatrix, u_ViewMatrix, u_ProjMatrix;
var mouseDown = 0, mouseUp = true, x, y, xy, size, rgb, vertexBuffer, rgba;
var triangleVertices, squareVertices, numberOfSegments, circleVertices;
var squareButton = true, triangleButton = false, circleButton = false; 
var tiltedCubeButton = false;
var myScene, myGeometry, mySquare, myTriange, myCircle, myDiamond, myPyramid, myClosingGate;
var mySpinningSquare, myRandomCircle, myFluctuatingTriangle, myTiltedCube;
var ANGLE_STEP = 60.0, currentAngle = 0.0, currentSize = 1.0;
var g_last = Date.now();
var upward = true;
var radian, cosB, sinB;
var vertexData;
var a_Color;
var vertexTexCoordBuffer;
var textureButton = true;
var a_TexCoord;
var verticesColors;
var indices;
var indice;
var vertexColorBuffer;
var reader;
var image;
var cubeVertices, diamondVertices, pyramidVertices, gateVertices;
var worldMap, gameOverMap, color, start = false;
var once = true;
var goingLeft = true;
var g_EyeX = 0.1, g_EyeY = -1, g_EyeZ = 0;
var canvas, fileReader, fileOBJ, objString, loadedOBJ, terrain = true;
var viewMatrix = new Matrix4(); 
var projMatrix = new Matrix4();  
var xStart, xDelta, angleRotation = 90;
var G_atX = 0, G_atY = 100, tempG_atX, tempG_atY, angleRotationRads = 0;
var leftRotation, persp = true, firstPersonView = true;
var currentX = 0, currentY = -2.2;
var g_EyeX = 0, g_EyeY = -2.2, g_EyeZ = 0;
var movedX = 0, movedY = 0;
var img, scale;

/**
 * Function called when the webpage loads.
 */ 

function main() {
  //image = new image();
  myScene = new Scene();
  myGeometry = new Geometry();

  canvas = document.getElementById('webgl');
  canvas.width = window.innerWidth - 15;
  canvas.height = window.innerHeight - 300;

  gl = getWebGLContext(canvas);

  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  //Gets the location of the fragments and shader variables.
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  a_PointSize = gl.getUniformLocation(gl.program, 'a_PointSize');

  u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
  u_ProjMatrix = gl.getUniformLocation(gl.program, 'u_ProjMatrix');

  a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  u_Switch = gl.getUniformLocation(gl.program, 'u_Switch');
  u_FSwitch = gl.getUniformLocation(gl.program, 'u_FSwitch');
  u_VSwitch = gl.getUniformLocation(gl.program, 'u_VSwitch');
  a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
  
  

  //Start with rainbow colors
  //gl.uniform1f(u_FSwitch, 0.5); 
  gl.uniform1f(u_FSwitch, 1.0);
  //gl.uniform1f(u_VSwitch, 1.0);

  vertexColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Color);
  //
  initEventHandelers();
  document.onkeydown = function(ev) { keyPress(ev); };

  tick();
}






