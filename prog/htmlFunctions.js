/**
 * Updates the text within an HTML element.
 *
 * @param {String} text String being sent to HTML element.
 * @param {String} htmlID The ID of an html element.
 */
function sendTextToHTML(text, htmlID) {
    htmlID.innerHTML = text;
}

/*function addFiles() {
  var objectFile = document.getElementById("objInput");
  var fileReader = new FileReader();
  fileReader.readAsText(objectFile);
  var objString = fileReader.result;
  var loadedOBJ = new LoadedOBJ(objString);
  console.log(loadedOBJ);
  console.log(objString);
  console.log(fileReader.result);
  create2DTexture();
  
}*/

function addFiles() {
  var objectFile = document.getElementById("objInput").files[0];
  var textureFile = document.getElementById("objInput").files[1];
  console.log( "tex: " + textureFile);

  var fileReader = new FileReader();

  fileReader.onloadend = function() {
    var objString = fileReader.result;
    fileReader.onloadend = function() {
      var textureURL = fileReader.result;
      var loadedOBJ = new LoadedOBJ(objString);

      var callback = function(texture) { loadedOBJ.textures[0] = texture; }

      create2DTexture(textureURL, gl.LINEAR, gl.LINEAR, gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE, callback);
      myScene.addGeometry(loadedOBJ);
    }
    fileReader.readAsDataURL(textureFile);
  }
  fileReader.readAsText(objectFile);
}

function resize() {
  // Lookup the size the browser is displaying the canvas.
  var displayWidth  = window.innerWidth - 15;;
  var displayHeight = window.innerHeight - 70;
 
  // Check if the canvas is not the same size.
  if (canvas.width  != displayWidth || canvas.height != displayHeight) {
 
    // Make the canvas the same size
    canvas.width  = displayWidth;
    canvas.height = displayHeight;
    window.location.reload();
  }
}

