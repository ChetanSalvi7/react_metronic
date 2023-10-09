import * as requestFromServer from '../common/cruds'
import {UserSlices} from './slices'
import {handleNotificationWithToastify} from '../../../app/services/Functional'
import {callTypes, catchError, endCall, startCall} from '../common/slices'

const actions = UserSlices.actions
const API_URL = `${process.env.REACT_APP_API_BASE_URL}users/`

export const getUserById = (id: number, type: string) => (dispatch: any) => {
  dispatch(startCall({callType: callTypes.action}))
  return requestFromServer
    .getRequest(`${API_URL}${id}/${type}`)
    .then(response => {
      dispatch(endCall({callType: callTypes.action}))
      dispatch(actions.user(response.data.data))
    })
    .catch(error => {
      error.clientMessage = 'Can\'t find user'
      dispatch(catchError({error, callType: callTypes.action}))
    })
}

export const createUser = (payload: any) => (dispatch: any) => {
  dispatch(startCall({callType: callTypes.action}))
  return requestFromServer
    .postRequest(`${API_URL}`, payload, {
      'Content-Type': 'multipart/form-data',
    })
    .then(response => {
      dispatch(endCall({callType: callTypes.action}))
      handleNotificationWithToastify(response.data)
      return response.data
    })
    .catch(error => {
      error.clientMessage = 'Can\'t create user'
      dispatch(catchError({error, callType: callTypes.action}))
      return error
    })
}

export const updateUser = (user: any) => (dispatch: any) => {
  dispatch(startCall({callType: callTypes.action}))
  return requestFromServer
    .patchRequest(`${API_URL}${user.get('id')}`, user, {
      'Content-Type': 'multipart/form-data',
    })
    .then(response => {
      dispatch(endCall({callType: callTypes.action}))
      handleNotificationWithToastify(response.data)
      return response.data
    })
    .catch(error => {
      error.clientMessage = 'Can\'t update user'
      dispatch(catchError({error, callType: callTypes.action}))
      return error
    })
}

export const deleteProfileAvatar = (id: number) => (dispatch: any) => {
  dispatch(startCall({callType: callTypes.action}))
  return requestFromServer
    .getRequest(`${API_URL}delete-user-avatar/${id}`)
    .then(response => {
      dispatch(endCall({callType: callTypes.action}))
      handleNotificationWithToastify(response.data)
      return response.data
    })
    .catch(error => {
      error.clientMessage = 'Can\'t update user'
      dispatch(catchError({error, callType: callTypes.action}))
      return error
    })
}

export const deleteUser = (id: number) => (dispatch: any) => {
  dispatch(startCall({callType: callTypes.action}))
  return requestFromServer
    .deleteRequest(`${API_URL}${id}`)
    .then(response => {
      dispatch(endCall({callType: callTypes.action}))
      handleNotificationWithToastify(response.data)
    })
    .catch(error => {
      error.clientMessage = 'Can\'t delete user'
      dispatch(catchError({error, callType: callTypes.action}))
    })
}
export const groupList = () => (dispatch: any) => {
  dispatch(startCall({callType: callTypes.action}))
  return requestFromServer
    .getRequest(`${API_URL}dropdown`)
    .then(response => {
      dispatch(endCall({callType: callTypes.action}))
      dispatch(actions.inspectionOfficerUsersList(response.data.data))
    })
    .catch(error => {
      error.clientMessage = 'Can\'t get users'
      dispatch(catchError({error, callType: callTypes.action}))
    })
}

export const getSalesManagers = () => (dispatch: any) => {
  dispatch(startCall({callType: callTypes.action}))
  return requestFromServer
    .getRequest(`${API_URL}sales-manager-dropdown`)
    .then(response => {
      dispatch(endCall({callType: callTypes.action}))
      dispatch(actions.salesManagers(response.data.data))
    })
    .catch(error => {
      error.clientMessage = 'Can\'t get users'
      dispatch(catchError({error, callType: callTypes.action}))
    })
}