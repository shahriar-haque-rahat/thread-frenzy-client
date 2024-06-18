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

export const addItem = createAsyncThunk('data/addItem', async (item, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const res = await axiosPrivate.post('/t-shirt', item);
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

export const updateItem = createAsyncThunk('product/updateProduct', async ({ id, updatedProduct }, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const res = await axiosPrivate.put(`/t-shirt/${id}`, updatedProduct);
        return res.data;
    } catch (error) {
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

export const fetchMenCollections = createAsyncThunk('data/fetchMenCollections', async (filters, { rejectWithValue }) => {
    const axiosPublic = useAxiosPublic();
    try {
        const query = new URLSearchParams(filters).toString();
        const res = await axiosPublic.get(`/t-shirt/men?${query}`);
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const fetchWomenCollections = createAsyncThunk('data/fetchWomenCollections', async (filters, { rejectWithValue }) => {
    const axiosPublic = useAxiosPublic();
    try {
        const query = new URLSearchParams(filters).toString();
        const res = await axiosPublic.get(`/t-shirt/women?${query}`);
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

// dataSlice.js
const dataSlice = createSlice({
    name: 'data',
    initialState: {
        data: [],
        selectedItem: null,
        menCollections: [],
        womenCollections: [],
        allDataStatus: 'idle',
        menDataStatus: 'idle',
        womenDataStatus: 'idle',
        singleProductStatus: 'idle',
        error: null,
        totalItems: 0,
        totalPages: 0,
        currentPage: 1,
        filters: {},
    },
    reducers: {
        setSelectedItem: (state, action) => {
            state.selectedItem = action.payload;
        },
        resetDataState(state) {
            state.data = [];
            state.selectedItem = null;
            state.menCollections = [];
            state.womenCollections = [];
            state.allDataStatus = 'idle';
            state.menDataStatus = 'idle';
            state.womenDataStatus = 'idle';
            state.singleProductStatus = 'idle';
            state.error = null;
            state.totalItems = 0;
            state.totalPages = 0;
            state.currentPage = 1;
            state.filters = {};
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setFilters(state, action) {
            state.filters = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(allData.pending, (state) => {
                state.allDataStatus = 'loading';
            })
            .addCase(allData.fulfilled, (state, action) => {
                state.allDataStatus = 'succeeded';
                state.data = action.payload.data;
                state.totalItems = action.payload.totalItems;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
                state.menCollections = action.payload.data.filter(item => item.gender === 'Male');
                state.womenCollections = action.payload.data.filter(item => item.gender === 'Female');
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
            })
            .addCase(fetchMenCollections.pending, (state) => {
                state.menDataStatus = 'loading';
            })
            .addCase(fetchMenCollections.fulfilled, (state, action) => {
                state.menDataStatus = 'succeeded';
                state.menCollections = action.payload.data;
                state.totalItems = action.payload.totalItems;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
            })
            .addCase(fetchMenCollections.rejected, (state, action) => {
                state.menDataStatus = 'failed';
                state.error = action.payload || action.error.message;
            })
            .addCase(fetchWomenCollections.pending, (state) => {
                state.womenDataStatus = 'loading';
            })
            .addCase(fetchWomenCollections.fulfilled, (state, action) => {
                state.womenDataStatus = 'succeeded';
                state.womenCollections = action.payload.data;
                state.totalItems = action.payload.totalItems;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
            })
            .addCase(fetchWomenCollections.rejected, (state, action) => {
                state.womenDataStatus = 'failed';
                state.error = action.payload || action.error.message;
            })
    },
});

export const { setSelectedItem, resetDataState, setCurrentPage, setFilters } = dataSlice.actions;

export default dataSlice.reducer;