//allows strafing perpendicular to any look vector
function keyPress(ev) {
  var absX = Math.abs(G_atX);
  var absY = Math.abs(G_atY);
  var rightAngle = (angleRotation - 90);
  var leftAngle = (angleRotation + 90);
  if(Math.sign(rightAngle) == -1) { rightAngle += 360; }
  if(leftAngle >= 360) { leftAngle -= 360; }
  if(ev.keyCode == 68 || ev.keyCode == 39) { // The D(right) key was pressed
    if(rightAngle < 90 && rightAngle >= 0) { //(-)x and (+)y
      if(rightAngle < 90 && rightAngle >= 45) {
        g_EyeY += 0.03;
        g_EyeX += 0.03 * (absY/absX); 
      } else {
        g_EyeY += 0.03 * (absX/absY);
        g_EyeX += 0.03;
      } 
    } else if(rightAngle < 180 && rightAngle >= 90) { 
      if(rightAngle < 135 && rightAngle >= 90) {
        g_EyeY += 0.03;
        g_EyeX -= 0.03 * (absY/absX);
      } else {
        g_EyeY += 0.03 * (absX/absY);
        g_EyeX -= 0.03;
      } 
    } else if (rightAngle < 270 && rightAngle >= 180) {
      if(rightAngle < 270 && rightAngle >= 225) {
        g_EyeY -= 0.03;
        g_EyeX -= 0.03 * (absY/absX);
      } else {
        g_EyeY -= 0.03 * (absX/absY);
        g_EyeX -= 0.03;
      } 
    } else {
      if(rightAngle < 315 && rightAngle >= 270) {
        g_EyeY -= 0.03;
        g_EyeX += 0.03 * (absY/absX);
      } else {
        g_EyeY -= 0.03 * (absX/absY);
        g_EyeX += 0.03;
      } 
    }
  } else 
  if(ev.keyCode == 65 || ev.keyCode == 37) { // The A(left) key was pressed
    if(leftAngle < 90 && leftAngle >= 0) { //(-)x and (+)y
      if(leftAngle < 90 && leftAngle >= 45) {
        g_EyeY += 0.03;
        g_EyeX += 0.03 * (absY/absX);
      } else {
        g_EyeY += 0.03 * (absX/absY);
        g_EyeX += 0.03;
      } 
    } else if(leftAngle < 180 && leftAngle >= 90){                 
      if(leftAngle < 135 && leftAngle >= 90) {
        g_EyeY += 0.03;
        g_EyeX -= 0.03 * (absY/absX);
      } else {
        g_EyeY += 0.03 * (absX/absY);
        g_EyeX -= 0.03;
      } 
    } else if (leftAngle < 270 && leftAngle >= 180) {
      if(leftAngle < 270 && leftAngle >= 225) {
        g_EyeY -= 0.03;
        g_EyeX -= 0.03 * (absY/absX);
      } else {
        g_EyeY -= 0.03 * (absX/absY);
        g_EyeX -= 0.03;
      } 
    } else {
      if(leftAngle < 315 && leftAngle >= 270) {
        g_EyeY -= 0.03;
        g_EyeX += 0.03 * (absY/absX);
      } else {
        g_EyeY -= 0.03 * (absX/absY);
        g_EyeX += 0.03;
      } 
    }
  } else 
  if(ev.keyCode == 87 || ev.keyCode == 38) { // The W key was pressed
    if(Math.sign(G_atX) == -1 && Math.sign(G_atY) == 1) { //(-)x and (+)y
      if(absX > absY) {
        g_EyeY += 0.03 * (absY/absX);
        g_EyeX -= 0.03;
      } else {
        g_EyeY += 0.03;
        g_EyeX -= 0.03 * (absX/absY);
      } 
    } else if(Math.sign(G_atX) == -1 && Math.sign(G_atY) == -1){                     //if x is positive
      if(absX > absY) {
        g_EyeY -= 0.03 * (absY/absX);
        g_EyeX -= 0.03;
      } else {
        g_EyeY -= 0.03;
        g_EyeX -= 0.03 * (absX/absY);
      } 
    } else if (Math.sign(G_atX) == 1 && Math.sign(G_atY) == -1) {
      if(absX > absY) {
        g_EyeY -= 0.03 * (absY/absX);
        g_EyeX += 0.03;
      } else {
        g_EyeY -= 0.03;
        g_EyeX += 0.03 * (absX/absY);
      } 
    } else {
      if(absX > absY) {
        g_EyeY += 0.03 * (absY/absX);
        g_EyeX += 0.03;
      } else {
        g_EyeY += 0.03;
        g_EyeX += 0.03 * (absX/absY);
      } 
    } 
  } else
  if(ev.keyCode == 83 || ev.keyCode == 40) { // The S key was pressed
    if(Math.sign(G_atX) == -1 && Math.sign(G_atY) == 1) { //(-)x and (+)y
      if(absX > absY) {
        g_EyeY -= 0.03 * (absY/absX);
        g_EyeX += 0.03;
      } else {
        g_EyeY -= 0.03;
        g_EyeX += 0.03 * (absX/absY);
      } 
    } else if(Math.sign(G_atX) == -1 && Math.sign(G_atY) == -1){                     //if x is positive
      if(absX > absY) {
        g_EyeY += 0.03 * (absY/absX);
        g_EyeX += 0.03;
      } else {
        g_EyeY += 0.03;
        g_EyeX += 0.03 * (absX/absY);
      } 
    } else if (Math.sign(G_atX) == 1 && Math.sign(G_atY) == -1) {
      if(absX > absY) {
        g_EyeY += 0.03 * (absY/absX);
        g_EyeX -= 0.03;
      } else {
        g_EyeY += 0.03;
        g_EyeX -= 0.03 * (absX/absY);
      } 
    } else {
      if(absX > absY) {
        g_EyeY -= 0.03 * (absY/absX);
        g_EyeX -= 0.03;
      } else {
        g_EyeY -= 0.03;
        g_EyeX -= 0.03 * (absX/absY);
      } 
    }
  } else 

  if(ev.keyCode == 74) {  //Turn left
    angleRotation += 2;
    angleRotation = angleRotation % 360;
    angleRotationRads = toRadians(angleRotation);
    G_atX = 100 * Math.cos(angleRotationRads);
    G_atY = 100 * Math.sin(angleRotationRads);
  } else 
  if(ev.keyCode == 76) {  //Turn right
    angleRotation -= 2;
    angleRotation = angleRotation % 360;
    if(Math.sign(angleRotation) == -1) {
      angleRotation = 360 + angleRotation
    }
    angleRotationRads = toRadians(angleRotation);
    G_atX = 100 * Math.cos(angleRotationRads);
    G_atY = 100 * Math.sin(angleRotationRads);
  } else 

  if(ev.keyCode == 73) { //I : zoom in
    if(slider.value > 30) {
      slider.value -= 2;
      slider = document.getElementById("range");
      output = document.getElementById("value");
      sendTextToHTML(slider.value, output);
      slider.oninput = function() {
        sendTextToHTML(this.value, output);
      }
    }
  } else 
  if(ev.keyCode == 75) { //K : zoom out
    if(slider.value < 90) {
      interSlider = Number(slider.value);
      slider.value = interSlider + 2;
      slider = document.getElementById("range");
      output = document.getElementById("value");
      sendTextToHTML(slider.value, output);
      slider.oninput = function() {
        sendTextToHTML(this.value, output);
      }
    }
  } else
  if(ev.keyCode == 78) {
    nPressed = (!nPressed);
  } 
  else { return; } // Prevent the unnecessary drawing  
}

