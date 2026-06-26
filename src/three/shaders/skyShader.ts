export const skyVertexShader = /* glsl */`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const skyFragmentShader = /* glsl */`
uniform float uTime;
varying vec2 vUv;

float hash21(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float auroraBand(vec2 uv, float off, float freq, float spd) {
  float w = sin(uv.x * freq + off + uTime * spd) * 0.10
           + sin(uv.x * freq * 1.71 + off * 2.3 + uTime * spd * 1.4) * 0.045;
  return smoothstep(0.54 + w, 0.62 + w, uv.y)
       * smoothstep(0.91 + w, 0.74 + w, uv.y);
}

void main() {
  vec2 uv = vUv;
  float y  = uv.y;

  /* Three-stop sky gradient: warm gold horizon → deep purple → near-black navy */
  vec3 horizon = vec3(0.52, 0.16, 0.04);
  vec3 purple  = vec3(0.10, 0.02, 0.26);
  vec3 navy    = vec3(0.01, 0.02, 0.09);

  vec3 col = mix(horizon, purple, smoothstep(0.0,  0.38, y));
  col      = mix(col,     navy,   smoothstep(0.38, 0.88, y));

  /* Aurora ribbons */
  col += vec3(0.0,  1.0,  0.55) * auroraBand(uv, 0.00, 4.0, 0.10) * 0.55;
  col += vec3(0.1,  0.55, 1.00) * auroraBand(uv, 2.09, 5.2, 0.08) * 0.45;
  col += vec3(0.75, 0.1,  1.00) * auroraBand(uv, 4.19, 3.7, 0.12) * 0.32;

  /* Distant-mountain silhouette near horizon */
  float mtn = smoothstep(0.01, 0.10, y);
  col = mix(vec3(0.03, 0.02, 0.06), col, mtn);

  /* Stars – upper 75% of sky only */
  float starMask = smoothstep(0.20, 0.32, y);
  vec2 sv = uv * vec2(150.0, 100.0);
  vec2 sc = floor(sv);
  vec2 sf = fract(sv);
  float sh = hash21(sc);
  if (sh > 0.953) {
    float sz  = (sh - 0.953) / 0.047 * 0.036;
    float d   = length(sf - 0.5);
    float star = max(0.0, 1.0 - d / max(sz, 0.001));
    float twinkle = 0.55 + 0.45 * sin(uTime * (1.5 + sh * 6.0) + sh * 120.0);
    col += vec3(0.85, 0.91, 1.0) * star * twinkle * starMask;
  }

  /* Subtle vignette on the upper sky to keep it dark at the top */
  col *= 1.0 - smoothstep(0.75, 1.0, y) * 0.25;

  gl_FragColor = vec4(col, 1.0);
}
`
