import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosPrivate from "../hooks/useAxiosPrivate";


export const getAllTshirtData = createAsyncThunk('data/getAllTshirtData', async (_, { rejectWithValue }) => {
    const axiosPublic = useAxiosPublic();
    try {
        const res = await axiosPublic.get(`/t-shirt-all`);
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

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

export const similarProduct = createAsyncThunk('data/similarProduct', async (brand, { rejectWithValue }) => {
    const axiosPublic = useAxiosPublic();
    try {
        const res = await axiosPublic.get(`/t-shirt/similar-products/${brand}`);
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
        const res = await axiosPrivate.get(`/t-shirt/single-product/${itemId}`);
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
        const res = await axiosPublic.get(`/t-shirt/Male?${query}`);
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
        const res = await axiosPublic.get(`/t-shirt/Female?${query}`);
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
        allTshirtData: [],
        allTshirtDataStatus: 'idle',
        data: [],
        allDataStatus: 'idle',
        similarProducts: [],
        similarProductsStatus: 'idle',
        selectedItem: null,
        menCollections: [],
        menDataStatus: 'idle',
        womenCollections: [],
        womenDataStatus: 'idle',
        singleProductStatus: 'idle',
        error: null,
        totalItems: 0,
        totalPages: 0,
        currentPage: 1,
        menTotalItems: 0,
        menTotalPages: 0,
        menCurrentPage: 1,
        womenTotalItems: 0,
        womenTotalPages: 0,
        womenCurrentPage: 1,
        filters: {},
    },
    reducers: {
        setSelectedItem: (state, action) => {
            state.selectedItem = action.payload;
        },
        resetDataState(state) {
            state.allTshirtData = [];
            state.allTshirtDataStatus = 'idle';
            state.data = [];
            state.allDataStatus = 'idle';
            state.similarProducts = [];
            state.similarProductsStatus = 'idle';
            state.selectedItem = null;
            state.menCollections = [];
            state.menDataStatus = 'idle';
            state.womenCollections = [];
            state.womenDataStatus = 'idle';
            state.singleProductStatus = 'idle';
            state.error = null;
            state.totalItems = 0;
            state.totalPages = 0;
            state.currentPage = 1;
            state.menTotalItems = 0;
            state.menTotalPages = 0;
            state.menCurrentPage = 1;
            state.womenTotalItems = 0;
            state.womenTotalPages = 0;
            state.womenCurrentPage = 1;
            state.filters = {};
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setMenCurrentPage(state, action) {
            state.menCurrentPage = action.payload;
        },
        setWomenCurrentPage(state, action) {
            state.womenCurrentPage = action.payload;
        },
        setFilters(state, action) {
            state.filters = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTshirtData.pending, (state) => {
                state.allTshirtDataStatus = 'loading';
            })
            .addCase(getAllTshirtData.fulfilled, (state, action) => {
                state.allTshirtDataStatus = 'succeeded';
                state.allTshirtData = action.payload.data;
            })
            .addCase(getAllTshirtData.rejected, (state, action) => {
                state.allTshirtDataStatus = 'failed';
                state.error = action.payload || action.error.message;
            })
            .addCase(allData.pending, (state) => {
                state.allDataStatus = 'loading';
            })
            .addCase(allData.fulfilled, (state, action) => {
                state.allDataStatus = 'succeeded';
                state.data = action.payload.data;
                state.totalItems = action.payload.totalItems;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
            })
            .addCase(allData.rejected, (state, action) => {
                state.allDataStatus = 'failed';
                state.error = action.payload || action.error.message;
            })
            .addCase(similarProduct.pending, (state) => {
                state.similarProductsStatus = 'loading';
            })
            .addCase(similarProduct.fulfilled, (state, action) => {
                state.similarProductsStatus = 'succeeded';
                state.similarProducts = action.payload;
            })
            .addCase(similarProduct.rejected, (state, action) => {
                state.similarProductsStatus = 'failed';
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
                state.menTotalItems = action.payload.totalItems;
                state.menTotalPages = action.payload.totalPages;
                state.menCurrentPage = action.payload.currentPage;
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
                state.womenTotalItems = action.payload.totalItems;
                state.womenTotalPages = action.payload.totalPages;
                state.womenCurrentPage = action.payload.currentPage;
            })
            .addCase(fetchWomenCollections.rejected, (state, action) => {
                state.womenDataStatus = 'failed';
                state.error = action.payload || action.error.message;
            })
    },
});

export const { setSelectedItem, resetDataState, setCurrentPage, setMenCurrentPage, setWomenCurrentPage, setFilters } = dataSlice.actions;

export default dataSlice.reducer;

