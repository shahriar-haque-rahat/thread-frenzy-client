import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from '../constent/constent';


export const allData = createAsyncThunk('data/fetchData', async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${BASE_URL}/t-shirt`);
        return res.data;
    }
    catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

// Data slice
const dataSlice = createSlice({
    name: 'data',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(allData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(allData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(allData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            });
    },
});

export default dataSlice.reducer;
