
/**
 * Responsible for initializing buttons, sliders, radio buttons, etc. present
 * within your HTML document.
 */
function initEventHandelers() {
  if (mouseDown != 1) { mouseDown = 0; }

  canvas.onmouseout = function(ev) { 
  	if(mouseDown < 0) { mouseDown--; } 
  };
  canvas.onmouseup = function(ev) { 
    mouseDown--;
    mouseUp = true; 
  };
  canvas.onmousemove = function(ev) {
    if(mouseUp == false) {mouseDown++}; 
    if(mouseDown == 3 && mouseUp == false) {
      click(ev, gl, canvas, a_Position, u_FragColor, a_PointSize, u_ModelMatrix); //eventFunctions.js  
    } else { return;}
  };
  canvas.onmousedown = function(ev) { 
    mouseDown++; 
    mouseUp = false;
    click(ev, gl, canvas, a_Position, u_FragColor, a_PointSize, u_ModelMatrix);
    xStart = x;
  };
  createWorld();  
}
/**
 * Function called upon mouse click or mouse drag. Computes position of cursor,
 * pushes cursor position as GLSL coordinates, and draws.
 */

function click(ev, gl, canvas, a_Position, u_FragColor, a_PointSize) {
  if(!loop) return;
  initEventHandelers();
   
  clickPostion(ev, gl, canvas);  //eventFunction.js

  check(ev);

  gl.clear(gl.COLOR_BUFFER_BIT);
}

/**
 * Function called upon mouse click or mouse drag. Computes position of cursor,
 * pushes cursor position as GLSL coordinates, and draws.
 *
 */
function clickPostion(ev) {
  x = ev.clientX;
  y = ev.clientY;
  colorX = x;
  colorY = y;
  var rect = ev.target.getBoundingClientRect();
  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);
}


function toRadians (angle) {
  return angle * (Math.PI / 180);
}

function scaleObject(object, xfactor, yfactor, zfactor) {
  var scale = new Matrix4 ();
  scale.setScale(xfactor, yfactor, zfactor);
  object.modelMatrix = scale.multiply(object.modelMatrix);
}

function translateObject(object, xfactor, yfactor, zfactor) {
  var translate = new Matrix4 ();
  translate.setTranslate(xfactor, yfactor, zfactor);

  object.x[0] += xfactor;
  object.y[0] += yfactor;
  object.z[0] += zfactor;

  object.modelMatrix = translate.multiply(object.modelMatrix);
}

function rotateObject(object, rotation, xfactor, yfactor, zfactor) {
  var rotate = new Matrix4 ();
  rotate.setRotate(rotation, xfactor, yfactor, zfactor);
  object.modelMatrix = rotate.multiply(object.modelMatrix);
}

function createGates() {
  for(var i = 0; i < gateCoords.length; i++) {
    var myClosingGate = new ClosingGate(0.1, 0, 0, 0, 0.4, 
                                        myScene.geometries.length, 
                                        gateCoords[i][3]);
    rotateObject(myClosingGate, 180, 0, 0, 1);
    scaleObject(myClosingGate, 2.0, 1.0, 2.0);
    translateObject(myClosingGate, gateCoords[i][0], gateCoords[i][1], gateCoords[i][2]);
    myClosingGate.generateXYPoints();
    //myClosingGate.picked = true;

    myScene.addGeometry(myClosingGate);
  }
}

function check(ev) {
  var rect = ev.target.getBoundingClientRect();
  var x_in_canvas = colorX - rect.left; 
  var y_in_canvas = rect.bottom - colorY;
  gl.uniform1f(u_FSwitch, 0.0);
  myScene.renderGeometryRed();
  

  var pixels = new Uint8Array(4); // Array for storing the pixel value
  gl.readPixels(x_in_canvas, y_in_canvas, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

  for(var pos = 0; pos < myScene.geometries.length; pos++) {
    if(pixels[0] == myScene.geometries[pos].rgb[0]) { 
      if(myScene.geometries[pos].animating[0] == 1) {
        myScene.geometries[pos].picked = (!myScene.geometries[pos].picked);
        myScene.geometries[pos].pauseTime = 40;
      }
      break;
    }
  }
  gl.uniform1f(u_FSwitch, 1.0);
}

function createWorld() {
  if(once) {
    terrain = true
    myFloor = new Floor(1.0, 0, 0, 0, myScene.geometries.length);
    rotateObject(myFloor, 270, 1, 0, 0);
    translateObject(myFloor, 0, 0, -1.1);
    scaleObject(myFloor, 2.25, 2.25, 1);
    myScene.addGeometry(myFloor);
    terrain = false;
    createGates();
  }
  while(once) {
    x=-1.9, y=1.9;
    var xOffset = 0,yOffset = 0; 
    for(var yRange = 0; yRange < worldMap.length; yRange++) {
      for(var xRange = 0; xRange < worldMap[0].length; xRange++) {
        xOffset = xRange * (0.2);
        yOffset = yRange * (0.2);
        if(worldMap[yRange][xRange] == 0) {
          continue;
        } else if(worldMap[yRange][xRange] == 2) {
          myPyramid = new Pyramid(0.08, x+xOffset, y-yOffset, 0, myScene.geometries.length);
          myScene.addGeometry(myPyramid);
        } else if(worldMap[yRange][xRange] == 3) {
          myDiamond = new Diamond(0.08, x+xOffset, y-yOffset, 0, myScene.geometries.length);
          myScene.addGeometry(myDiamond);
        } else if(worldMap[yRange][xRange] == 4) {
          myTiltedCube = new TiltedCube(0.1, x+xOffset, y-yOffset, 0, myScene.geometries.length);
          scaleObject(myTiltedCube, 1, 1, 2);
          translateObject(myTiltedCube, 0, 0, 0.1);
          myScene.addGeometry(myTiltedCube);
        } else {
          myTiltedCube = new TiltedCube(0.1, x+xOffset, y-yOffset, 0, myScene.geometries.length);
          myScene.addGeometry(myTiltedCube);
        }
      }
    }
    myRandomCircle = new RandomCircle(0.075, 40, g_EyeX, g_EyeY, 0, myScene.geometries.length);
    myScene.addGeometry(myRandomCircle);
    once = false;
  }
}

function recreateWorld() {
  clearInterval(timer);

  movedX = 0, movedY = 0;
  currentX = 0, currentY = -1.75;
  g_EyeX = 0.0, g_EyeY = -1.75;
  G_atX = 0; G_atY = 1;
  angleRotation = 90;
  myPlayer.playerX = 0.0, myPlayer.playerY = -1.75;

  bounces = 0, sec = 0;
  document.getElementById("seconds").innerHTML = " ";
  document.getElementById("minutes").innerHTML = " ";

  firstPersonView = true;

  once =  true;
  nthObject = 0;
  document.getElementById("deathReason").innerHTML = "";

  clearInterval(redNthObject);
  myScene.clearGeometry();
  createWorld();
  loop = false;
}

gateCoords = [
  [0.0, 0.1, 0.1, 0],
  [0.0, 0.5, 0.1, 15],
  [1.4, -1.7, 0.1, 8],
  [1.4, -1.5, 0.1, 16], 
  [1.4, -1.3, 0.1, 24], 
  [1.4, -1.1, 0.1, 32],
  [1.4, -0.9, 0.1, 40],
  [-1.4, -1.7, 0.1, 8], 
  [-1.4, -1.5, 0.1, 16],
  [-1.4, -1.3, 0.1, 24],
  [-1.4, -1.1, 0.1, 32],
  [-1.4, -0.9, 0.1, 40]
]
