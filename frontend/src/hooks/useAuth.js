import { useSelector, useDispatch } from 'react-redux'
import {
    registerUser,
    loginUser,
    logoutUser,
    getAuthUser,
    clearError,
    clearMessage,
    resetAuth,
    setLoading
} from '../redux/features/auth'


export const useAuth = () => {
    const dispatch = useDispatch()
    const { user, isAuthenticated, isLoading, error, message } = useSelector(
        (state) => state.auth
    )

    const register = async (userData) => {
        try {
            const result = await dispatch(registerUser(userData))
            return result
        } catch (error) {
            console.error('Register error:', error)
            throw error
        }
    }

    const login = async (credentials) => {
        try {
            const result = await dispatch(loginUser(credentials))
            return result
        } catch (error) {
            console.error('Login error:', error)
            throw error
        }
    }

    const logout = async () => {
        try {
            const result = await dispatch(logoutUser())
            return result
        } catch (error) {
            console.error('Logout error:', error)
            throw error
        }
    }

    const checkAuth = async () => {
        try {
            const result = await dispatch(getAuthUser())
            return result
        } catch (error) {
            console.error('Check auth error:', error)
            throw error
        }
    }

    const clearAuthError = () => {
        dispatch(clearError())
    }

    const clearAuthMessage = () => {
        dispatch(clearMessage())
    }

    const resetAuthState = () => {
        dispatch(resetAuth())
    }

    const setAuthLoading = (loading) => {
        dispatch(setLoading(loading))
    }

    return {
        user,
        isAuthenticated,
        isLoading,
        error,
        message,
        register,
        login,
        logout,
        checkAuth,
        clearAuthError,
        clearAuthMessage,
        resetAuthState,
        setAuthLoading
    }
}
