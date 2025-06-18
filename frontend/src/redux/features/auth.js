import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    user: null,
    isLoggedIn: false,
    loading: false,
    error: null
};
export const getAuthUser = createAsyncThunk(
    "auth/getAuthUser",
    async (_, { rejectWithValue }) => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.get("http://localhost:8000/api/auth/user");
            if (data.success) {
                return data.user;
            } else {
                return rejectWithValue(data.message || "Failed to authenticate user");
            }
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || "An error occurred"
            );
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post('http://localhost:8000/api/auth/login', { email, password }, { headers: { "Content-Type": "application/json" } });
            if (data.success) {
                return data;
            } else {
                return rejectWithValue(data.message || "Login failed");
            }
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || "An error occurred"
            );
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post('http://localhost:8000/api/auth/logout');
            if (data.success) {
                return data;
            } else {
                return rejectWithValue(data.message || "Logout failed");
            }
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || "An error occurred"
            );
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Logged in user
            .addCase(getAuthUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAuthUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isLoggedIn = true;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(getAuthUser.rejected, (state, action) => {
                state.loading = false;
                state.isLoggedIn = false;
                state.user = null;
                state.error = action.payload;
            })
            // Logout
            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.isLoggedIn = false;
                state.user = null;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //Login
            .addCase(login.pending, (state) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state) => {
                state.loading = false
                state.isLoggedIn = true
            })
            .addCase(login.rejected, (state, actions) => {
                state.loading = false
                state.isLoggedIn = false
                state.error = actions.payload
                state.user = null
            })
    }
});

export default authSlice.reducer;