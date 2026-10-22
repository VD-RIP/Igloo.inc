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
| **Volumetric Effects** | **3D Texture Raymarching (VDB)** for social portals (Instagram, X, Medium) |
| **Post-Processing** | **PMNDRS Postprocessing** + **3D Tetrahedral LUT Color Grading** |
| **Audio Engine** | Multi-channel spatial **Web Audio API** with dedicated audio worker |

---

## 2. Featured Portfolio Showcases

- **Portfolio 01 — PhotoDev & JARVIS**:
  - **PhotoDev**: Browser-based creative image editor project inspired by Photoshop.
    - [Live Demo](https://photodev.netlify.app/)
  - **JARVIS**: Custom AI assistant project exploring conversational and automated workflows.
    - [Live Demo](https://jarvis-lv.netlify.app/)

- **Portfolio 02 — VX Launcher & Mandaadi**:
  - **VX Launcher**: Custom Minecraft launcher with dedicated interface and launcher workflow.
    - [Live Demo](https://vxlauncher.netlify.app/)
  - **Mandaadi**: Interactive game website project inspired by the Mandaadi movie.
    - [Live Demo](https://playmandaadi.netlify.app/)

- **3D Volumetric Portals**:
  - **Instagram**: [https://instagram.com/_just.vishva](https://instagram.com/_just.vishva)
  - **X (Twitter)**: [https://x.com/VishvaXOfficial](https://x.com/VishvaXOfficial)
  - **Medium**: [https://medium.com/@vishvadev543](https://medium.com/@vishvadev543)
  - **GitHub**: [https://github.com/VishvaGIT-hub](https://github.com/VishvaGIT-hub)
  - **Email**: `vishvadev543@gmail.com`

---

## 3. How to Run Locally

```bash
py serve.py 8080
# or
python serve.py 8080
```
Open **[http://localhost:8080](http://localhost:8080)** in Chrome, Edge, or Firefox.
