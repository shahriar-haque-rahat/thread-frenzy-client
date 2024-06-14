import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const getWishlist = createAsyncThunk('wishlist/getWishlist', async (userId, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const res = await axiosPrivate.get(`/wishlist/${userId}`);
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

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
    },
    reducers: {
        resetWishlistState(state) {
            state.wishlistItems = [];
            state.wishlistStatus = 'idle';
            state.wishlistError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWishlist.pending, (state) => {
                state.wishlistStatus = 'loading';
            })
            .addCase(getWishlist.fulfilled, (state, action) => {
                state.wishlistStatus = 'succeeded';
                state.wishlistItems = action.payload;
            })
            .addCase(getWishlist.rejected, (state, action) => {
                state.wishlistStatus = 'failed';
                state.wishlistError = action.payload || action.error.message;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.wishlistItems.push(action.payload);
            })
            .addCase(deleteWishlistItem.fulfilled, (state, action) => {
                state.wishlistItems = state.wishlistItems.filter(item => item._id !== action.meta.arg);
            })
    },
});

export const { resetWishlistState } = wishlistSlice.actions;
export default wishlistSlice.reducer;
