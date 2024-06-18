import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosPrivate from "../hooks/useAxiosPrivate";


export const getAllUser = createAsyncThunk('user/getAllUser', async (_, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const res = await axiosPrivate.get(`/user-all`);
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

const fetchWithFilters = async (axios, url, filters) => {
    const query = new URLSearchParams(filters).toString();
    const res = await axios.get(`${url}?${query}`);
    return res.data;
};

export const getUser = createAsyncThunk('user/getUser', async (filters, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        return await fetchWithFilters(axiosPrivate, '/user', filters);
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const getAdmin = createAsyncThunk('user/getAdmin', async (filters, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        return await fetchWithFilters(axiosPrivate, '/user/admin', filters);
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const getBannedUsers = createAsyncThunk('user/getBannedUsers', async (filters, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        return await fetchWithFilters(axiosPrivate, '/user/banned', filters);
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const getUserByEmail = createAsyncThunk('user/getUserByEmail', async (userEmail, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const res = await axiosPrivate.get(`/user/${userEmail}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const addUser = createAsyncThunk('user/addUser', async (userInfo, { rejectWithValue }) => {
    const axiosPublic = useAxiosPublic();
    try {
        const res = await axiosPublic.post(`/user`, userInfo);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const updateUser = createAsyncThunk('user/updateUser', async ({ id, userInfo }, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const res = await axiosPrivate.patch(`/user/${id}`, userInfo);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const deleteUser = createAsyncThunk('user/deleteUser', async (id, { rejectWithValue }) => {
    const axiosPrivate = useAxiosPrivate();
    try {
        const res = await axiosPrivate.delete(`/user/${id}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        allUser: [],
        allUserStatus: 'idle',
        allUserError: null,
        user: [],
        userStatus: 'idle',
        userError: null,
        admin: [],
        adminStatus: 'idle',
        adminError: null,
        userByEmail: {},
        userByEmailStatus: 'idle',
        userByEmailError: null,
        bannedUsers: [],
        bannedUsersStatus: 'idle',
        bannedUsersError: null,
        totalItems: 0,
        totalPages: 0,
        currentPage: 1,
        totalAdminItems: 0,
        totalAdminPages: 0,
        currentAdminPage: 1,
        totalBannedItems: 0,
        totalBannedPages: 0,
        currentBannedPage: 1,
    },
    reducers: {
        resetUserState(state) {
            state.allUser = [];
            state.allUserStatus = 'idle';
            state.allUserError = null;
            state.user = [];
            state.userStatus = 'idle';
            state.userError = null;
            state.admin = [];
            state.adminStatus = 'idle';
            state.adminError = null;
            state.userByEmail = {};
            state.userByEmailStatus = 'idle';
            state.userByEmailError = null;
            state.bannedUsers = [];
            state.bannedUsersStatus = 'idle';
            state.bannedUsersError = null;
            state.totalItems = 0;
            state.totalPages = 0;
            state.currentPage = 1;
            state.totalAdminItems = 0;
            state.totalAdminPages = 0;
            state.currentAdminPage = 1;
            state.totalBannedItems = 0;
            state.totalBannedPages = 0;
            state.currentBannedPage = 1;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setCurrentAdminPage(state, action) {
            state.currentAdminPage = action.payload;
        },
        setCurrentBannedPage(state, action) {
            state.currentBannedPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUser.pending, (state) => {
                state.allUserStatus = 'loading';
            })
            .addCase(getAllUser.fulfilled, (state, action) => {
                state.allUserStatus = 'succeeded';
                state.allUser = action.payload;
            })
            .addCase(getAllUser.rejected, (state, action) => {
                state.allUserStatus = 'failed';
                state.allUserError = action.payload || action.error.message;
            })
            .addCase(getUser.pending, (state) => {
                state.userStatus = 'loading';
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.userStatus = 'succeeded';
                state.user = action.payload.data;
                state.totalItems = action.payload.totalItems;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.userStatus = 'failed';
                state.userError = action.payload || action.error.message;
            })
            .addCase(getAdmin.pending, (state) => {
                state.adminStatus = 'loading';
            })
            .addCase(getAdmin.fulfilled, (state, action) => {
                state.adminStatus = 'succeeded';
                state.admin = action.payload.data;
                state.totalAdminItems = action.payload.totalItems;
                state.totalAdminPages = action.payload.totalPages;
                state.currentAdminPage = action.payload.currentPage;
            })
            .addCase(getAdmin.rejected, (state, action) => {
                state.adminStatus = 'failed';
                state.adminError = action.payload || action.error.message;
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
            .addCase(getBannedUsers.pending, (state) => {
                state.bannedUsersStatus = 'loading';
            })
            .addCase(getBannedUsers.fulfilled, (state, action) => {
                state.bannedUsersStatus = 'succeeded';
                state.bannedUsers = action.payload.data;
                state.totalBannedItems = action.payload.totalItems;
                state.totalBannedPages = action.payload.totalPages;
                state.currentBannedPage = action.payload.currentPage;
            })
            .addCase(getBannedUsers.rejected, (state, action) => {
                state.bannedUsersStatus = 'failed';
                state.bannedUsersError = action.payload || action.error.message;
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
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.userStatus = 'succeeded';
                state.user = state.user.filter(user => user._id !== action.payload._id);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.userStatus = 'failed';
                state.userError = action.payload || action.error.message;
            });
    },
});

export const { resetUserState, setCurrentPage, setCurrentAdminPage, setCurrentBannedPage } = userSlice.actions;

export default userSlice.reducer;