function orthographic() {
  persp = false;
}

function perspective() {
  persp =true;
}

function firstPerson() {
  img.style.display = "none";
  firstPersonView = true;
  G_atX = tempG_atX;
  G_atY = tempG_atY;
}

function topDown() {
  img = document.getElementById('posimg');
  img.style.display = "block";
  firstPersonView = false;
  tempG_atX = G_atX;
  tempG_atY = G_atY;
  G_atX = 0;
  G_atY = 100;
}

function worldStart() {
  
}

worldMap = [
  [1,1,4,0,4,1,1,1,1,1],
  [0,2,0,0,0,0,0,0,0,0],
  [1,1,1,4,0,4,1,1,1,1],
  [0,0,0,0,0,0,2,0,0,0],
  [1,0,1,1,1,4,0,4,1,1],
  [0,0,0,2,0,0,0,0,0,0],
  [1,1,1,1,4,0,4,0,1,1],
  [0,0,0,0,0,0,0,2,0,0],
  [1,1,1,4,0,0,4,1,1,1],
  [0,3,0,0,0,0,0,0,3,0]
]

/*worldMap = [
  [1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,1,4,0,4,1,1,1,1,1],
  [0,2,0,0,0,0,0,0,0,0],
  [1,1,1,4,0,4,1,1,1,1],
  [0,0,0,0,0,0,2,0,0,0],
  [1,0,1,1,1,4,0,4,1,1],
  [0,0,0,2,0,0,0,0,0,0],
  [1,1,1,1,4,0,4,0,1,1],
  [0,0,0,0,0,0,0,2,0,0],
  [1,1,1,4,0,0,4,1,1,1],
  [0,3,0,0,0,0,0,0,3,0]
]*/


gameOverMap = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,1,0,1,0,0,1,1,0,0,1,0,0,1,0,0,0,0],
  [0,0,0,1,0,1,0,1,0,0,1,0,1,0,0,1,0,0,0,0],
  [0,0,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,0,0],
  [0,0,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,0,0],
  [0,0,0,0,1,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,1,0,0,0,0,1,1,0,0,0,1,1,0,1,1,1,0,0],
  [0,0,1,0,0,0,1,0,0,1,0,1,0,0,0,0,1,0,0,0],
  [0,0,1,0,0,0,1,0,0,1,0,0,1,0,0,0,1,0,0,0],
  [0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,1,0,0,0],
  [0,0,1,1,1,0,0,1,1,0,0,1,1,0,0,0,1,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]

