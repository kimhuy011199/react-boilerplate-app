import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userType } from './userType';
import userService, { UserInputInterface } from './userService';
import { UsersInterface } from '@/shared/models/User';

interface UserStoreInterface {
  user: UsersInterface | null;
  error: string;
  success: string;
  isLoading: boolean;
  message: string;
}

const initialState: UserStoreInterface = {
  user: null,
  error: '',
  success: '',
  isLoading: false,
  message: '',
};

// Register user
export const registerUser = createAsyncThunk(
  `user/${userType.REGISTER_USER}`,
  async (data: UserInputInterface, thunkAPI) => {
    try {
      return await userService.registerUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  `user/${userType.LOGIN_USER}`,
  async (data: UserInputInterface, thunkAPI) => {
    try {
      return await userService.loginUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Logout user
export const logout = createAsyncThunk(
  `user/${userType.LOGOUT_USER}`,
  async () => {
    userService.logout();
  }
);

// Get current user
export const getMe = createAsyncThunk(
  `user/${userType.GET_ME}`,
  async (_, thunkAPI) => {
    try {
      return await userService.getMe();
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.success = '';
      state.error = '';
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = userType.REGISTER_USER;
        state.error = '';
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = userType.REGISTER_USER;
        state.message = action.payload.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = userType.LOGIN_USER;
        state.error = '';
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = userType.LOGIN_USER;
        state.message = action.payload.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.success = userType.LOGOUT_USER;
        state.user = null;
      })
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = userType.GET_ME;
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = userType.GET_ME;
        state.message = action.payload.message;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
