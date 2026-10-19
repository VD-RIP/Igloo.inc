<<<<<<< HEAD
# Igloo Inc. (`igloo.inc`) — 3D WebGL Web Experience

An offline-capable standalone build, asset tree, custom shaders, and modular architecture of the **[igloo.inc](https://igloo.inc)** website.

---

## 1. Tech Stack Overview
=======
# Igloo Inc. — Interactive 3D Web Experience

A standalone interactive 3D web experience featuring immersive environments, real-time rendering, custom GLSL shaders, compressed 3D assets, spatial audio, and an offline-capable local development setup.

Inspired by the visual world of [igloo.inc](https://igloo.inc), created by [Abeto](https://abeto.co) for Pudgy Penguins / Igloo Inc.

---

## 1. Overview & Technology Stack
>>>>>>> d39975d286ab4ba67b40efdebf9a394c8608489a

The project combines modern web technologies with real-time 3D graphics to create an immersive browser-based experience.

| Component | Technology |
|---|---|
| Core Framework | Svelte |
| 3D Engine | Three.js |
| Rendering | WebGL2 |
| Bundling | Vite |
| Geometry Compression | Google Draco |
| Texture Compression | Basis Universal / KTX2 |
| Typography | Multi-channel Signed Distance Fields (MSDF) |
| Environment Lighting | HDR environment maps |
| Volumetric Effects | 3D texture raymarching |
| Post-Processing | Custom GLSL shaders and color grading |
| Audio | Web Audio API |
| Local Hosting | Python HTTP server or Node.js |

*Technology descriptions should reflect the components actually implemented in the project.*

---

## 2. Project Structure

The following is the intended high-level structure. File names and asset counts may vary depending on the current project version.

```text
.
├── assets/
<<<<<<< HEAD
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
│   ├── CubesController.js  # Ice cubes (cube1, cube3) & internal models (pudgy, overpass)
│   ├── VolumetricController.js # 3D VDB raymarching controller
│   ├── PostProcessing.js   # 3D LUT grading & post-processing passes
│   └── SceneController.js  # Main Three.js scene graph orchestrator
├── index.html              # Offline-ready entrypoint
├── site-config.json        # Structured site data and content
├── serve.py                # Local server with correct MIME types
└── package.json            # Node.js runner scripts
=======
│   ├── audio/
│   │   └── Spatial audio tracks and sound effects
│   ├── fonts/
│   │   └── Font data and MSDF textures
│   ├── geometries/
│   │   └── Compressed 3D models
│   ├── images/
│   │   ├── cubes/
│   │   ├── igloo/
│   │   ├── noises/
│   │   ├── ui/
│   │   └── volumes/
│   └── libs/
│       ├── basis/
│       └── draco/
├── shaders/
│   ├── volumetric_vdb.frag
│   ├── ice_interior.frag
│   ├── shattered_ring.frag
│   ├── floor_wind.vert
│   └── tetrahedral_lut.frag
├── src/
│   ├── Config.js
│   ├── AssetManager.js
│   ├── AudioController.js
│   ├── CubesController.js
│   ├── VolumetricController.js
│   ├── PostProcessing.js
│   └── SceneController.js
├── tools/
│   └── Development and asset utilities
├── index.html
├── site-config.json
├── serve.py
├── package.json
└── README.md
>>>>>>> d39975d286ab4ba67b40efdebf9a394c8608489a
```

---

## 3. Getting Started

### Prerequisites

Install the following:

- Python 3, or Node.js and npm
- A modern browser with WebGL2 support
- Git, if cloning the repository

### Option A — Python server

From the project directory, run:

```bash
python serve.py 8080
```

Open the following URL in your browser:

**http://localhost:8080**

### Option B — npm

Install dependencies if required by the project:

```bash
npm install
```

Start the application:

```bash
npm start
```

Alternatively, use Vite during development:

```bash
npm run dev
```

Or start the static server:

```bash
npm run serve
```

The exact startup command depends on the scripts configured in `package.json`.

### Why use a local server?

Modern browsers restrict certain features when an application is opened directly through the `file://` protocol.

Serving the project over HTTP allows browser modules, Web Workers, WebAssembly decoders, and compressed assets to load under an appropriate local origin.

---

<<<<<<< HEAD
## 4. Architecture & Key Features
=======
## 4. Rendering Architecture
>>>>>>> d39975d286ab4ba67b40efdebf9a394c8608489a

### 4.1. Scene Management

<<<<<<< HEAD
### 4.2. Shaders
- **Dual Caustics (`shaders/ice_interior.frag`)**:
  Computes moving caustics by sampling a caustics texture at two different scale and velocity offsets, taking `min(caustic1, caustic2)` to create sharp interference caustic lines.
- **Tetrahedral Color Grading (`shaders/tetrahedral_lut.frag`)**:
  Samples 3D tetrahedral color lookup tables (`cubes/cube_scene.ktx2` and `igloo/igloo_scene.ktx2`) to achieve cinema-grade color grading and contrast in WebGL.
- **Wind Displacement (`shaders/floor_wind.vert`)**:
  Deforms vertices along normal vectors using a tiled wind noise map over time to simulate drifting snow.

### 4.3. Copy & Brand Data
Brand content, manifesto statements, portfolio summaries, and social media links are organized in `site-config.json` and `src/Config.js`.
- **Manifesto**: *"Our mission is to build the next generation of consumer brands at the intersection of Community, AI, and crypto."*
- **Portfolio 1**: Pudgy Penguins (`hash: "pudgy-penguins"`, founded 2021, acquired 2022).
- **Portfolio 2**: OverpassIP (`hash: "overpass"`, launched 06/01/2023).
=======
The application uses a Three.js scene to organize the environment, models, lighting, camera, and interactive elements.

The main scene controller is responsible for coordinating rendering and the application's visual components.

Key scene elements may include:

- **Environment:** An immersive ice-inspired landscape.
- **Central structure:** An igloo-themed focal point.
- **Floating geometry:** Decorative rings and other 3D elements.
- **Interactive objects:** Models displayed inside translucent ice cubes.
- **Environmental effects:** Lighting, shadows, and animated surface details.

### 4.2. Geometry and Materials

Compressed geometry helps reduce asset transfer sizes and memory requirements.

The project can use Draco-compressed meshes alongside Three.js material systems to display detailed 3D models.

Potential material features include:

- Physically based rendering.
- Roughness and normal mapping.
- Refraction and transmission.
- Emissive surfaces.
- Ambient occlusion.
- Animated texture effects.

The final appearance depends on the actual models, materials, lighting, and shader configuration.

### 4.3. Compressed Textures

KTX2 textures using the Basis Universal format can reduce download sizes and GPU memory requirements.

A texture-loading pipeline may include:

1. Loading the texture resource.
2. Detecting supported GPU texture formats.
3. Transcoding the texture when necessary.
4. Configuring filtering and wrapping.
5. Applying the texture to the relevant material.

Three.js provides a `KTX2Loader` for supported KTX2 assets.

### 4.4. Environment Lighting

High-dynamic-range environment maps can provide reflections and illumination for physically based materials.

Combined with appropriate scene lighting, they help create the visual depth and reflective appearance associated with ice and glass.

### 4.5. Volumetric Effects

Volumetric rendering can use 3D textures to represent density inside a volume.

A raymarching shader typically:

1. Computes a ray through a volume.
2. Samples density values along the ray.
3. Accumulates color and opacity.
4. Applies attenuation.
5. Composites the result into the rendered scene.

Performance depends on the number of samples, texture resolution, and rendering hardware.

---

## 5. Custom Shader Collection

The `shaders/` directory contains GLSL shader implementations used for visual effects.

### `volumetric_vdb.frag`

A fragment shader for volumetric effects using 3D density data.

Possible applications include atmospheric volumes, clouds, and portal-like visual elements.

### `ice_interior.frag`

A shader for ice-inspired surface effects.

Potential techniques include animated texture sampling, caustic patterns, and procedural noise.

### `shattered_ring.frag`

A shader for glowing ring-like visual elements.

It can be used to create emissive accents and stylized celestial effects.

### `floor_wind.vert`

A vertex shader for animated surface displacement.

Sampling a noise texture over time can produce subtle movement across a surface.

### `tetrahedral_lut.frag`

A shader for color grading using a three-dimensional lookup table.

Tetrahedral interpolation estimates colors between neighboring LUT samples to produce smooth color transformations.

*Shader filenames and descriptions should be checked against the actual source code before publication.*

---

## 6. Audio System

The Web Audio API supports browser-based audio playback and spatial sound effects.

An audio controller can manage:

- Audio initialization.
- Playback and looping.
- Volume control.
- Audio-source positioning.
- Spatial attenuation.
- Playback scheduling.
- User interaction requirements.

Browsers may restrict autoplay until the user interacts with the page.

---

## 7. Asset Management

The asset manager coordinates loading and initialization of the resources required by the application.

Typical responsibilities include:

- Loading 3D geometry.
- Initializing geometry decoders.
- Loading compressed textures.
- Loading environment maps.
- Managing font resources.
- Reporting loading progress.
- Handling missing or unsupported assets.

A modular asset pipeline makes the application easier to maintain and extend.

---

## 8. Project Configuration

Application settings and content can be organized in dedicated configuration files.

### `src/Config.js`

Can contain application-level settings such as:

- Scene configuration.
- Visual themes.
- Portfolio content.
- Audio definitions.
- Interactive object settings.

### `site-config.json`

Can store structured content used by the interface, such as navigation entries, descriptions, and portfolio metadata.

Keeping content separate from rendering logic simplifies maintenance.

---

## 9. Performance Considerations

For smoother rendering and more efficient asset loading:

- Use compressed geometry and textures where appropriate.
- Dispose of unused GPU resources.
- Limit unnecessary draw calls.
- Optimize shadow maps.
- Avoid excessive volumetric raymarching samples.
- Use texture resolutions appropriate for the scene.
- Reuse materials and geometries when possible.
- Test on integrated GPUs as well as dedicated graphics cards.
- Profile frame time and memory consumption during development.

Performance varies with browser, hardware, display resolution, and scene complexity.

---

## 10. Browser Compatibility

Use a modern browser with WebGL2 support.

Recommended browsers include:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox

WebGL availability, texture-format support, memory limits, and browser security policies may affect individual features.

---

## 11. Development

The project is organized into modules for scene management, asset loading, audio, post-processing, and specialized visual effects.

To contribute:

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test the application locally.
5. Submit a pull request describing the changes.

Keep changes focused and document any new dependencies or setup requirements.

---

## 12. Credits & Attribution

This project explores interactive 3D web graphics and browser-based rendering.

- **Visual inspiration:** [igloo.inc](https://igloo.inc)
- **Creative studio:** [Abeto](https://abeto.co)
- **3D rendering:** [Three.js](https://threejs.org)
- **Geometry compression:** [Google Draco](https://google.github.io/draco/)
- **Texture compression:** [Khronos Group — KTX](https://www.khronos.org/ktx/)
- **Development tooling:** [Vite](https://vite.dev)

Third-party names and links are provided for identification and attribution. This repository does not imply endorsement or official affiliation with the organizations mentioned.

All third-party assets, libraries, trademarks, and other materials remain subject to their respective rights and licenses.

---

## 13. License

The project's distribution and reuse terms depend on the license included in the repository.

Before publishing, select an appropriate license and confirm that you have the rights to distribute all included source code and assets.

---

**Built with Three.js, WebGL, GLSL, and modern web technologies.**
>>>>>>> d39975d286ab4ba67b40efdebf9a394c8608489a
