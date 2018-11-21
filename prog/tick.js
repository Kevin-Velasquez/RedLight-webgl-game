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
  } else {
    viewMatrix.setLookAt(0, 0, 5, 0, 0, -100, 0, 1, 0);
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


