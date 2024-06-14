import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosPrivate from "../hooks/useAxiosPrivate";


export const getAllCart = createAsyncThunk('cart/getAllCart', async (_, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const res = await axiosPrivate.get(`/cart`);
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const getCart = createAsyncThunk('cart/getCart', async (userEmail, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const res = await axiosPrivate.get(`/cart/${userEmail}`);
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
    const axiosPrivate = useAxiosPrivate();
    try {
        const res = await axiosPrivate.post(`/cart`, cartItem);
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const updateCartItem = createAsyncThunk('cart/updateCartItem', async ({ id, quantity }, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const res = await axiosPrivate.put(`/cart/${id}`, { quantity });
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const deleteCartItem = createAsyncThunk('cart/deleteCartItem', async (id, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const res = await axiosPrivate.delete(`/cart/${id}`);
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const deleteManyCartItem = createAsyncThunk('cart/deleteManyCartItem', async (ids, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const res = await axiosPrivate.delete('/cart', { data: { ids } });
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
        allCartItems: [],
        allCartStatus: 'idle',
        allCartError: null,
        cartItems: [],
        cartStatus: 'idle',
        cartError: null,
    },
    reducers: {
        resetCartState(state) {
            state.allCartItems = [];
            state.allCartStatus = 'idle';
            state.allCartError = null;
            state.cartItems = [];
            state.cartStatus = 'idle';
            state.cartError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCart.pending, (state) => {
                state.allCartStatus = 'loading';
            })
            .addCase(getAllCart.fulfilled, (state, action) => {
                state.allCartStatus = 'succeeded';
                state.allCartItems = action.payload;
            })
            .addCase(getAllCart.rejected, (state, action) => {
                state.allCartStatus = 'failed';
                state.allCartError = action.payload || action.error.message;
            })
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
            })
    },
});


export const { resetCartState } = cartSlice.actions;
export default cartSlice.reducer;
