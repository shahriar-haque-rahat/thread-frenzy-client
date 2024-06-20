import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const getWishlist = createAsyncThunk('wishlist/getWishlist', async ({ userId, filters }, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const query = new URLSearchParams(filters).toString();
        const res = await axiosPrivate.get(`/wishlist/${userId}?${query}`);
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const getAllWishlist = createAsyncThunk('wishlist/getAllWishlist', async (userId, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const res = await axiosPrivate.get(`/wishlist-all/${userId}`);
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
}
);

export const addToWishlist = createAsyncThunk('wishlist/addToWishlist', async (wishlistItem, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const res = await axiosPrivate.post(`/wishlist`, wishlistItem);
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const deleteWishlistItem = createAsyncThunk('wishlist/deleteWishlistItem', async (id, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const res = await axiosPrivate.delete(`/wishlist/${id}`);
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        wishlistItems: [],
        wishlistStatus: 'idle',
        wishlistError: null,
        allWishlistItems: [],
        allWishlistStatus: 'idle',
        allWishlistError: null,
        totalItems: 0,
        totalPages: 0,
        currentPage: 1,
    },
    reducers: {
        resetWishlistState(state) {
            state.wishlistItems = [];
            state.wishlistStatus = 'idle';
            state.wishlistError = null;
            state.allWishlistItems = [];
            state.allWishlistStatus = 'idle';
            state.allWishlistError = null;
            state.totalItems = 0;
            state.totalPages = 0;
            state.currentPage = 1;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWishlist.pending, (state) => {
                state.wishlistStatus = 'loading';
            })
            .addCase(getWishlist.fulfilled, (state, action) => {
                console.log('API Response:', action.payload);
                state.wishlistStatus = 'succeeded';
                state.wishlistItems = action.payload.data;
                state.totalItems = action.payload.totalItems;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
            })
            .addCase(getWishlist.rejected, (state, action) => {
                state.wishlistStatus = 'failed';
                state.wishlistError = action.payload || action.error.message;
            })
            .addCase(getAllWishlist.pending, (state) => {
                state.allWishlistStatus = 'loading';
            })
            .addCase(getAllWishlist.fulfilled, (state, action) => {
                state.allWishlistStatus = 'succeeded';
                state.allWishlistItems = action.payload.data;
            })
            .addCase(getAllWishlist.rejected, (state, action) => {
                state.allWishlistStatus = 'failed';
                state.allWishlistError = action.payload || action.error.message;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.wishlistItems.push(action.payload);
            })
            .addCase(deleteWishlistItem.fulfilled, (state, action) => {
                state.wishlistItems = state.wishlistItems.filter(item => item._id !== action.meta.arg);
            });
    },
});

export const { resetWishlistState, setCurrentPage } = wishlistSlice.actions;
export default wishlistSlice.reducer;
