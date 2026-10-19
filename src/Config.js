/**
 * Igloo.inc Reverse-Engineered Site Configuration
 * Extracted from App3D-d68cb154.js bundle
 */

export const Config = {
  metadata: {
    title: "Igloo Inc.",
    description: "Our mission is to create the largest onchain community, driving the consumer crypto revolution.",
    url: "https://igloo.inc",
    author: "Abeto Studio (https://abeto.co)",
    socialImage: "./assets/images/social.jpg",
  },

  palette: {
    bgColor: "#A0A5B1",
    colorProjectTitle: "#67707E",
    colorProjectText: "#A1AAB7",
    fontFamily: "IBMPlexMono-Medium",
  },

  manifesto: {
    title: "////// Manifesto",
    text: "Our mission is to build the next generation of consumer brands at the intersection of Community, AI, and crypto.",
  },

  ui: {
    scrollPrompt: "Scroll down to discover.",
    followPrompt: "/// Follow Us",
    clickExplore: "Click to explore",
    clickDisabled: "???????????????",
    close: "Close",
    copyright: "// Copyright © 2026",
    rights: "Igloo, Inc.\nAll Rights Reserved.",
  },

  social: [
    { name: "X", link: "https://twitter.com/iglooinc" },
    { name: "LI", link: "https://www.linkedin.com/company/igloo-incorporated" },
  ],

  portfolioCubes: [
    {
      id: "pudgy-penguins",
      title: "PORTFOLIO_CO_01 Pudgy Penguins",
      date: "01/02/2020",
      temperature: 0,
      cubeModel: "cube3",
      innerModel: "pudgy",
      scale: 1.1,
      summary: `Pudgy Penguins, a creative venture founded in 2021, quickly gained attention for its unique IP and engaging community. In 2022, the company was acquired by Igloo Inc., a strategic move aimed at expanding its reach and capabilities. The acquisition by Igloo Inc. was part of a broader vision to transform and reposition Pudgy Penguins as a next-generation entertainment company and the face of Web3 worldwide.\n\nWe believe in a future where intellectual property, digital collectibles, and communities are born and thrive on the blockchain. Since our acquisition, Pudgy Penguins has leveraged its onchain origins to create a new model for brand building and community engagement.`,
      socialLinks: [
        { name: "X", link: "https://x.com/pudgypenguins" },
        { name: "IG", link: "https://instagram.com/pudgypenguins" },
        { name: "LI", link: "https://www.linkedin.com/company/pudgy-penguins" },
        { name: "TK", link: "https://www.tiktok.com/@pudgypenguins" },
      ],
      links: [
        { name: "website", link: "https://www.pudgypenguins.com" },
      ],
    },
    {
      id: "overpass",
      title: "PORTFOLIO_CO_02 Overpass",
      date: "06/01/2023",
      temperature: -3,
      cubeModel: "cube1",
      innerModel: "overpass_logo",
      scale: 1.2,
      summary: `OverpassIP was established as a solution to a significant licensing challenge faced by Pudgy Penguins, marking its inception with a crucial breakthrough in NFT licensing. The company empowers NFT holders by allowing them to submit their digital assets for potential licensing opportunities, offering a platform where collections can significantly amplify their growth and engagement. By participating in OverpassIP, collections open up a realm of possibilities for their brands, bringing their holders along for the ride through expansive licensing avenues.\n\nMoreover, brands seeking to enhance their initiatives can access a curated pool of NFTs on OverpassIP, selecting the intellectual property that best aligns with their strategic goals. This innovative approach not only facilitates dynamic partnerships between NFT creators and brands but also pioneers new frontiers in the utilization of digital assets within the broader market.`,
      socialLinks: [
        { name: "X", link: "https://twitter.com/OverpassIP" },
      ],
      links: [
        { name: "website", link: "https://www.overpassip.com" },
      ],
    },
  ],

  volumetricSocialLinks: [
    { title: "LinkedIn", url: "https://www.linkedin.com/company/igloo-incorporated", vdb: "peachesbody_64", scale: 1.2 },
    { title: "X / Twitter", url: "https://www.twitter.com/iglooinc", vdb: "x_64", scale: 1.3 },
    { title: "Medium", url: "https://medium.com/@iglooinc", vdb: "medium_32", scale: 1.25 },
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
