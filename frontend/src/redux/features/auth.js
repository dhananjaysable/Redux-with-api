import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authAPI } from '../../api/authAPI'

const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    message: null
}

export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const data = await authAPI.register(userData)
            return data
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Registration failed'
            return rejectWithValue(message)
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const data = await authAPI.login(credentials)
            return data
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Login failed'
            return rejectWithValue(message)
        }
    }
)

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const data = await authAPI.logout()
            return data
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Logout failed'
            return rejectWithValue(message)
        }
    }
)

export const getAuthUser = createAsyncThunk(
    'auth/getAuthUser',
    async (_, { rejectWithValue }) => {
        try {
            const data = await authAPI.getAuthUser()
            return data
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Failed to get user'
            return rejectWithValue(message)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        },
        clearMessage: (state) => {
            state.message = null
        },
        resetAuth: (state) => {
            state.user = null
            state.isAuthenticated = false
            state.error = null
            state.message = null
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
                state.error = null
                state.message = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.message = action.payload.message
                state.error = null
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
                state.message = null
            })

            // Login
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
                state.error = null
                state.message = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isAuthenticated = true
                state.message = action.payload.message
                state.error = null
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
                state.isAuthenticated = false
                state.message = null
            })

            // Logout
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = null
                state.isAuthenticated = false
                state.message = action.payload.message
                state.error = null
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })

            // Get auth user
            .addCase(getAuthUser.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(getAuthUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload.user
                state.isAuthenticated = true
                state.error = null
            })
            .addCase(getAuthUser.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
                state.isAuthenticated = false
                state.user = null
            })
    }
})

export const { clearError, clearMessage, resetAuth, setLoading } = authSlice.actions
export default authSlice.reducer
