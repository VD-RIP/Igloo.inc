# Vishva Dev — Interactive 3D Web Portfolio

A personal interactive 3D WebGL portfolio website showcasing projects, creative tools, launchers, and games developed by **Vishva Dev** (student developer building with code and AI).

---

## 1. Overview & Tech Stack

| Component | Technology / Implementation |
|---|---|
| **Core Framework** | **Svelte 3/4** (SPA hydration, minimal runtime loader & overlay UI) |
| **3D Engine** | **Three.js** (Custom WebGL2 pipeline with UBOs and PBR materials) |
| **Bundler** | **Vite** (Rollup ES modules, chunking, modulepreload) |
| **Geometry Compression** | **Google Draco (`.drc`)** with dedicated Web Worker & WASM decoder |
| **Texture Compression** | **Basis Universal (`.ktx2`)** with multi-threaded WASM transcoder |
| **Typography** | **Multi-channel Signed Distance Field (MSDF)** with Web Worker parser |
| **Environment & Lighting**| High dynamic range **`.exr`** equirectangular environment map + PCSS shadows |
| **Volumetric Effects** | **3D Texture Raymarching (VDB)** for social and project portals |
| **Post-Processing** | **PMNDRS Postprocessing** + **3D Tetrahedral LUT Color Grading** |
| **Audio Engine** | Multi-channel spatial **Web Audio API** with dedicated audio worker |

---

## 2. Directory Structure

```
├── assets/
│   ├── audio/              # 18 spatial audio tracks & SFX (.ogg)
│   ├── fonts/              # IBM Plex Mono MSDF definitions (.json & .ktx2)
│   ├── geometries/         # 14 Draco-compressed 3D models (.drc)
│   ├── images/             # KTX2 textures, EXR envmap, and noise patterns
│   │   ├── cubes/          # Ice cube textures, normal & roughness maps
│   │   ├── igloo/          # Ground, mountain, cage, and scene LUTs
│   │   ├── noises/         # Blue noise and tiling vectors
│   │   ├── ui/             # UI datatextures (arrows, sound icon, logo)
│   │   └── volumes/        # 3D VDB density volumes
│   ├── libs/
│   │   ├── basis/          # Basis Universal transcoder (JS + WASM)
│   │   └── draco/          # Draco 3D mesh decoder (JS, wrapper, WASM)
│   ├── audioworker-*.js    # Audio processing web worker
│   ├── bitmapworker-*.js   # ImageBitmap decoder web worker
│   ├── exrworker-*.js      # EXR HDR texture worker
│   ├── msdfworker-*.js     # MSDF font geometry generator worker
│   ├── App3D-d68cb154.js   # Main 3D WebGL application bundle
│   └── index-2e130bc1.js   # Svelte loader and mount orchestrator
├── shaders/                # Custom GLSL shaders
│   ├── volumetric_vdb.frag # 3D texture raymarching shader for portals
│   ├── ice_interior.frag   # Refractive ice interior with dual caustics & noise
│   ├── shattered_ring.frag # Glowing celestial ring shader
│   ├── floor_wind.vert     # Wind displacement vertex shader
│   └── tetrahedral_lut.frag# 3D LUT tetrahedral color grading pass
├── src/                    # Modular TypeScript/ES6 architecture
│   ├── Config.js           # Site copy, portfolio items, palette, audio
│   ├── AssetManager.js     # Draco, KTX2, EXR, and MSDF loading pipeline
│   ├── AudioController.js  # Spatial audio engine & volume scheduler
│   ├── CubesController.js  # Ice cubes & encapsulated 3D projects
│   ├── VolumetricController.js # 3D VDB raymarching controller
│   ├── PostProcessing.js   # 3D LUT grading & post-processing passes
│   └── SceneController.js  # Main Three.js scene graph orchestrator
├── index.html              # Entrypoint
├── site-config.json        # Structured portfolio data and content
├── serve.py                # Local server with correct MIME types
├── netlify.toml            # Netlify edge deployment configuration
└── package.json            # Node.js runner scripts
```

---

## 3. How to Run Locally

### Option A: Using the Python server (Recommended)
```bash
python serve.py 8080
# or
py serve.py 8080
```
Open **[http://localhost:8080](http://localhost:8080)** in Chrome, Edge, or Firefox.

### Option B: Using Node / NPM
```bash
npm start
# or
npx serve -l 8080
```

---

## 4. Featured Portfolio Projects

- **PhotoDev**: Browser-based Photoshop-inspired creative image editor.
  - [Live Demo](https://photodev.netlify.app/)
- **VX Launcher**: Custom Minecraft launcher with dedicated interface.
  - [Live Demo](https://vxlauncher.netlify.app/)
- **JARVIS**: AI-assistant-style project created by Vishva Dev.
  - [Live Demo](https://jarvis-lv.netlify.app/)
- **Mandaadi-inspired game**: Interactive game website inspired by the Mandaadi movie.
  - [Live Demo](https://playmandaadi.netlify.app/)
- **3D Experience Portfolio**:
  - [GitHub Profile](https://github.com/VishvaGIT-hub)
  - [Instagram](https://instagram.com/_just.vishva)
  - Email: `vishvadev543@gmail.com`
