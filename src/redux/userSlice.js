import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useAxiosPublic from "../hooks/useAxiosPublic";
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

export const getBannedUsers = createAsyncThunk('user/getBannedUsers', async (_, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const res = await axiosPrivate.get(`/user/banned`);
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const getUserByEmail = createAsyncThunk('user/getUserByEmail', async (userEmail, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const res = await axiosPrivate.get(`/user/${userEmail}`);
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
    const axiosPublic = useAxiosPublic();
    try {
        const res = await axiosPublic.post(`/user`, userInfo);
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
        const res = await axiosPrivate.patch(`/user/${id}`, userInfo);
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
        userByEmail: {},
        userByEmailStatus: 'idle',
        userByEmailError: null,
        bannedUsers: [],
        bannedUsersStatus: 'idle',
        bannedUsersError: null,
    },
    reducers: {
        resetUserState(state) {
            state.user = [];
            state.userByEmail = {};
            state.userStatus = 'idle';
            state.userByEmailStatus = 'idle';
            state.userError = null;
            state.userByEmailError = null;
            state.bannedUsers = [];
            state.bannedUsersStatus = 'idle';
            state.bannedUsersError = null;
        }
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
            .addCase(getUserByEmail.pending, (state) => {
                state.userByEmailStatus = 'loading';
            })
            .addCase(getUserByEmail.fulfilled, (state, action) => {
                state.userByEmailStatus = 'succeeded';
                state.userByEmail = action.payload;
            })
            .addCase(getUserByEmail.rejected, (state, action) => {
                state.userByEmailStatus = 'failed';
                state.userByEmailError = action.payload || action.error.message;
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
            .addCase(updateUser.fulfilled, (state, action) => {
                state.userStatus = 'succeeded';
                const updatedUserIndex = state.user.findIndex(user => user._id === action.payload._id);
                if (updatedUserIndex !== -1) {
                    state.user[updatedUserIndex] = action.payload;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.userStatus = 'failed';
                state.userError = action.payload || action.error.message;
            })
            .addCase(getBannedUsers.pending, (state) => {
                state.bannedUsersStatus = 'loading';
            })
            .addCase(getBannedUsers.fulfilled, (state, action) => {
                state.bannedUsersStatus = 'succeeded';
                state.bannedUsers = action.payload;
            })
            .addCase(getBannedUsers.rejected, (state, action) => {
                state.bannedUsersStatus = 'failed';
                state.bannedUsersError = action.payload || action.error.message;
            })
    }
})

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;