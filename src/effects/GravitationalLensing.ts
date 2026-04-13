import { forwardRef } from 'react';
import { Effect } from 'postprocessing';
import { Uniform } from 'three';

const fragmentShader = `
uniform vec2 uBlackHolePosition;
uniform float uLensingStrength;
uniform float uEventHorizonRadius;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec2 center = uBlackHolePosition;
  vec2 toCenter = uv - center;
  float distance = length(toCenter);
  
  // Gravitational lensing effect
  float lensing = 0.0;
  if (distance > 0.01) {
    // Inverse square law for gravitational field
    lensing = uLensingStrength * uEventHorizonRadius / (distance * distance);
    lensing = clamp(lensing, 0.0, 0.3);
  }
  
  // Warp UV coordinates
  vec2 warpedUV = uv + normalize(toCenter) * lensing;
  
  // Sample the warped texture
  outputColor = texture2D(inputBuffer, warpedUV);
  
  // Add slight chromatic aberration near black hole
  if (distance < 0.3) {
    float aberration = (0.3 - distance) * 0.01;
    vec2 rOffset = warpedUV + normalize(toCenter) * aberration;
    vec2 bOffset = warpedUV - normalize(toCenter) * aberration;
    
    float r = texture2D(inputBuffer, rOffset).r;
    float g = outputColor.g;
    float b = texture2D(inputBuffer, bOffset).b;
    
    outputColor = vec4(r, g, b, 1.0);
  }
}
`;

class GravitationalLensingEffect extends Effect {
  constructor({
    blackHolePosition = [0.5, 0.5],
    lensingStrength = 0.15,
    eventHorizonRadius = 0.1,
  } = {}) {
    super('GravitationalLensingEffect', fragmentShader, {
      uniforms: new Map([
        ['uBlackHolePosition', new Uniform(blackHolePosition)],
        ['uLensingStrength', new Uniform(lensingStrength)],
        ['uEventHorizonRadius', new Uniform(eventHorizonRadius)],
      ]),
    });
  }
}

export default GravitationalLensingEffect;
