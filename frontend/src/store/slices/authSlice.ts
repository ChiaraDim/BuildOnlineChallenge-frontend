import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../api/axiosInstance'
import { AxiosError } from 'axios'

export const login = createAsyncThunk(
  'auth/login',
  async (
    credentials: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.post('/auth/login', credentials)
      return response.data
    } catch (error: unknown) {
      if ((error as AxiosError).isAxiosError) {
        const axiosError = error as AxiosError
        return rejectWithValue(
          axiosError.response?.data || 'An unknown error occurred',
        )
      } else {
        return rejectWithValue('An unexpected error occurred')
      }
    }
  },
)

const initialState = {
  token: null,
  user: null,
  status: 'idle',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
        state.status = 'succeeded'
      })
      .addCase(login.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
