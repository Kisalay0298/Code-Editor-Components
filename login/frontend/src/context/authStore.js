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
    message: null,

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

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try{
            const response = await axios.post(`${BACKEND_PORT_URL}/login`, {email, password})
            set({
                user: response.data.user,
                isAuthenticated: true,
                isLoading: false,
                error: null
            })
        } catch(error){
            set({error: error.response?.data?.message || "Error logging in", isLoading: false})
            throw error;
        }
    },

    logout: async () => {
        set({ isLoading: true, error: null });
        try {

            await axios.post(`${BACKEND_PORT_URL}/logout`)
            set({ user: null, isAuthenticated: false, isLoading: false, error: null });
            
        } catch (error) {
            
            set({ user: null, isAuthenticated: false, isLoading: false, error: null });
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
        // await new Promise((resolve) => setTimeout(resolve, 5000))
        set({ isCheckingAuth: true, error: null })
        try {

            const response = await axios.get(`${BACKEND_PORT_URL}/check-auth`)
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false})
            
        } catch (error) {

            console.log("Error: ", error)
            set({ error: null, isCheckingAuth: false, isAuthenticated: false })
            
        }
    },

    forgotPassword: async (email) => {
        set({ isLoading: true, error: null, message: null })
        try {

            const response = await axios.post(`${BACKEND_PORT_URL}/forgot-password`, { email })
            set({ message: response.data.message, isLoading: false})
            
        } catch (error) {

            set({ isLoading: false, error: error.response.data.message || 'Error sending reset password to your email' });
            throw error;
            
        }
    },

    resetPassword: async (password, token) => {
        set({ isLoading: true, error: null })
        try {

            const response = await axios.post(`${BACKEND_PORT_URL}/reset-password/${token}`, { password})
            set({ isLoading: false, message: response.data.message })
            
        } catch (error) {

            set({ isLoading: false, error: error.response.data.message || 'Error resetting password' })
            throw error;
            
        }
    }
}))