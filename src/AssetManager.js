/**
 * Igloo.inc Reverse-Engineered Asset Manager
 * 
 * Reconstructs the multi-loader pipeline:
 * - DracoLoader (Google Draco .drc compression for 3D meshes)
 * - KTX2Loader (Basis Universal GPU texture compression)
 * - EXRLoader (High dynamic range environment map)
 * - MSDF Font Loader (Multi-channel Signed Distance Field fonts)
 */

export class AssetManager {
  constructor(basePath = "") {
    this.basePath = basePath;
    this.geometryCache = new Map();
    this.textureCache = new Map();
    this.fontCache = new Map();

    this.paths = {
      geometries: `${basePath}/assets/geometries/`,
      images: `${basePath}/assets/images/`,
      audio: `${basePath}/assets/audio/`,
      fonts: `${basePath}/assets/fonts/`,
      dracoLib: `${basePath}/assets/libs/draco/`,
      basisLib: `${basePath}/assets/libs/basis/`,
    };
  }

  /**
   * Initializes loaders with web-workers and WASM decoders
   */
  async initLoaders(THREE, { DRACOLoader, KTX2Loader }) {
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath(this.paths.dracoLib);
    this.dracoLoader.setWorkerLimit(1);

    this.ktx2Loader = new KTX2Loader();
    this.ktx2Loader.setTranscoderPath(this.paths.basisLib);
    this.ktx2Loader.setWorkerLimit(1);

    console.log("[AssetManager] Draco & KTX2 Loaders initialized.");
  }

  /**
   * Loads a Draco compressed geometry (.drc)
   */
  async loadGeometry(filename) {
    if (this.geometryCache.has(filename)) {
      return this.geometryCache.get(filename);
    }

    const url = `${this.paths.geometries}${filename}`;
    const promise = new Promise((resolve, reject) => {
      this.dracoLoader.load(
        url,
        (geometry) => {
          geometry.computeVertexNormals();
          resolve(geometry);
        },
        undefined,
        (err) => reject(new Error(`Failed to load geometry: ${url} - ${err}`))
      );
    });

    this.geometryCache.set(filename, promise);
    return promise;
  }

  /**
   * Loads a KTX2 Basis-Universal texture
   */
  async loadTexture(filename, mode = "srgb") {
    const key = `${filename}_${mode}`;
    if (this.textureCache.has(key)) {
      return this.textureCache.get(key);
    }

    const url = `${this.paths.images}${filename}`;
    const promise = new Promise((resolve, reject) => {
      this.ktx2Loader.load(
        url,
        (texture) => {
          if (mode.includes("repeat")) {
            texture.wrapS = 1000; // RepeatWrapping
            texture.wrapT = 1000;
          }
          if (mode.includes("srgb")) {
            texture.colorSpace = "srgb";
          }
          resolve(texture);
        },
        undefined,
        (err) => reject(new Error(`Failed to load texture: ${url} - ${err}`))
      );
    });

    this.textureCache.set(key, promise);
    return promise;
  }

  /**
   * Loads an MSDF font specification and datatexture
   */
  async loadFont(fontName = "IBMPlexMono-Medium") {
    if (this.fontCache.has(fontName)) {
      return this.fontCache.get(fontName);
    }

    const jsonUrl = `${this.paths.fonts}${fontName}.json`;
    const textureUrl = `${fontName}-datatexture.ktx2`;

    const [fontJson, texture] = await Promise.all([
      fetch(jsonUrl).then((r) => r.json()),
      this.loadTexture(`../fonts/${textureUrl}`, "data"),
    ]);

    const fontData = { json: fontJson, texture };
    this.fontCache.set(fontName, fontData);
    return fontData;
  }
}
