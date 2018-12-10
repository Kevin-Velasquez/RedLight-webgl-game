//Kevin Velasquez, ksvelasq@ucsc.edu

function main() {
  myScene = new Scene();
  myGeometry = new Geometry();
  myPlayer = new Player();

  canvas = document.getElementById('webgl');
  canvas.width = window.innerWidth - 15;
  canvas.height = window.innerHeight - 325;

  gl = getWebGLContext(canvas);

  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  a_Normal = gl.getAttribLocation(gl.program, 'a_Normal');
  a_Color = gl.getAttribLocation(gl.program, 'a_Color');

  u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
  u_ProjMatrix = gl.getUniformLocation(gl.program, 'u_ProjMatrix');

  u_EyeX = gl.getUniformLocation(gl.program, 'u_EyeX');
  u_EyeY = gl.getUniformLocation(gl.program, 'u_EyeY');
  u_EyeZ = gl.getUniformLocation(gl.program, 'u_EyeZ');
  u_Light = gl.getUniformLocation(gl.program, 'u_Light');

  u_FSwitch = gl.getUniformLocation(gl.program, 'u_FSwitch');
  u_Clicked = gl.getUniformLocation(gl.program, 'u_Clicked');

  gl.uniform1f(u_FSwitch, 1.0); //LIGHTING
  gl.uniform1i(u_Clicked, 0); // RED

  vertexBuffer = gl.createBuffer();
  normalBuffer = gl.createBuffer();
  vertexColorBuffer = gl.createBuffer();

  initEventHandelers();
  document.onkeydown = function(ev) { keyPress(ev); };

  tick();
}





