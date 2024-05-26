import axios from "axios";
import { BASE_URL } from "../constent/constent";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCart = createAsyncThunk('cart/getCart', async (userEmail, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${BASE_URL}/cart/${userEmail}`);console.log(`${BASE_URL}/cart/${userEmail}`);
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const addToCart = createAsyncThunk('cart/addToCart', async (cartItem, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${BASE_URL}/cart`, cartItem);
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        cartStatus: 'idle',
        cartError: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCart.pending, (state) => {
                state.cartStatus = 'loading';
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.cartStatus = 'succeeded';
                state.cartItems = action.payload;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.cartStatus = 'failed';
                state.cartError = action.payload || action.error.message;
            })
            .addCase(addToCart.pending, (state) => {
                state.cartStatus = 'loading';
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.cartStatus = 'succeeded';
                state.cartItems.push(action.payload);
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.cartStatus = 'failed';
                state.cartError = action.payload || action.error.message;
            });
    },
});

export default cartSlice.reducer;
