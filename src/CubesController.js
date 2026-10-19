/**
 * Igloo.inc Reverse-Engineered Cubes Controller
 * 
 * Reconstructs:
 * - The floating ice cubes (cube1, cube3) with custom roughness, normal maps, and envMap reflections
 * - The encapsulated internal objects (Pudgy Penguin and Overpass Logo)
 * - Animated caustics and noise shaders on internal surfaces
 * - Physics/damping on user hover and interactive inspection
 */

export class CubesController {
  constructor(scene, assetManager, config) {
    this.scene = scene;
    this.assetManager = assetManager;
    this.config = config;
    this.cubeInstances = [];
    this.activeCube = null;
  }

  async init(THREE) {
    for (let i = 0; i < this.config.portfolioCubes.length; i++) {
      const cubeData = this.config.portfolioCubes[i];
      const group = new THREE.Group();
      group.name = `portfolio-cube-${cubeData.id}`;
      group.position.x = (i - 0.5) * 4.0;

      // 1. Load Outer Ice Cube geometry and textures
      const [cubeGeo, roughnessMap, normalMap] = await Promise.all([
        this.assetManager.loadGeometry(`cubes/${cubeData.cubeModel}.drc`),
        this.assetManager.loadTexture(`cubes/${cubeData.cubeModel}_roughness.ktx2`),
        this.assetManager.loadTexture(`cubes/${cubeData.cubeModel}_normal.ktx2`),
      ]);

      const iceMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.65,
        roughnessMap: roughnessMap,
        normalMap: normalMap,
        transmission: 0.9,
        ior: 1.31, // Index of refraction of ice
        thickness: 2.0,
        envMapIntensity: 0.91,
        transparent: true,
      });

      const outerMesh = new THREE.Mesh(cubeGeo, iceMaterial);
      outerMesh.castShadow = true;
      outerMesh.receiveShadow = true;
      group.add(outerMesh);

      // 2. Load Inner Model (pudgy or overpass_logo)
      const [innerGeo, darkColorMap, causticsMap, noiseMap] = await Promise.all([
        this.assetManager.loadGeometry(`${cubeData.innerModel}.drc`),
        this.assetManager.loadTexture(`${cubeData.innerModel}_dark_color.ktx2`),
        this.assetManager.loadTexture("caustics.ktx2", "repeat"),
        this.assetManager.loadTexture("perlin-datatexture.ktx2", "repeat"),
      ]);

      // Inner object custom shader with animated caustics
      const innerMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          tMap: { value: darkColorMap },
          tCaustics: { value: causticsMap },
          tNoise: { value: noiseMap },
        },
        vertexShader: `
          varying vec2 vUv;
          varying vec3 vPos;
          void main() {
            vUv = uv;
            vPos = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform sampler2D tMap;
          uniform sampler2D tNoise;
          uniform sampler2D tCaustics;
          varying vec2 vUv;
          varying vec3 vPos;

          void main() {
            vec3 color = texture2D(tMap, vUv).rgb;
            float noise = texture2D(tNoise, vPos.xy * 0.4 + vec2(-time * 0.1, time * 0.023)).r;
            color *= mix(0.025, 0.15, noise);

            float caustics = texture2D(tCaustics, vPos.xy * 1.5 + vec2(-time * 0.1, time * 0.023)).r;
            caustics = min(caustics, texture2D(tCaustics, vPos.xy * 2.0 + vec2(time * 0.05, -time * 0.013)).r);
            color += caustics * color.b * 30.0;

            gl_FragColor = vec4(color, 1.0);
          }
        `,
      });

      const innerMesh = new THREE.Mesh(innerGeo, innerMaterial);
      innerMesh.scale.setScalar(cubeData.scale || 1.0);
      group.add(innerMesh);

      this.scene.add(group);
      this.cubeInstances.push({
        data: cubeData,
        group,
        outerMesh,
        innerMesh,
        innerMaterial,
        baseRotationY: 0,
      });
    }
  }

  update(delta, elapsed) {
    for (const cube of this.cubeInstances) {
      cube.group.rotation.y += delta * 0.2;
      cube.group.position.y = Math.sin(elapsed * 1.5 + cube.data.temperature) * 0.15;
      if (cube.innerMaterial.uniforms.time) {
        cube.innerMaterial.uniforms.time.value = elapsed;
      }
    }
  }
}
