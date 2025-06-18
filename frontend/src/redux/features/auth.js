import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    user: [],
    loading: false,
    error: null
}

export const getAuthUser = createAsyncThunk("auth", async () => {
    try {
        const { data } = await axios.get("http://localhost:8000/api/auth/user")
        return data;
    } catch (error) {
        return error
    }
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
        [getAuthUser.pending]: (state) => {
            state.loading = true
        },
        [getAuthUser.fulfilled]: (state, action) => {
            state.user = action.payload
        },
        [getAuthUser.rejected]: (state, action) => {
            state.error = action.payload
        }
    }
})

export default authSlice.reducer;