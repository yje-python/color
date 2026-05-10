import axios from 'axios'

const api = axios.create({
  baseURL: 'https://color-backend-rjla.onrender.com/api',
})

export default api