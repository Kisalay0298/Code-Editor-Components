import { create } from 'zustand'
import axios from 'axios'


const BACKEND_PORT_URL = 'http://localhost:5000/api/auth'

axios.defaults.withCredentials = true; // everytime we make a request, it will put te

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,

    signUp: async (email, password, name) => {
        set({ isLoading: true, error: null })
        try {

            const response = await axios.post(`${BACKEND_PORT_URL}/signup`, {email, password, name})
            set({user: response.data.user, isAuthenticated: true, isLoading: false })
            
        } catch (error) {

            set({error: error.response.data.message || "Error signing up", isLoading: false})
            throw error;
            
        }
    },

    verifyEmail: async (code) => {
        set({ isLoading: true, error: null })
        try {

            const response = await axios.post(`${BACKEND_PORT_URL}/verify-email`, { code })
            set({ user: response.data.user, isAuthenticated: true, isLoading: false})
            return response.data
            
        } catch (error) {

            set({ error: error.response.data.message || "Error verifying email", isLoading: false});
            throw error;
            
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null })
        try {

            const response = await axios.get(`${BACKEND_PORT_URL}/check-auth`)
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false})
            
        } catch (error) {

            console.log("Error: ", error)
            set({ error: null, isCheckingAuth: false, isAuthenticated: false })
            
        }
    }
}))