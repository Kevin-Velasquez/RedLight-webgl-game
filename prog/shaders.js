// Basic Vertex Shader that receives position and size for each vertex (point).
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'attribute vec4 a_Normal;\n' +

  'varying vec4 v_Color;\n' +
  'varying vec3 v_Normal;\n' +
  'varying vec3 v_Position;\n' +

  'uniform mat4 u_ModelMatrix;\n' +
  'uniform mat4 u_ViewMatrix;\n' +
  'uniform mat4 u_ProjMatrix;\n' +

  'void main() {\n' +
  '  gl_Position = u_ProjMatrix * u_ViewMatrix * u_ModelMatrix * a_Position;\n' +
  '  v_Position = vec3(u_ModelMatrix*a_Position);\n' +
  '  v_Normal = normalize(vec3(u_ModelMatrix*a_Normal).xyz);\n' +
  '  v_Color = a_Color;\n' +
  '}\n';

  var FSHADER_SOURCE = 
  'precision mediump float;\n' +

  'varying vec4 v_Color;\n' +
  'varying vec3 v_Normal;\n' +
  'varying vec3 v_Position;\n' +

  'uniform float u_FSwitch;\n' +

  'uniform float u_EyeX;\n' +
  'uniform float u_EyeY;\n' +
  'uniform float u_EyeZ;\n' +
  'uniform float u_Light;\n' +

  '//uniform float ambientCoef;\n' +
  '//uniform float diffuseCoef;\n' +
  '//uniform float specCoef;\n' +
  '//uniform float specExpo;\n' +

  'void main() {\n' +
  '  vec3 lightDirection = normalize(vec3(0.3, u_Light, 0.3));\n' +
  '  vec3 viewDirection = normalize(vec3(u_EyeX, u_EyeY, u_EyeZ));\n' +
  '  float ambientCoef = 0.3;\n' +
  '  float diffuseCoef = 0.3;\n' +
  '  float specCoef = 0.8;\n' +
  '  float specExpo = 1000.0;\n' +

  '  float ambient = ambientCoef;\n' +
  '  float diffuse = diffuseCoef * max(dot(v_Normal, lightDirection), 0.0);\n' +

  '  vec3 eyeVector = normalize(viewDirection - vec3(v_Position));\n' +
  '  vec3 bisector = normalize(eyeVector + lightDirection);\n' +
  '  float specular = specCoef * pow(max(dot(v_Normal, bisector), 0.0), specExpo);\n' +
  '  if (u_FSwitch == 1.0) {\n' +
  '    gl_FragColor = v_Color + (ambient + diffuse + specular);\n' +
  '  }\n' + 
  '  if (u_FSwitch == 0.0) {\n' +
  '    gl_FragColor = v_Color;\n' +
  '  }\n' + 
  '}\n';

