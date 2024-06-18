import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const getAllReview = createAsyncThunk('review/getAllReview', async (productId, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const res = await axiosPrivate.get(`/review-all/${productId}`);
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const getReview = createAsyncThunk('review/getReview', async ({productId, filters}, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const query = new URLSearchParams(filters).toString();
        const res = await axiosPrivate.get(`/review/${productId}?${query}`);
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
        allReviewItems: [],
        allReviewStatus: 'idle',
        allReviewError: null,
        reviewItems: [],
        reviewStatus: 'idle',
        reviewError: null,
        totalItems: 0,
        totalPages: 0,
        currentPage: 1,
    },
    reducers: {
        resetReviewState(state) {
            state.allReviewItems = [];
            state.allReviewStatus = 'idle';
            state.allReviewError = null;
            state.reviewItems = [];
            state.reviewStatus = 'idle';
            state.reviewError = null;
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
            .addCase(getAllReview.pending, (state) => {
                state.allReviewStatus = 'loading';
            })
            .addCase(getAllReview.fulfilled, (state, action) => {
                state.allReviewStatus = 'succeeded';
                state.allReviewItems = action.payload;
            })
            .addCase(getAllReview.rejected, (state, action) => {
                state.allReviewStatus = 'failed';
                state.allReviewError = action.payload || action.error.message;
            })
            .addCase(getReview.pending, (state) => {
                state.reviewStatus = 'loading';
            })
            .addCase(getReview.fulfilled, (state, action) => {
                state.reviewStatus = 'succeeded';
                state.reviewItems = action.payload.data; 
                state.totalItems = action.payload.totalItems;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
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
            });
    },
});

export const { resetReviewState, setCurrentPage } = reviewSlice.actions;
export default reviewSlice.reducer;
