import { ShaderMaterial, Uniform, Color } from "three";

export class CelestialShaderMaterial extends ShaderMaterial {
    constructor(parameters = {}) {
        super();

        this.vertexShader = `
      varying vec3 vPosition;
      varying vec3 vNormal;
      void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * viewMatrix * modelPosition;
        vec4 modelNormal = modelMatrix * vec4(normal, 0.0);
        vPosition = modelPosition.xyz;
        vNormal = modelNormal.xyz;
      }
    `;

        this.fragmentShader = `
      uniform vec3 glowColor;
      uniform float falloffAmount;
      uniform float glowSharpness;
      uniform float glowInternalRadius;
      uniform float opacity;
      uniform float time;
      varying vec3 vPosition;
      varying vec3 vNormal;

     // --- Noise Function ---
    float hash(vec2 p) {
        return fract(sin(dot(p, vec2(1233.1, 378811.7))) * 43758.5453123);
    }

    float gradientNoise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);

        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));

        vec2 u = f * f * (3.0 - 2.0 * f);

        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    // --- Distort Space ---
    vec2 warp(vec2 st, float time) {
        st += 0.1 * sin(st.yx * 10.0 + time * 2.0);
        st += 0.05 * sin(st.yx * 25.0 + time * 5.0);
        return st;
    }

    // --- Circle ---
    float circle(vec2 st, vec2 center, float radius) {
        return 1.0 - smoothstep(radius - 0.02, radius + 0.02, distance(st, center));
    }

    // --- Rectangle ---
    float rectangle(vec2 st, vec2 bl, vec2 tr) {
        vec2 bl_step = step(bl, st);
        vec2 tr_step = step(st, tr);
        return bl_step.x * bl_step.y * tr_step.x * tr_step.y;
    }
    // --- Wild Colors ---
    vec3 crazyColors(vec2 st, float time) {
        return vec3(
            0.5 + 0.5 * sin(time * 10.0 + st.x * 20.0 + st.y * 10.0),
            0.5 + 0.5 * cos(time * 15.0 + st.y * 25.0 + st.x * 15.0),
            0.5 + 0.5 * sin(time * 8.0 + st.x * 30.0 - st.y * 20.0)
        );
    }
      void main()
      {
        vec3 normal = normalize(vNormal);
        if(!gl_FrontFacing)
            normal *= - 1.0;
        vec3 viewDirection = normalize(cameraPosition - vPosition);
        float fresnel = dot(viewDirection, normal);
        fresnel = pow(fresnel, glowInternalRadius + 0.1);
        vec2 st = gl_FragCoord.xy / vec2(1920, 1080);
           // Warp the space for chaos
        st = warp(st, time);

        // Dynamic scaling
        float scale = 8.0 + 4.0 * sin(time * 0.5);
        st -= 0.5;          // Center
        st *= scale;        // Scale dynamically
        st += 0.5;          // Back to original space

        // Noise-based distortions
        vec2 gridPos = floor(st);
        st = fract(st);
        float n = gradientNoise(gridPos + time * 0.8) * 3.5;

        // Circle and rectangle madness
        vec2 circleCenter = vec2(0.5 + 0.3 * sin(time * 1.5 + gridPos.x), 
                                  0.5 + 0.3 * cos(time * 1.3 + gridPos.y));
        vec2 rect_bl = vec2(0.3, 0.3 + 0.2 * sin(time + gridPos.y));
        vec2 rect_tr = vec2(0.7, 0.7 + 0.2 * cos(time * 0.8 + gridPos.y));

        float circ = circle(st, circleCenter, 0.2 + n * 0.1);
        float rect = rectangle(st, rect_bl, rect_tr);

        // Generate crazy colors
        vec3 shapeColor = crazyColors(st, time * 2.0);

        // Combine shapes
        vec3 color = vec3(0.0); // Start with black
        color += vec3(circ) * shapeColor; // Add circles
        color += vec3(rect) * shapeColor; // Add rectangles

        // Subtle glow for the background
        float glow = smoothstep(0.0, 0.3, circ + rect);
        color += vec3(0.1, 0.05, 0.15) * glow;

        // Adjust intensity and output
        color = pow(color, vec3(1.5)); // Boost brightness
        color = smoothstep(0.0, 1.0, color); // Smooth out extremes
        gl_FragColor = vec4((fresnel + 0.4) * glowColor * (color + vec3(1, 0.2, 0.2)) , 1.0);
      } 
      `;

        this.uniforms = {
            glowColor: new Uniform(parameters.glowColor || new Color("#00d5ff")),
            falloffAmount: new Uniform(parameters.falloff || 0.1),
            glowSharpness: new Uniform(parameters.glowSharpness || 0.5),
            glowInternalRadius: new Uniform(
                parameters.glowInternalRadius || 5.0
            ),
            opacity: new Uniform(parameters.opacity || 1.0),
            time: new Uniform(parameters.time),
        };
    }
}
