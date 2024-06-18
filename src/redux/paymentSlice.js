import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const getPayment = createAsyncThunk('payment/getPayment', async (filters, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const query = new URLSearchParams(filters).toString();
        const res = await axiosPrivate.get(`/payment?${query}`);
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const getUserSpecificPayment = createAsyncThunk('payment/getUserSpecificPayment', async (email, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const res = await axiosPrivate.get(`/payment/${email}`);
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const updatePaymentItem = createAsyncThunk('payment/updatePaymentItem', async ({ id, status }, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const res = await axiosPrivate.put(`/payment/${id}`, { status });
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const addPayment = createAsyncThunk('payment/addPayment', async (paymentInfo, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const res = await axiosPrivate.post('/payment', paymentInfo);
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

// Payment slice
const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        payment: [],
        userSpecificPayment: [],
        paymentStatus: 'idle',
        paymentError: null,
        totalItems: 0,
        totalPages: 0,
        currentPage: 1,
    },
    reducers: {
        resetPaymentState(state) {
            state.payment = [];
            state.userSpecificPayment = [];
            state.paymentStatus = 'idle';
            state.paymentError = null;
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
            .addCase(getPayment.pending, (state) => {
                state.paymentStatus = 'loading';
            })
            .addCase(getPayment.fulfilled, (state, action) => {
                state.paymentStatus = 'succeeded';
                state.payment = action.payload.data;
                state.totalItems = action.payload.totalItems;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
            })
            .addCase(getPayment.rejected, (state, action) => {
                state.paymentStatus = 'failed';
                state.paymentError = action.payload || action.error.message;
            })
            .addCase(getUserSpecificPayment.pending, (state) => {
                state.paymentStatus = 'loading';
            })
            .addCase(getUserSpecificPayment.fulfilled, (state, action) => {
                state.paymentStatus = 'succeeded';
                state.userSpecificPayment = action.payload;
            })
            .addCase(getUserSpecificPayment.rejected, (state, action) => {
                state.paymentStatus = 'failed';
                state.paymentError = action.payload || action.error.message;
            })
            .addCase(addPayment.pending, (state) => {
                state.paymentStatus = 'loading';
            })
            .addCase(addPayment.fulfilled, (state, action) => {
                state.paymentStatus = 'succeeded';
                state.payment.push(action.payload);
            })
            .addCase(addPayment.rejected, (state, action) => {
                state.paymentStatus = 'failed';
                state.paymentError = action.payload || action.error.message;
            });
    }
});

export const { resetPaymentState, setCurrentPage } = paymentSlice.actions;
export default paymentSlice.reducer;
