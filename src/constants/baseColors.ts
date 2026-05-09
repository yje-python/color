export interface BaseColorRange {
  name: string
  min: number
  max: number
  minS?: number;
  minV?: number;
  filter?: (
    s: number,
    v: number
  ) => boolean
}

export const BASE_COLOR_RANGES: BaseColorRange[] = [
  {
    name: 'red',
    min: 350,
    max: 10,
    minS: 15,
  },

  {
    name: 'orange',
    min: 10,
    max: 40,
    minS: 15,
  },

  {
    name: 'yellow',
    min: 40,
    max: 65,
    minS: 15,
  },

  {
    name: 'lime',
    min: 65,
    max: 95,

    filter: (
      s: number,
      v: number
    ) => v > 50 && s > 15,
  },

  {
    name: 'green',
    min: 95,
    max: 155,
    minS: 15,
  },

  {
    name: 'teal',
    min: 155,
    max: 175,
    minS: 15,
  },

  {
    name: 'blue',
    min: 175,
    max: 225,
    minS: 15,
  },

  {
    name: 'navy',
    min: 225,
    max: 255,

    filter: (
      s: number,
      v: number
    ) => v < 60 && s > 15,
  },

  {
    name: 'purple',
    min: 255,
    max: 295,

    filter: (
      s: number,
      v: number
    ) => !(v > 80 && s < 30),
  },

  {
    name: 'pink',
    min: 295,
    max: 350,
    minS: 15,
  },
]