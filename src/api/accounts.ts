import api from './api'

export const signup = async (
  username: string,
  password: string,
) => {

  const response = await api.post(
    '/accounts/signup/',
    {
      username,
      password,
    }
  )

  return response.data
}


export const login = async (
  username: string,
  password: string,
) => {

  const response = await api.post(
    '/accounts/login/',
    {
      username,
      password,
    }
  )

  return response.data
}