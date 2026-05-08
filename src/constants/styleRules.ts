export const STYLE_RULES = {

  vivid: {
    minS: 60,
    minV: 45,
  },

  muted: {
    minS: 15,
    maxS: 50,
  },

  pastel: {
    minV: 80,
    maxS: 40,
  },

  neon: {
    minV: 85,
    minS: 80,
  },

  vintage: {
    maxS: 35,
    minV: 30,
    maxV: 75,
  },

  earth: {
    minH: 20,
    maxH: 70,
    minS: 20,
    maxS: 60,
    minV: 20,
    maxV: 65,
  },

  warm: {
    hueRanges: [
      [0, 70],
      [300, 360],
    ],
  },

  cool: {
    hueRanges: [
      [70, 300],
    ],
  },

  spring: {
    warm: true,
    minV: 75,
    minS: 40,
  },

  summer: {
    cool: true,
    minV: 70,
    maxS: 45,
  },

  fall: {
    warm: true,
    maxV: 65,
    maxS: 60,
  },

  winter: {
    cool: true,
    minS: 60,
    minV: 40,
  },

  metallic: {

    gold: {
      minH: 35,
      maxH: 55,
      minS: 40,
      maxS: 80,
      minV: 40,
      maxV: 90,
    },

    silver: {
      maxS: 15,
      minV: 55,
    },

    bronze: {
      minH: 15,
      maxH: 40,
      minS: 30,
      maxS: 70,
      minV: 20,
      maxV: 60,
    },
  },
}