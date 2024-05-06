import { ApiService } from '@/shared/services/api.service';
import authStorageService from '@/shared/services/authStorage.service';

const endpoint = 'auth';
const apiService = new ApiService();

export interface UserInputInterface {
  email: string;
  password: string;
}

// Register user
const registerUser = async (input: UserInputInterface) => {
  const data = await apiService.post(`${endpoint}/register`, input);
  const { accessToken } = data;
  authStorageService().setToken(accessToken);
  return data.user;
};

// Login user
const loginUser = async (input: UserInputInterface) => {
  // const data = await apiService.post(`${endpoint}/login`, input);
  // const { accessToken } = data;
  // authStorageService().setToken(accessToken);
  // return data;
  return {
    user: {
      id: '123',
      email: input.email,
    },
  };
};

// Logout user
const logout = () => {
  authStorageService().removeToken();
};

// Get user me
const getMe = async () => {
  const data = await apiService.get(`${endpoint}/me`);
  return data.user;
};

const userService = {
  registerUser,
  loginUser,
  logout,
  getMe,
};

export default userService;
