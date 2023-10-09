import {createSlice} from '@reduxjs/toolkit'

const initialUserState = {
  totalCount: 0,
  users: null,
  inspectionOfficers: [],
  companyUsers: [],
  user: undefined,
  salesManagers: []
}

export const UserSlices = createSlice({
  name: 'users',
  initialState: initialUserState,
  reducers: {
    user: (state, action) => {
      state.user = action.payload.user
    },

    users: (state, action) => {
      state.users = action.payload.users
      state.totalCount = action.payload.total_count
    },
    inspectionOfficerUsersList: (state, action) => {
      state.inspectionOfficers = action.payload.users
    },
    companyUsersList: (state, action) => {
      state.companyUsers = action.payload.users
    },
    salesManagers:(state, action) => {
      state.salesManagers = action.payload.sales_managers
    }
  },
})