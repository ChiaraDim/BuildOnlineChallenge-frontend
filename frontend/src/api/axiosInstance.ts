import axios from 'axios';
import store from '../store';
import { RootState } from '../store';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state: RootState = store.getState();
    const token = state.auth.token;

    if (config.headers) {
      config.headers.set('Authorization', token ? `Bearer ${token}` : '');
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;