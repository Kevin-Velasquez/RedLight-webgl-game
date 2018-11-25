/**
 * Responsible for animating the Scene.
 */
function tick() {
  for(var k = 0; k < myScene.geometries.length; k++) {
    myScene.geometries[k].updateAnimation();
  }
  if(currentX != g_EyeX || currentY != g_EyeY) {
    deltaPos(); 
    currentX = g_EyeX, currentY = g_EyeY;
  } else {
    movedX = 0, movedY = 0;
  }
  if(firstPersonView) {
    viewMatrix.setLookAt(g_EyeX, g_EyeY, g_EyeZ, G_atX, G_atY, 0, 0, 0, 1);
    gl.uniform1f(u_EyeX, g_EyeX);
    gl.uniform1f(u_EyeY, g_EyeY);
    gl.uniform1f(u_EyeZ, g_EyeZ);
    if(lightCounter == 20) lightStep = -1;
    if(lightCounter == -20) lightStep = 1;
    lightCounter += lightStep;
    gl.uniform1f(u_Light, lightCounter/10);
  } else {
    viewMatrix.setLookAt(0, 0, 5, 0, 0, -100, 0, 1, 0);
    gl.uniform1f(u_EyeX, 0.0);
    gl.uniform1f(u_EyeY, 0.0);
    gl.uniform1f(u_EyeZ, 5.0);
    if(lightCounter == 20) lightStep = -1;
    if(lightCounter == -20) lightStep = 1;
    lightCounter += lightStep;
    gl.uniform1f(u_Light, lightCounter/10);
  }
  if(persp) {
    projMatrix.setPerspective(Number(slider.value), canvas.width/canvas.height, Number(nearslider.value/10), Number(farslider.value));
  } else {
    projMatrix.setOrtho(-1, 1, -1, 1, Number(nearslider.value/10), Number(farslider.value));
  }
  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
  gl.uniformMatrix4fv(u_ProjMatrix, false, projMatrix.elements);
  myScene.renderGeometry();
  requestAnimationFrame(tick, canvas);
}

function deltaPos() {
    movedX = g_EyeX - currentX;
    movedY = g_EyeY - currentY;
}


