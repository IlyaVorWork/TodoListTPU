import { createSlice } from '@reduxjs/toolkit'
import type {User} from "./user"

export type UserSliceState = User & {
  isLoading: boolean
}

const initialState: UserSliceState = {
  uid: "",
  email: "",
  displayName: "",
  isLoading: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.uid = action.payload.uid
      state.email = action.payload.email
      state.displayName = action.payload.displayName
    },
    logout: (state) => {
      state.uid = ""
      state.email = ""
      state.displayName = ""
    }
  },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer