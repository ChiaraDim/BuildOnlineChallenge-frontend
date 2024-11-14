import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import axiosInstance from '../../api/axiosInstance'
import { RootState } from '../index'

interface AuthState {
  token: string | null
  user: { email: string } | null
  loading: boolean
  error: string | null
}

interface LoginResponse {
  token: string
  user: { email: string }
}

interface LoginError {
  message: string
}

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
}

export const login = createAsyncThunk<
  LoginResponse,
  { email: string; password: string },
  { rejectValue: LoginError }
>('auth/login', async ({ email, password }, { rejectWithValue }) => {
  console.log('API URL:', process.env.NEXT_PUBLIC_API_URL)
  try {
    const response = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
      {
        email,
        password,
      },
    )
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError<LoginError>
    if (axiosError.response && axiosError.response.data) {
      return rejectWithValue(axiosError.response.data)
    }
    return rejectWithValue({ message: 'Login failed' })
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        token: string
        user: { email: string }
      }>,
    ) => {
      state.token = action.payload.token
      state.user = action.payload.user
      localStorage.setItem('token', action.payload.token)
    },
    clearUser: (state) => {
      state.token = null
      state.user = null
      localStorage.removeItem('token')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        state.user = action.payload.user
        localStorage.setItem('token', action.payload.token)
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ? action.payload.message : 'Login failed'
      })
  },
})

export const { setUser, clearUser } = authSlice.actions
export const selectAuth = (state: RootState) => state.auth
export default authSlice.reducer