//Large in order to account for 100 sgements circles
verticesColors = new Float32Array([
  // Vertex coordinates and color
   1.0,  1.0,  1.0,  // v0 White
   1.0,  0.0,  1.0,  // v1 Magenta
   1.0,  0.0,  0.0,  // v2 Red
   1.0,  1.0,  0.0,  // v3 Yellow
   0.0,  1.0,  0.0,  // v4 Green
   0.0,  1.0,  1.0,  // v5 Cyan
   0.0,  0.0,  1.0,  // v6 Blue
   0.0,  0.0,  0.0,  // v7 Black
   1.0,  1.0,  1.0,  // v8 White
   1.0,  0.0,  1.0,  // v9 Magenta
   1.0,  0.0,  0.0,  // v10 Red
   1.0,  1.0,  0.0,  // v11 Yellow
   1.0,  1.0,  1.0,  // v12 White
   1.0,  0.0,  1.0,  // v13 Magenta
   1.0,  0.0,  0.0,  // v14 Red
   1.0,  1.0,  0.0,  // v15 Yellow
   0.0,  1.0,  0.0,  // v16 Green
   0.0,  1.0,  1.0,  // v17 Cyan
   0.0,  0.0,  1.0,  // v18 Blue
   0.0,  0.0,  0.0,  // v19 Black
   1.0,  1.0,  1.0,  // v20 White
   1.0,  0.0,  1.0,  // v21 Magenta
   1.0,  0.0,  0.0,  // v22 Red
   1.0,  1.0,  0.0,  // v23 Yellow
   1.0,  1.0,  1.0,  // ... White
   1.0,  0.0,  1.0,  // ... Magenta
   1.0,  0.0,  0.0,  // ... Red
   1.0,  1.0,  0.0,  // ... Yellow
   0.0,  1.0,  0.0,  // ... Green
   0.0,  1.0,  1.0,  // ... Cyan
   0.0,  0.0,  1.0,  // ... Blue
   0.0,  0.0,  0.0,  // ... Black
   1.0,  1.0,  1.0,  // ... White
   1.0,  0.0,  1.0,  // ... Magenta
   1.0,  0.0,  0.0,  // ... Red
   1.0,  1.0,  0.0,  // ... Yellow
   1.0,  1.0,  1.0,  // ... White
   1.0,  0.0,  1.0,  // ... Magenta
   1.0,  0.0,  0.0,  // ... Red
   1.0,  1.0,  0.0,  // ... Yellow
   0.0,  1.0,  0.0,  // ... Green
   0.0,  1.0,  1.0,  // ... Cyan
   0.0,  0.0,  1.0,  // ... Blue
   0.0,  0.0,  0.0,  // ... Black
   1.0,  1.0,  1.0,  // ... White
   1.0,  0.0,  1.0,  // ... Magenta
   1.0,  0.0,  0.0,  // ... Red
   1.0,  1.0,  0.0,  // ... Yellow  
   1.0,  1.0,  1.0,  // ... White
   1.0,  0.0,  1.0,  // ... Magenta
   1.0,  0.0,  0.0,  // ... Red
   1.0,  1.0,  0.0,  // ... Yellow
   0.0,  1.0,  0.0,  // ... Green
   0.0,  1.0,  1.0,  // ... Cyan
   0.0,  0.0,  1.0,  // ... Blue
   0.0,  0.0,  0.0,  // ... Black
   1.0,  1.0,  1.0,  // ... White
   1.0,  0.0,  1.0,  // ... Magenta
   1.0,  0.0,  0.0,  // ... Red
   1.0,  1.0,  0.0,  // ... Yellow
   1.0,  1.0,  1.0,  // ... White
   1.0,  0.0,  1.0,  // ... Magenta
   1.0,  0.0,  0.0,  // ... Red
   1.0,  1.0,  0.0,  // ... Yellow
   0.0,  1.0,  0.0,  // ... Green
   0.0,  1.0,  1.0,  // ... Cyan
   0.0,  0.0,  1.0,  // ... Blue
   0.0,  0.0,  0.0,  // ... Black
   1.0,  1.0,  1.0,  // ... White
   1.0,  0.0,  1.0,  // ... Magenta
   1.0,  0.0,  0.0,  // ... Red
   1.0,  1.0,  0.0,  // ... Yellow  
   1.0,  1.0,  1.0,  // ... White
   1.0,  0.0,  1.0,  // ... Magenta
   1.0,  0.0,  0.0,  // ... Red
   1.0,  1.0,  0.0,  // ... Yellow
   0.0,  1.0,  0.0,  // ... Green
   0.0,  1.0,  1.0,  // ... Cyan
   0.0,  0.0,  1.0,  // ... Blue
   0.0,  0.0,  0.0,  // ... Black
   1.0,  1.0,  1.0,  // ... White
   1.0,  0.0,  1.0,  // ... Magenta
   1.0,  0.0,  0.0,  // ... Red
   1.0,  1.0,  0.0,  // ... Yellow
   1.0,  1.0,  1.0,  // ... White
   1.0,  0.0,  1.0,  // ... Magenta
   1.0,  0.0,  0.0,  // ... Red
   1.0,  1.0,  0.0,  // ... Yellow
   0.0,  1.0,  0.0,  // ... Green
   0.0,  1.0,  1.0,  // ... Cyan
   0.0,  0.0,  1.0,  // ... Blue
   0.0,  0.0,  0.0,  // ... Black
   1.0,  1.0,  1.0,  // ... White
   1.0,  0.0,  1.0,  // ... Magenta
   1.0,  0.0,  0.0,  // ... Red
   1.0,  1.0,  0.0,  // ... Yellow 
   1.0,  1.0,  1.0,  // ... White
   1.0,  0.0,  1.0,  // ... Magenta
   1.0,  0.0,  0.0,  // ... Red
   1.0,  1.0,  0.0,  // ... Yellow
   0.0,  1.0,  0.0,  // ... Green
   0.0,  1.0,  1.0,  // ... Cyan
   0.0,  0.0,  1.0,  // ... Blue
   0.0,  0.0,  0.0,  // ... Black
   1.0,  1.0,  1.0,  // ... White
   1.0,  0.0,  1.0,  // ... Magenta
   1.0,  0.0,  0.0,  // ... Red
   1.0,  1.0,  0.0,  // ... Yellow
   1.0,  1.0,  1.0,  // ... White
   1.0,  0.0,  1.0,  // ... Magenta
   1.0,  0.0,  0.0,  // ... Red
   1.0,  1.0,  0.0,  // ... Yellow
   0.0,  1.0,  0.0,  // ... Green
   0.0,  1.0,  1.0,  // ... Cyan
   0.0,  0.0,  1.0,  // ... Blue
   0.0,  0.0,  0.0,  // ... Black
   1.0,  1.0,  1.0,  // ... White
   1.0,  0.0,  1.0,  // ... Magenta
   1.0,  0.0,  0.0,  // ... Red
   1.0,  1.0,  0.0,  // ... Yellow         
]);
