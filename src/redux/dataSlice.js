import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosPrivate from "../hooks/useAxiosPrivate";


export const allData = createAsyncThunk('data/allData', async (filters, { rejectWithValue }) => {
    const axiosPublic = useAxiosPublic();
    try {
        const query = new URLSearchParams(filters).toString();
        const res = await axiosPublic.get(`/t-shirt?${query}`);
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const getItemById = createAsyncThunk('data/getItemById', async (itemId, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const res = await axiosPrivate.get(`/t-shirt/${itemId}`);
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

export const deleteItem = createAsyncThunk('data/deleteItem', async (itemId, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const res = await axiosPrivate.delete(`/t-shirt/${itemId}`);
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
        selectedItem: null,
        menCollections: [],
        womenCollections: [],
        allDataStatus: 'idle',
        singleProductStatus: 'idle',
        error: null,
    },
    reducers: {
        setSelectedItem: (state, action) => {
            state.selectedItem = action.payload;
        },
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
                state.allDataStatus = 'loading';
            })
            .addCase(allData.fulfilled, (state, action) => {
                state.allDataStatus = 'succeeded';
                state.data = action.payload;
                state.menCollections = action.payload.filter(item => item.gender === 'Male');
                state.womenCollections = action.payload.filter(item => item.gender === 'Female');
            })
            .addCase(allData.rejected, (state, action) => {
                state.allDataStatus = 'failed';
                state.error = action.payload || action.error.message;
            })
            .addCase(getItemById.pending, (state) => {
                state.singleProductStatus = 'loading';
            })
            .addCase(getItemById.fulfilled, (state, action) => {
                state.singleProductStatus = 'succeeded';
                state.selectedItem = action.payload;
            })
            .addCase(getItemById.rejected, (state, action) => {
                state.singleProductStatus = 'failed';
                state.error = action.payload || action.error.message;
            });
    },
});

export const { setSelectedItem, filterMenCollections, filterWomenCollections } = dataSlice.actions;

export default dataSlice.reducer;
