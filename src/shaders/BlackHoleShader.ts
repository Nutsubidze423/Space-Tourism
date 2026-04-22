export const vertexShader = `
varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
  vUv = uv;
  vPos = position;
  vNormal = normalize(normalMatrix * normal);
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vViewPosition = -mvPosition.xyz;
  gl_Position = projectionMatrix * mvPosition;
}
`;

export const fragmentShader = `
uniform float uTime;
uniform vec3 uColorInner;
uniform vec3 uColorOuter;
uniform vec2 uMouse;

varying vec2 vUv;
varying vec3 vPos;
varying vec3 vViewPosition;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for(int i = 0; i < 4; i++) {
        value += amplitude * noise(p * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

void main() {
  vec2 centered = vUv * 2.0 - 1.0;
  float r = length(centered);

  // Rotate 2D position instead of using atan() — avoids the -PI/+PI seam line
  float rotAngle = uTime * 0.3 + r * 4.0;
  float cosA = cos(rotAngle);
  float sinA = sin(rotAngle);
  vec2 spiralCoord = vec2(
    centered.x * cosA - centered.y * sinA,
    centered.x * sinA + centered.y * cosA
  ) * (2.0 + r * 3.0);

  float turbulence = fbm(spiralCoord + uTime * 0.08);
  turbulence += fbm(spiralCoord * 2.0 - uTime * 0.1) * 0.4;

  float bands = sin(r * 18.0 + turbulence * 3.5 + uTime * 0.4) * 0.5 + 0.5;
  bands = pow(bands, 1.5);

  float innerEdge = smoothstep(0.28, 0.35, r);
  float outerEdge = smoothstep(1.3, 0.85, r);
  float alpha = innerEdge * outerEdge;

  vec3 deepOrange = vec3(0.8, 0.3, 0.05);
  vec3 warmOrange = vec3(1.0, 0.5, 0.1);

  vec3 color = mix(uColorInner, deepOrange, smoothstep(0.3, 0.5, r));
  color = mix(color, warmOrange, smoothstep(0.5, 0.7, r));
  color = mix(color, uColorOuter, smoothstep(0.7, 1.0, r));

  float brightness = 0.8 + turbulence * 0.6 + bands * 0.3;
  color *= brightness;

  float hotSpot = pow(turbulence, 3.0) * (1.0 - r * 0.7);
  color += vec3(0.6, 0.4, 0.2) * hotSpot * 1.5;

  alpha *= (0.65 + turbulence * 0.35);
  alpha = clamp(alpha, 0.0, 1.0);

  gl_FragColor = vec4(color, alpha);
}
`;
