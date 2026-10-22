/**
 * Vishva Dev Portfolio Configuration
 */

export const Config = {
  metadata: {
    title: "Vishva Dev — Portfolio",
    description: "Portfolio of Vishva Dev, a student developer creating web applications, creative tools, launchers, and games with code and AI.",
    url: "https://as-igloo.netlify.app",
    socialImage: "./assets/images/social.jpg",
  },

  palette: {
    bgColor: "#A0A5B1",
    colorProjectTitle: "#67707E",
    colorProjectText: "#A1AAB7",
    fontFamily: "IBMPlexMono-Medium",
  },

  manifesto: {
    title: "////// About Me",
    text: "Hi, I'm Vishva Dev, a Class 10 CBSE student interested in coding, software development, and building things with AI. I have created websites and other personal projects, including web-based creative tools, a launcher, an AI-assistant-style project, and a game-inspired website. I enjoy seeing an idea turn into a working project and sharing what I build with friends. I'm still learning, experimenting, and improving my skills as I go.",
  },

  ui: {
    scrollPrompt: "Scroll down to discover.",
    followPrompt: "/// Follow Me",
    clickExplore: "Click to explore",
    clickDisabled: "???????????????",
    close: "Close",
    copyright: "// Copyright © 2026",
    rights: "Vishva Dev\nAll Rights Reserved.",
  },

  social: [
    { name: "GH", link: "https://github.com/VishvaGIT-hub" },
    { name: "IG", link: "https://instagram.com/_just.vishva" },
    { name: "X", link: "https://x.com/VishvaXOfficial" },
    { name: "MED", link: "https://medium.com/@vishvadev543" },
    { name: "MAIL", link: "mailto:vishvadev543@gmail.com" },
  ],

  portfolioCubes: [
    {
      id: "photodev-jarvis",
      title: "PORTFOLIO_01 PhotoDev & JARVIS",
      date: "2024",
      temperature: 0,
      cubeModel: "cube3",
      innerModel: "pudgy",
      scale: 1.1,
      summary: "PhotoDev is a browser-based creative image editor project inspired by Photoshop, built as an interactive web tool for digital graphics and canvas editing. JARVIS is an AI-assistant-style project created by Vishva Dev, exploring custom assistant interactions and smart automated workflows.",
      socialLinks: [
        { name: "IG", link: "https://instagram.com/_just.vishva" },
        { name: "X", link: "https://x.com/VishvaXOfficial" },
        { name: "GH", link: "https://github.com/VishvaGIT-hub" },
      ],
      links: [
        { name: "PhotoDev Demo", link: "https://photodev.netlify.app/" },
        { name: "JARVIS Demo", link: "https://jarvis-lv.netlify.app/" },
        { name: "GitHub", link: "https://github.com/VishvaGIT-hub" },
      ],
    },
    {
      id: "vxlauncher-mandaadi",
      title: "PORTFOLIO_02 VX Launcher & Mandaadi",
      date: "2024",
      temperature: -3,
      cubeModel: "cube1",
      innerModel: "overpass_logo",
      scale: 1.2,
      summary: "VX Launcher is a custom Minecraft launcher project developed by Vishva Dev featuring dedicated profile configuration and an intuitive launching workflow. Mandaadi is an interactive game website project inspired by the Mandaadi movie, crafted for immersive browser-based gameplay.",
      socialLinks: [
        { name: "IG", link: "https://instagram.com/_just.vishva" },
        { name: "X", link: "https://x.com/VishvaXOfficial" },
        { name: "GH", link: "https://github.com/VishvaGIT-hub" },
      ],
      links: [
        { name: "VX Launcher Demo", link: "https://vxlauncher.netlify.app/" },
        { name: "Mandaadi Demo", link: "https://playmandaadi.netlify.app/" },
        { name: "GitHub", link: "https://github.com/VishvaGIT-hub" },
      ],
    },
  ],

  volumetricSocialLinks: [
    { title: "Instagram", url: "https://instagram.com/_just.vishva", vdb: "peachesbody_64", scale: 1.2 },
    { title: "X", url: "https://x.com/VishvaXOfficial", vdb: "x_64", scale: 1.3 },
    { title: "Medium", url: "https://medium.com/@vishvadev543", vdb: "medium_32", scale: 1.25 },
  ],

  audio: {
    ambientTracks: [
      { name: "music-bg", file: "music-highq.ogg", volume: 0.2, loop: true },
      { name: "room-bg", file: "room.ogg", volume: 0.45, loop: true },
      { name: "wind", file: "wind.ogg", volume: 0.0, loop: true },
      { name: "igloo", file: "igloo.ogg", volume: 0.0, loop: true },
      { name: "shard", file: "shard.ogg", volume: 0.0, loop: true },
      { name: "portals", file: "circles.ogg", volume: 0.0, loop: true },
      { name: "particles", file: "particles.ogg", volume: 0.0, loop: true },
    ],
    sfx: [
      { name: "beeps", file: "beeps.ogg", volume: 0.5 },
      { name: "beeps2", file: "beeps2.ogg", volume: 0.5 },
      { name: "beeps3", file: "beeps3.ogg", volume: 0.5 },
      { name: "click-project", file: "click-project.ogg", volume: 0.5 },
      { name: "enter-project", file: "enter-project.ogg", volume: 0.5 },
      { name: "leave-project", file: "leave-project.ogg", volume: 0.5 },
      { name: "project-text", file: "project-text.ogg", volume: 0.5 },
      { name: "logo", file: "logo.ogg", volume: 0.3 },
      { name: "ui-long", file: "ui-long.ogg", volume: 0.3 },
      { name: "ui-short", file: "ui-short.ogg", volume: 0.3 },
      { name: "manifesto", file: "manifesto.ogg", volume: 0.3 },
    ],
  },
};
