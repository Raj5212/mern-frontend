import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendData, getData } from './service';

export const fetchUserData = createAsyncThunk('user/fetchUserData', async () => {
  const response = await getData();
  return response;
});

export const createUser = createAsyncThunk('user/createUser', async (userData, { dispatch }) => {
  const response = await sendData(userData);
  return response;
});


const userSlice = createSlice({
  name: 'user',
  initialState: {
    userDetails: {},
    users: [],
    otp: '',
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const { setUserDetails, setOtp, setIsAuthenticated } = userSlice.actions;

export default userSlice.reducer;
