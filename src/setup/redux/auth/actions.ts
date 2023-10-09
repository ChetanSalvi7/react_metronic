import {AuthSlices} from './slices'
import * as requestFromServer from '../common/cruds'
import {catchError, endCall, startCall} from '../common/slices'

const {actions} = AuthSlices

const API_URL = process.env.REACT_APP_API_URL

const LOGIN_URL = `${API_URL}/login`
const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`
const REGISTER_URL = `${API_URL}/register`
const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`

export const userLogin = (payload: any) => (dispatch: any) => {
    dispatch(startCall({}))
    return requestFromServer
        .postRequest(`${LOGIN_URL}`, payload)
        .then(response => {
            console.log(response);
            // if (!response.data.success) {
            //   dispatch(catchError({message: response.data.message}))
            //   return response.data
            // }
            if (response.data?.data?.user?.is_two_factor_auth === true) {
                dispatch(actions.login(response.data.data))
            } else {
                dispatch(actions.manageUserData(response.data))
            }
            dispatch(endCall({}))
            return response.data
        }).catch(e => {
            dispatch(endCall({}))
        })
}

export const getUserAccess = () => (dispatch: any) => {
    dispatch(startCall({}))
    return requestFromServer
        .postRequest(`${API_URL}auth/user-access/`)
        .then(response => {
            if (!response.data.success) {
                dispatch(catchError({message: response.data.message}))
                return response.data
            }
            dispatch(actions.userAccess(response.data.data))
            dispatch(endCall({}))
            return response.data
        })
}

export const verifyOTP = (payload: any) => (dispatch: any) => {
    dispatch(startCall({}))
    return requestFromServer
        .postRequest(`${API_URL}auth/validate-otp/`, payload)
        .then(response => {
            if (!response.data.success) {
                dispatch(catchError({message: response.data.message}))
                return response.data
            }
            dispatch(actions.manageUserData(response.data.data))
            dispatch(endCall({}))
            return response.data
        }).catch(e => {
            dispatch(endCall({}))
        })
}

export const getUserByTokenOrVerify = (payload: any) => (dispatch: any) => {
    dispatch(startCall({}))
    return requestFromServer
        .postRequest(`${GET_USER_BY_ACCESSTOKEN_URL}`, payload)
        .then(response => {
            // if (!response.data.success) {
            //     dispatch(catchError({message: response.data.message}))
            //     return response.data
            // }
            dispatch(actions.manageUserData(response.data))
            dispatch(endCall({}))
            return response.data
        }).catch(e => {
            dispatch(endCall({}))
        })
}

export const userLogout = () => async (dispatch: any) => {
    // await requestFromServer.getRequest(`${API_URL}auth/logout/`)
    dispatch(actions.logout())
    // dispatch(cleanConfiguration({}))
    dispatch(endCall({}))
    // navigate('/auth/login')
}
