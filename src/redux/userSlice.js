import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosPrivate from "../hooks/useAxiosPrivate";


export const getUser = createAsyncThunk('user/getUser', async (_, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const res = await axiosPrivate.get(`/user`);
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const addUser = createAsyncThunk('user/addUser', async (userInfo, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const res = await axiosPrivate.post(`/user`, userInfo);
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const updateUser = createAsyncThunk('user/updateUser', async ({ id, userInfo }, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const res = await axiosPrivate.put(`/user/${id}`, userInfo);
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const deleteUser = createAsyncThunk('user/deleteUser', async (id, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const res = await axiosPrivate.delete(`/user/${id}`);
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: [],
        userStatus: 'idle',
        userError: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.userStatus = 'loading';
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.userStatus = 'succeeded';
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.userStatus = 'failed';
                state.userError = action.payload || action.error.message;
            })
            .addCase(addUser.pending, (state) => {
                state.userStatus = 'loading';
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.userStatus = 'succeeded';
                state.user.push(action.payload);
            })
            .addCase(addUser.rejected, (state, action) => {
                state.userStatus = 'failed';
                state.userError = action.payload || action.error.message;
            })
    }
})

export default userSlice.reducer;