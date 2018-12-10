//Kevin Velasquez, ksvelasq@ucsc.edu
/**
 * Variable definitions for all js files.
 */

var gl;
var slider, nearslider, farslider, output, nearoutput, faroutput, interSlider;
var a_Position, u_FragColor, a_PointSize, u_ModelMatrix, u_ViewMatrix, u_ProjMatrix, a_Normal;
var mouseDown = 0, mouseUp = true, x, y, xy, size, rgb, rgba;
var triangleVertices, squareVertices, numberOfSegments, circleVertices;
var squareButton = true, triangleButton = false, circleButton = false; 
var tiltedCubeButton = false;
var myScene, myGeometry, mySquare, myTriange, myCircle, myDiamond, myPyramid;
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
var cubeVertices, diamondVertices, pyramidVertices, gateVertices, floorVertices;
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
var currentX = 0, currentY = -1.75;
var g_EyeX = 0, g_EyeY = -1.75, g_EyeZ = 0;
var u_EyeX, u_EyeY, u_EyeZ;
var movedX = 0, movedY = 0;
var img, scale, cubeNormals, gateNormals, pyramidNormals, diamondNormals, circleNormals, floorNormals;
var u_Light, lightCounter = 0, lightStep = 1;
var nPressed = false;
var u_Clicked, objectClicked = false;
var nthObjectColor = 100;
var colorX, colorY;
var myPlayer, nthObject = 0;
var redNthObject;
var vertexBuffer, normalBuffer, vertexColorBuffer;
var tracker = document.getElementById('tracker');
const RADIUS = 20;
var xX = 0;
var yY = 0;
var loop = false;
var bounces = 0;
var timer, sec = 0, highSec = 0; 
var gateCoords;
