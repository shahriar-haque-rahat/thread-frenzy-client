import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const getReview = createAsyncThunk('review/getReview', async (productId, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const res = await axiosPrivate.get(`/review/${productId}`);
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const addReview = createAsyncThunk('review/addReview', async (review, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const res = await axiosPrivate.post(`/review`, review);
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const updateReview = createAsyncThunk('review/updateReview', async ({ id, message, rating }, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const res = await axiosPrivate.put(`/review/${id}`, { message, rating });
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const deleteReview = createAsyncThunk('review/deleteReview', async (id, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const res = await axiosPrivate.delete(`/review/${id}`);
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

const reviewSlice = createSlice({
    name: 'review',
    initialState: {
        reviewItems: [],
        reviewStatus: 'idle',
        reviewError: null,
    },
    reducers: {
        resetReviewState(state) {
            state.reviewItems = [];
            state.reviewStatus = 'idle';
            state.reviewError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getReview.pending, (state) => {
                state.reviewStatus = 'loading';
            })
            .addCase(getReview.fulfilled, (state, action) => {
                state.reviewStatus = 'succeeded';
                state.reviewItems = action.payload;
            })
            .addCase(getReview.rejected, (state, action) => {
                state.reviewStatus = 'failed';
                state.reviewError = action.payload || action.error.message;
            })
            .addCase(addReview.pending, (state) => {
                state.reviewStatus = 'loading';
            })
            .addCase(addReview.fulfilled, (state, action) => {
                state.reviewStatus = 'succeeded';
                state.reviewItems.push(action.payload);
            })
            .addCase(addReview.rejected, (state, action) => {
                state.reviewStatus = 'failed';
                state.reviewError = action.payload || action.error.message;
            })
            .addCase(updateReview.pending, (state) => {
                state.reviewStatus = 'loading';
            })
            .addCase(updateReview.fulfilled, (state, action) => {
                state.reviewStatus = 'succeeded';
                const index = state.reviewItems.findIndex(review => review.id === action.payload.id);
                if (index !== -1) {
                    state.reviewItems[index] = action.payload;
                }
            })
            .addCase(updateReview.rejected, (state, action) => {
                state.reviewStatus = 'failed';
                state.reviewError = action.payload || action.error.message;
            })
    },
});

export const { resetReviewState } = reviewSlice.actions;
export default reviewSlice.reducer;
