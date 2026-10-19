/**
 * Igloo.inc Post-Processing Pipeline
 * 
 * Pipeline:
 * - PMNDRS EffectComposer stack
 * - 3D Tetrahedral Color LUT grading (`cube_scene.ktx2` and `igloo_scene.ktx2`)
 * - Depth of field / Bokeh blur (`bokeh.ktx2`)
 * - Vignette and film noise pass (`noises/blue-8-128-rgb.ktx2`)
 */

export class PostProcessing {
  constructor(renderer, scene, camera, assetManager) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.assetManager = assetManager;
    this.composer = null;
  }

  async init(THREE, { EffectComposer, RenderPass, ShaderPass }) {
    this.composer = new EffectComposer(this.renderer);
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    // 1. Tetrahedral 3D LUT Pass
    const lutTexture = await this.assetManager.loadTexture(
      "cubes/cube_scene.ktx2",
      "luttetrahedral"
    );

    const lutShader = {
      uniforms: {
        tDiffuse: { value: null },
        tLUT: { value: lutTexture },
        uLUTSize: { value: 32 },
        uLUTIntensity: { value: 1.0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform sampler3D tLUT;
        uniform float uLUTSize;
        uniform float uLUTIntensity;
        varying vec2 vUv;

        void main() {
          vec4 baseColor = texture2D(tDiffuse, vUv);
          vec3 scale = vec3((uLUTSize - 1.0) / uLUTSize);
          vec3 offset = vec3(0.5 / uLUTSize);
          vec3 graded = texture(tLUT, baseColor.rgb * scale + offset).rgb;
          gl_FragColor = vec4(mix(baseColor.rgb, graded, uLUTIntensity), baseColor.a);
        }
      `,
    };

    const lutPass = new ShaderPass(lutShader);
    this.composer.addPass(lutPass);
    console.log("[PostProcessing] Composer and 3D LUT grading pass initialized.");
  }

  render(delta) {
    if (this.composer) {
      this.composer.render(delta);
    } else {
      this.renderer.render(this.scene, this.camera);
    }
  }

  setSize(width, height) {
    if (this.composer) {
      this.composer.setSize(width, height);
    }
  }
}
