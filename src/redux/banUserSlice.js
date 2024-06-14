import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const getBanUser = createAsyncThunk('banUser/getBanUser', async (_, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const res = await axiosPrivate.get(`/ban-user`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const addBanUser = createAsyncThunk('banUser/addBanUser', async (banUserInfo, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const res = await axiosPrivate.post('/ban-user', banUserInfo);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const deleteBanUser = createAsyncThunk('banUser/deleteBanUser', async (id, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const res = await axiosPrivate.delete(`/ban-user/${id}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

const banUserSlice = createSlice({
    name: 'banUser',
    initialState: {
        banUser: [],
        banUserStatus: 'idle',
        banUserError: null,
    },
    reducers: {
        resetBanUserState(state) {
            state.banUser = [];
            state.banUserStatus = 'idle';
            state.banUserError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBanUser.pending, (state) => {
                state.banUserStatus = 'loading';
            })
            .addCase(getBanUser.fulfilled, (state, action) => {
                state.banUserStatus = 'succeeded';
                state.banUser = action.payload;
            })
            .addCase(getBanUser.rejected, (state, action) => {
                state.banUserStatus = 'failed';
                state.banUserError = action.payload || action.error.message;
            })
            .addCase(addBanUser.pending, (state) => {
                state.banUserStatus = 'loading';
            })
            .addCase(addBanUser.fulfilled, (state, action) => {
                state.banUserStatus = 'succeeded';
                state.banUser.push(action.payload);
            })
            .addCase(addBanUser.rejected, (state, action) => {
                state.banUserStatus = 'failed';
                state.banUserError = action.payload || action.error.message;
            });
    }
});

export const { resetBanUserState } = banUserSlice.actions;
export default banUserSlice.reducer;
