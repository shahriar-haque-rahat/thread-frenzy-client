import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const getMessages = createAsyncThunk('messages/getMessages', async (_, { rejectWithValue }) => {
    const axiosPublic = useAxiosPublic();
    try {
        const res = await axiosPublic.get(`/contact-us`);
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const addMessages = createAsyncThunk('messages/addMessages', async (message, { rejectWithValue }) => {
    const axiosPublic = useAxiosPublic();
    try {
        const res = await axiosPublic.post('/contact-us', message);
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


const messageSlice = createSlice({
    name: 'message',
    initialState: {
        messages: [],
        messagesStatus: 'idle',
        messagesError: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMessages.pending, (state) => {
                state.messagesStatus = 'loading';
            })
            .addCase(getMessages.fulfilled, (state, action) => {
                state.messagesStatus = 'succeeded';
                state.messages = action.payload;
            })
            .addCase(getMessages.rejected, (state, action) => {
                state.messagesStatus = 'failed';
                state.messagesError = action.payload || action.error.message;
            })
    }
})

export default messageSlice.reducer;