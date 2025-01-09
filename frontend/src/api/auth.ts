import axiosInstance from './axiosInstance';

interface LoginResponse {
  token: string;
}

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  const { data } = await axiosInstance.post('/api/login', { email, password });
  return data;
};

export const getUser = async (): Promise<{ email: string; name: string }> => {
  const { data } = await axiosInstance.get('/api/user');
  return data;
};