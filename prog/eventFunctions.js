
/**
 * Responsible for initializing buttons, sliders, radio buttons, etc. present
 * within your HTML document.
 */
function initEventHandelers() {
  slider = document.getElementById("range");
  output = document.getElementById("value");
  sendTextToHTML(slider.value, output);
  slider.oninput = function() {
    sendTextToHTML(this.value, output);
  }

  nearslider = document.getElementById("nearrange");
  nearoutput = document.getElementById("nearvalue");
  sendTextToHTML(nearslider.value/10, nearoutput);
  nearslider.oninput = function() {
    sendTextToHTML(this.value/10, nearoutput);
  }

  farslider = document.getElementById("farrange");
  faroutput = document.getElementById("farvalue");
  sendTextToHTML(farslider.value, faroutput);
  farslider.oninput = function() {
    sendTextToHTML(this.value, faroutput);
  }



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

  if(once) {
    terrain = true
    myRandomCircle = new RandomCircle(0.075, 40, g_EyeX, g_EyeY);
    myTiltedCube = new TiltedCube(1.0, 0, 0);
    rotateObject(myTiltedCube, 270, 1, 0, 0);
    translateObject(myTiltedCube, 0, 0, -1.1);
    scaleObject(myTiltedCube, 1, 2.25, 1);
    myScene.addGeometry(myTiltedCube);
    myScene.addGeometry(myRandomCircle);
    terrain = false;
    createGates();
  }
  while(once) {
    x=-0.9, y=0.9
    var xOffset = 0,yOffset = 0; 
    for(var yRange = 0; yRange < worldMap.length; yRange++) {
      for(var xRange = 0; xRange < worldMap[0].length; xRange++) {
        xOffset = xRange * (0.2);
        yOffset = yRange * (0.2);
        if(worldMap[yRange][xRange] == 0) {
          continue;
        } else if(worldMap[yRange][xRange] == 2) {
          myPyramid = new Pyramid(0.08, x+xOffset, y-yOffset);
          myScene.addGeometry(myPyramid);
        } else if(worldMap[yRange][xRange] == 3) {
          myDiamond = new Diamond(0.08, x+xOffset, y-yOffset);
          myScene.addGeometry(myDiamond);
        } else if(worldMap[yRange][xRange] == 4) {
          myTiltedCube = new TiltedCube(0.1, x+xOffset, y-yOffset);
          scaleObject(myTiltedCube, 1, 1, 2);
          translateObject(myTiltedCube, 0, 0, 0.1);
          myScene.addGeometry(myTiltedCube);
        } else {
          myTiltedCube = new TiltedCube(0.1, x+xOffset, y-yOffset);
          myScene.addGeometry(myTiltedCube);
        }
      }
    }
    once = false;
  }
}
/**
 * Function called upon mouse click or mouse drag. Computes position of cursor,
 * pushes cursor position as GLSL coordinates, and draws.
 */

function click(ev, gl, canvas, a_Position, u_FragColor, a_PointSize) {
  initEventHandelers();
   
  clickPostion(ev, gl, canvas);  //eventFunction.js

  var picked = check();

  gl.clear(gl.COLOR_BUFFER_BIT);

  document.getElementById("xcoords").innerHTML = "X: " + x;
  document.getElementById("ycoords").innerHTML = "Y: " + y;
}

/**
 * Function called upon mouse click or mouse drag. Computes position of cursor,
 * pushes cursor position as GLSL coordinates, and draws.
 *
 */
function clickPostion(ev, gl, canvas) {
  x = ev.clientX;
  y = ev.clientY;
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
  object.modelMatrix = translate.multiply(object.modelMatrix);
}

function rotateObject(object, rotation, xfactor, yfactor, zfactor) {
  var rotate = new Matrix4 ();
  rotate.setRotate(rotation, xfactor, yfactor, zfactor);
  object.modelMatrix = rotate.multiply(object.modelMatrix);
}

function createGates() {
  myClosingGate = new ClosingGate(0.2, 0, 0, 0.4);
  rotateObject(myClosingGate, 180, 0, 0, 1);
  scaleObject(myClosingGate, 1, 0.5, 1);
  translateObject(myClosingGate, 0, -0.7, 0.1);
  myScene.addGeometry(myClosingGate);
}

function check() {
  var picked = false;
  //gl.uniform1i(u_Clicked, 1);  // Pass true to u_Clicked}


}
