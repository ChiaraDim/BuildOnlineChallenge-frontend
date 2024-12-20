import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import contactsReducer from './slices/contactsSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    contacts: contactsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
