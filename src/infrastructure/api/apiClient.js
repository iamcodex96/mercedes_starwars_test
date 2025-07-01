import axios from 'axios'
import { STAR_WARS_CONFIG } from "@/shared/constants/starwars.const.js";

const apiClient = axios.create({
    baseURL: STAR_WARS_CONFIG.BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000
})

apiClient.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error)
        return Promise.reject(error)
    }
)

export default apiClient
