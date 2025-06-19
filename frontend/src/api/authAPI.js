import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:8000/api/auth',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})
API.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

API.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response?.status === 401) {
            console.log('Unauthorized access')
        }
        return Promise.reject(error)
    }
)

export const authAPI = {
    register: async (userData) => {
        const response = await API.post('/register', userData)
        return response.data
    },

    login: async (credentials) => {
        const response = await API.post('/login', credentials)
        return response.data
    },

    logout: async () => {
        const response = await API.post('/logout')
        return response.data
    },

    getAuthUser: async () => {
        const response = await API.get('/user')
        return response.data
    }
}