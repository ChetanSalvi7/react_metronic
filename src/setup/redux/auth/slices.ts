import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  access_token: null,
  user: null,
  accesses: true,
}

export const AuthSlices = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: (state: any, action: any) => {
      state.user = action.payload.user
    },

    manageUserData: (state: any, action: any) => {
      state.access_token = action.payload.api_token
      state.user = action.payload
    },

    userAccess: (state: any, action: any) => {
      state.accesses = action.payload.accesses
    },

    registration: (state: any, action: any) => {
    },

    logout: (state: any) => {
      state.access_token = null
      state.user = null
      state.accesses = null
    },

    updateUser: (state, action) => {
      state.user = action.payload.user
    },
    updateAvatarUser: (state, action) => {
      // @ts-ignore
      state.user.avatar = ''
    },
  },
})
export const {manageUserData}=AuthSlices.actions
