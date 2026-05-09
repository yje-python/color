import api from './api'

export const likeColor = async (
  user: number,
  hex_code: string,
) => {

  const response = await api.post(
    '/palettes/like/',
    {
      user,
      hex_code,
    }
  )

  return response.data
}

export const getLikedColors = async () => {

  const response = await api.get(
    '/palettes/liked/'
  )

  return response.data
}

export const unlikeColor = async (
  user: number,
  hex_code: string,
) => {

  const response = await api.delete(
    '/palettes/unlike/',
    {
      data: {
        user,
        hex_code,
      }
    }
  )

  return response.data
}

export const savePalette = async (
  user: number,
  colors: string[],
) => {

  const response = await api.post(
    '/palettes/save/',
    {
      user,
      title: 'palette',
      colors,
    }
  )

  return response.data
}

export const getSavedPalettes = async () => {

  const response = await api.get(
    '/palettes/saved/'
  )

  return response.data
}

export const deletePalette = async (
  user: number,
  colors: string[],
) => {

  const response = await api.delete(
    '/palettes/delete/',
    {
      data: {
        user,
        colors,
      }
    }
  )

  return response.data
}