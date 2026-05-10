import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5045',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
      return Promise.reject(error)
    }

    // Extrai mensagem legível do body de erro do backend
    const data = error.response?.data
    if (data) {
      const message =
        (Array.isArray(data.errors) && data.errors.length > 0 ? data.errors[0] : null) ??
        data.message ??
        null
      if (message) {
        return Promise.reject(new Error(message))
      }
    }

    return Promise.reject(error)
  }
)

export default api
