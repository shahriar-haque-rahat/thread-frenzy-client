import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const getMessages = createAsyncThunk('messages/getMessages', async (_, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const res = await axiosPrivate.get(`/contact-us`);
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
    reducers: {
        resetMessageState(state) {
            state.messages = [];
            state.messagesStatus = 'idle';
            state.messagesError = null;
        }
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

export const { resetMessageState } = messageSlice.actions;
export default messageSlice.reducer;