# Igloo Inc. (`igloo.inc`) — Technical Architecture & Standalone Offline Build

A comprehensive technical study, asset breakdown, shader implementation guide, and standalone offline build of the **[igloo.inc](https://igloo.inc)** interactive web experience (crafted by creative studio **[Abeto](https://abeto.co)** for Pudgy Penguins / Igloo Inc.).

---

## 1. Executive Summary & Tech Stack

| Component | Technology / Implementation |
| --- | --- |
| **Core Framework** | **Svelte 3/4** (SPA hydration, minimal runtime loader & overlay UI) |
| **3D Engine** | **Three.js** (Custom WebGL2 pipeline with UBOs and PBR materials) |
| **Bundler** | **Vite** (Rollup ES modules, chunking, modulepreload) |
| **Geometry Compression** | **Google Draco (`.drc`)** with dedicated Web Worker & WASM decoder |
| **Texture Compression** | **Basis Universal (`.ktx2`)** with multi-threaded WASM transcoder |
| **Typography** | **Multi-channel Signed Distance Field (MSDF)** with Web Worker parser |
| **Environment & Lighting** | High dynamic range **`.exr`** equirectangular environment map + PCSS shadows |
| **Volumetric Effects** | **3D Texture Raymarching (VDB)** for social/onchain portals |
| **Post-Processing** | **PMNDRS Postprocessing** + **3D Tetrahedral LUT Color Grading** |
| **Audio Engine** | Multi-channel spatial **Web Audio API** with dedicated audio worker |

---

## 2. Directory Structure

```
├── assets/
│   ├── audio/              # 18 spatial audio tracks & SFX (.ogg)
│   ├── fonts/              # IBM Plex Mono MSDF definitions (.json & .ktx2)
│   ├── geometries/         # 18 Draco-compressed 3D models (.drc)
│   ├── images/             # KTX2 textures, EXR envmap, and noise patterns
│   │   ├── cubes/          # Ice cube textures, normal & roughness maps
│   │   ├── igloo/          # Ground, mountain, cage, and scene LUTs
│   │   ├── noises/         # Blue noise and tiling vectors
│   │   ├── ui/             # UI datatextures (arrows, sound icon, logo)
│   │   └── volumes/        # 3D VDB density volumes (peachesbody, x, medium)
│   ├── libs/
│   │   ├── basis/          # Basis Universal transcoder (JS + WASM)
│   │   └── draco/          # Draco 3D mesh decoder (JS, wrapper, WASM)
│   ├── audioworker-*.js    # Audio processing web worker
│   ├── bitmapworker-*.js   # ImageBitmap decoder web worker
│   ├── exrworker-*.js      # EXR HDR texture worker
│   ├── msdfworker-*.js     # MSDF font geometry generator worker
│   ├── App3D-d68cb154.js   # Main 3D WebGL application bundle (1.48 MB)
│   └── index-2e130bc1.js   # Svelte loader and mount orchestrator (16 KB)
├── shaders/                # Standalone GLSL shader implementations
│   ├── volumetric_vdb.frag # 3D texture raymarching shader for portals
│   ├── ice_interior.frag   # Refractive ice interior with dual caustics & noise
│   ├── shattered_ring.frag # Glowing celestial ring shader
│   ├── floor_wind.vert     # Wind displacement vertex shader
│   └── tetrahedral_lut.frag# 3D LUT tetrahedral color grading pass
├── src/                    # Modularized TypeScript/ES6 architecture
│   ├── Config.js           # Site copy, portfolio items, palette, audio definitions
│   ├── AssetManager.js     # Draco, KTX2, EXR, and MSDF loading pipeline
│   ├── AudioController.js  # Spatial audio engine & volume scheduler
│   ├── CubesController.js  # Ice cubes (cube1, cube3) & internal models (pudgy, overpass)
│   ├── VolumetricController.js # 3D VDB raymarching controller
│   ├── PostProcessing.js   # 3D LUT grading & post-processing passes
│   └── SceneController.js  # Main Three.js scene graph orchestrator
├── tools/                  # Asset analysis and processing scripts
├── index.html              # Offline-ready entrypoint
├── index.original.html     # Base reference HTML
├── site-config.json        # Structured site data, copy, and content
├── serve.py                # Zero-dependency local server with correct MIME types
└── package.json            # Node.js runner scripts

```

---

## 3. How to Run Locally

Because the application uses Web Workers, WebAssembly (`.wasm`), Draco (`.drc`), and compressed textures (`.ktx2`), modern browsers require it to be served via HTTP(S) with correct MIME types rather than `file://`.

### Option A: Using the included Python server (Recommended)

```bash
python serve.py 8080

```

Open **[http://localhost:8080](http://localhost:8080)** in Chrome, Edge, or Firefox.

### Option B: Using Node / NPM

```bash
npm start
# or
npx serve -l 8080

```

---

## 4. Key Architectural Insights

### 4.1. The 3D Scene Architecture

The experience is built around a continuous vertical camera journey:

1. **The Hero Igloo**:
* `igloo.drc`: The central igloo dome.
* `igloo_outline.drc` & `igloo_cage.drc`: Wireframe and structural ribs.
* `floor.drc` & `mountain.drc`: Procedural landscape with `wind_noise.ktx2` vertex displacement.


2. **Shattered Rings**:
* Celestial rings (`shattered_ring.drc`, `shattered_ring2.drc`) rendered with custom emissive ambient occlusion (`_ao.ktx2`) and camera distance attenuation.


3. **The Portfolio Ice Cubes**:
* `cube3.drc` containing `pudgy.drc` (Pudgy Penguins).
* `cube1.drc` containing `overpass_logo.drc` (OverpassIP).
* Ice materials use real physical transmission ($IOR \approx 1.31$, roughness $\approx 0.65$) paired with high-detail normal maps (`cube1_normal.ktx2`, `cube3_normal.ktx2`).
* Interior models use dual animated caustics (`caustics.ktx2`) and Perlin advection noise (`perlin-datatexture.ktx2`).


4. **Volumetric Social Portals (VDB Raymarching)**:
* Floating 3D volume bounding boxes sampling 3D texture maps:
* `peachesbody_64.ktx2` (LinkedIn portal)
* `x_64.ktx2` (X / Twitter portal)
* `medium_32.ktx2` (Medium portal)


* Raymarched with 64 steps inside the unit cube with custom density absorption.



### 4.2. Shaders Deep-Dive

* **Dual Caustics (`shaders/ice_interior.frag`)**:
Computes moving caustics by sampling a caustics texture at two different scale and velocity offsets, taking `min(caustic1, caustic2)` to create sharp interference caustic lines.
* **Tetrahedral Color Grading (`shaders/tetrahedral_lut.frag`)**:
Samples 3D tetrahedral color lookup tables (`cubes/cube_scene.ktx2` and `igloo/igloo_scene.ktx2`) to achieve cinema-grade color grading and contrast in WebGL.
* **Wind Displacement (`shaders/floor_wind.vert`)**:
Deforms vertices along normal vectors using a tiled wind noise map over time to simulate drifting snow.

### 4.3. Site Content & Brand Configuration

Brand copy, manifesto statements, portfolio summaries, and navigation targets are consolidated into `site-config.json` and `src/Config.js`:

* **Manifesto**: *"Our mission is to build the next generation of consumer brands at the intersection of Community, AI, and crypto."*
* **Portfolio 1**: Pudgy Penguins (`hash: "pudgy-penguins"`, founded 2021, acquired 2022).
* **Portfolio 2**: OverpassIP (`hash: "overpass"`, launched 06/01/2023).
