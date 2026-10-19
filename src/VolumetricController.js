/**
 * Igloo.inc Reverse-Engineered Volumetric Controller
 * 
 * Reconstructs the 3D VDB volumetric raymarching shader system:
 * - Reads 3D textures (`peachesbody_64.ktx2`, `x_64.ktx2`, `medium_32.ktx2`)
 * - Raymarches through unit bounding boxes to render density, absorption, and lighting
 * - Represents interactive onchain / social portals in 3D space
 */

export class VolumetricController {
  constructor(scene, assetManager, config) {
    this.scene = scene;
    this.assetManager = assetManager;
    this.config = config;
    this.volumes = [];
  }

  async init(THREE) {
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

    for (let i = 0; i < this.config.volumetricSocialLinks.length; i++) {
      const link = this.config.volumetricSocialLinks[i];
      const volumeTexture = await this.assetManager.loadTexture(
        `volumes/${link.vdb}.ktx2`,
        "3d-data"
      );

      const material = new THREE.ShaderMaterial({
        uniforms: {
          tVolume: { value: volumeTexture },
          uDensity: { value: 1.0 },
          uColor: { value: new THREE.Color(0xa0a5b1) },
          uSteps: { value: 64 },
        },
        vertexShader: `
          varying vec3 vOrigin;
          varying vec3 vDirection;
          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            vOrigin = (inverse(modelMatrix) * vec4(cameraPosition, 1.0)).xyz;
            vDirection = position - vOrigin;
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          precision highp float;
          precision highp sampler3D;

          uniform sampler3D tVolume;
          uniform float uDensity;
          uniform vec3 uColor;
          varying vec3 vOrigin;
          varying vec3 vDirection;

          vec2 hitBox(vec3 orig, vec3 dir) {
            vec3 box_min = vec3(-0.5);
            vec3 box_max = vec3(0.5);
            vec3 inv_dir = 1.0 / dir;
            vec3 tmin_tmp = (box_min - orig) * inv_dir;
            vec3 tmax_tmp = (box_max - orig) * inv_dir;
            vec3 tmin = min(tmin_tmp, tmax_tmp);
            vec3 tmax = max(tmin_tmp, tmax_tmp);
            float t0 = max(tmin.x, max(tmin.y, tmin.z));
            float t1 = min(tmax.x, min(tmax.y, tmax.z));
            return vec2(t0, t1);
          }

          void main() {
            vec3 rayDir = normalize(vDirection);
            vec2 bounds = hitBox(vOrigin, rayDir);
            if (bounds.x > bounds.y) discard;

            bounds.x = max(bounds.x, 0.0);
            vec3 p = vOrigin + bounds.x * rayDir;
            vec3 inc = rayDir * (1.0 / 64.0);
            float accum = 0.0;

            for (int i = 0; i < 64; i++) {
              vec3 uvw = p + 0.5;
              if (uvw.x >= 0.0 && uvw.x <= 1.0 && uvw.y >= 0.0 && uvw.y <= 1.0 && uvw.z >= 0.0 && uvw.z <= 1.0) {
                float d = texture(tVolume, uvw).r;
                accum += d * uDensity * 0.05;
              }
              p += inc;
            }

            if (accum <= 0.001) discard;
            gl_FragColor = vec4(uColor, clamp(accum, 0.0, 1.0));
          }
        `,
        transparent: true,
        side: THREE.BackSide,
      });

      const mesh = new THREE.Mesh(boxGeometry, material);
      mesh.scale.setScalar(link.scale * 2.0);
      mesh.position.set((i - 1) * 3.0, -1.0, -5.0);

      this.scene.add(mesh);
      this.volumes.push({ link, mesh, material });
    }
  }

  update(delta, elapsed) {
    for (const v of this.volumes) {
      v.mesh.rotation.y += delta * 0.3;
      v.mesh.rotation.x = Math.sin(elapsed * 0.5) * 0.1;
    }
  }
}
