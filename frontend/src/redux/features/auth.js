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
    extraReducers: (builder) => {
        builder.addCase(getAuthUser.pending, (state) => {
            state.loading = true;
        })
            .addCase(getAuthUser.fulfilled, (state, actions) => {
                state.loading = false
                state.user = actions.payload
            }).addCase(getAuthUser.rejected, (state, actions) => {
                state.loading = false
                state.error = actions.payload
            })
    }
})

export default authSlice.reducer;