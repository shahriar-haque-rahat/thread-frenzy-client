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
        menCollections: [],
        womenCollections: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        filterMenCollections: (state) => {
            state.menCollections = state.data?.filter(item => item.gender === 'Male');
        },
        filterWomenCollections: (state) => {
            state.womenCollections = state.data?.filter(item => item.gender === 'Female');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(allData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(allData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                state.menCollections = action.payload.filter(item => item.gender === 'Male');
                state.womenCollections = action.payload.filter(item => item.gender === 'Female');
            })
            .addCase(allData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            });
    },
});

export const { filterMenCollections, filterWomenCollections } = dataSlice.actions;

export default dataSlice.reducer;
