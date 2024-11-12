import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Contact {
  id: string
  name: string
  email: string
  phone: string
}

interface ContactsState {
  list: Contact[]
}

const initialState: ContactsState = {
  list: [],
}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts: (state, action: PayloadAction<Contact[]>) => {
      state.list = action.payload
    },
    addContact: (state, action: PayloadAction<Contact>) => {
      state.list.push(action.payload)
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const index = state.list.findIndex(
        (contact) => contact.id === action.payload.id,
      )
      if (index !== -1) {
        state.list[index] = action.payload
      }
    },
    removeContact: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((contact) => contact.id !== action.payload)
    },
  },
})

export const { setContacts, addContact, updateContact, removeContact } =
  contactsSlice.actions
export default contactsSlice.reducer
