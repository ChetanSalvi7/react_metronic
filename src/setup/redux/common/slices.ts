import {createSlice} from '@reduxjs/toolkit'

const initialCommonState: ICommonState = {
  listLoading: false,
  actionsLoading: false,
  error: '',
  statistics: [],
  inspectionsCalenderData: [],
}

export interface ICommonState {
  listLoading: boolean,
  actionsLoading: boolean,
  error: string,
  statistics: [],
  inspectionsCalenderData: []
}

export const callTypes = {
  list: 'list',
  action: 'action',
}

export const CommonSlices = createSlice({
  name: 'common',
  initialState: initialCommonState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false
      } else {
        state.actionsLoading = false
      }
    },
    startCall: (state, action) => {
      state.error = ''
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true
      } else {
        state.actionsLoading = true
      }
    },
    endCall: (state, action) => {
      state.error = ''
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false
      } else {
        state.actionsLoading = false
      }
    },
    dashboardStatistics: (state, action) => {
      state.actionsLoading = false
      state.error = ''
      state.statistics = action.payload
    },
    inspectionsCalenderData: (state, action) => {
      state.actionsLoading = false
      state.error = ''
      state.inspectionsCalenderData = action.payload.inspections
    },
    resetCalenderData: (state, action) => {
      state.inspectionsCalenderData = action.payload
    },
  },
})

export const {catchError, startCall, endCall} = CommonSlices.actions
