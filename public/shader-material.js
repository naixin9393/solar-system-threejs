import { ShaderMaterial, Uniform } from 'three';

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


    this.fragmentShader =
      /*GLSL */
      `
      uniform vec3 glowColor;
      uniform float falloffAmount;
      uniform float glowSharpness;
      uniform float glowInternalRadius;
      uniform float opacity;
      varying vec3 vPosition;
      varying vec3 vNormal;
      void main()
      {
        // Normal
        vec3 normal = normalize(vNormal);
        if(!gl_FrontFacing)
            normal *= - 1.0;
        vec3 viewDirection = normalize(cameraPosition - vPosition);
        float fresnel = dot(viewDirection, normal);
        fresnel = pow(fresnel, glowInternalRadius + 0.1);
        float falloff = smoothstep(0., falloffAmount, fresnel);
        float fakeGlow = fresnel;
        fakeGlow += fresnel * glowSharpness;
        fakeGlow *= falloff;
        gl_FragColor = vec4(clamp(glowColor * fresnel, 0., 1.0), clamp(fakeGlow, 0., opacity));
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      } 
      `;

    this.uniforms = {
      glowColor: new Uniform(parameters.glowColor || [0, 213, 255]),
      falloffAmount: new Uniform(parameters.falloff || 0.1),
      glowSharpness: new Uniform(parameters.glowSharpness || 0.5),
      glowInternalRadius: new Uniform(parameters.glowInternalRadius || 6.0),
      opacity: new Uniform(parameters.opacity || 1.0),
    };
  }
}