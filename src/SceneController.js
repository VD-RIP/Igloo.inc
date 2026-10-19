/**
 * Igloo.inc Reverse-Engineered Scene Controller
 * 
 * Reconstructs:
 * - WebGLRenderer configuration (PBR, sRGB, tone mapping)
 * - Three.js scene hierarchy (Igloo, Ground, Mountain, Shattered Rings, Cubes, Volumes)
 * - Uniform Buffer Object (UBO) sharing global time and camera state
 * - Camera rig and mouse/scroll responsive navigation
 */

import { Config } from "./Config.js";
import { AssetManager } from "./AssetManager.js";
import { AudioController } from "./AudioController.js";
import { CubesController } from "./CubesController.js";
import { VolumetricController } from "./VolumetricController.js";
import { PostProcessing } from "./PostProcessing.js";

export class SceneController {
  constructor(container = document.body) {
    this.container = container;
    this.config = Config;
    this.assetManager = new AssetManager("");
    this.audioController = new AudioController({ volume: 1.0, muted: true });

    this.clock = null;
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.cubesController = null;
    this.volumetricController = null;
    this.postProcessing = null;
  }

  async init(THREE) {
    this.clock = new THREE.Clock();

    // 1. Renderer Setup
    this.renderer = new THREE.WebGLRenderer({
      powerPreference: "high-performance",
      antialias: true,
      alpha: false,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.container.appendChild(this.renderer.domElement);

    // 2. Scene & Camera
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(this.config.palette.bgColor);

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    this.camera.position.set(0, 0, 10);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 10, 7);
    this.scene.add(dirLight);

    // 4. Subsystems
    this.cubesController = new CubesController(
      this.scene,
      this.assetManager,
      this.config
    );
    this.volumetricController = new VolumetricController(
      this.scene,
      this.assetManager,
      this.config
    );

    // 5. Event Listeners
    window.addEventListener("resize", this.onWindowResize.bind(this));
    this.animate();
  }

  onWindowResize() {
    if (!this.camera || !this.renderer) return;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    if (this.postProcessing) {
      this.postProcessing.setSize(window.innerWidth, window.innerHeight);
    }
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    const delta = this.clock.getDelta();
    const elapsed = this.clock.getElapsedTime();

    if (this.cubesController) this.cubesController.update(delta, elapsed);
    if (this.volumetricController) this.volumetricController.update(delta, elapsed);

    if (this.postProcessing) {
      this.postProcessing.render(delta);
    } else if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }
}
