import { api } from './api'

export const registerUser = (details) => api('/auth/register', {
  method: 'POST',
  body: JSON.stringify(details),
})

export const loginUser = (details) => api('/auth/login', {
  method: 'POST',
  body: JSON.stringify(details),
})

export const getCurrentUser = (token) => api('/auth/me', { token })
