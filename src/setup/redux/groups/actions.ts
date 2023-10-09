import * as requestFromServer from "../common/cruds";
import {GroupSlices} from "./slices";
import {handleNotificationWithToastify} from '../../../app/services/Functional'
import {callTypes, catchError, endCall, startCall} from "../common/slices";

const actions = GroupSlices.actions;
const API_URL = `${process.env.REACT_APP_API_BASE_URL}groups/`;

export const getGroupById = (id:number) => (dispatch:any) => {
  dispatch(startCall({ callType: callTypes.action }));
  return requestFromServer
    .getRequest(`${API_URL}${id}`)
    .then(response => {
      dispatch(endCall({ callType: callTypes.action }));
      dispatch(actions.group(response.data.data));
    })
    .catch(error => {
      error.clientMessage = "Can't find group";
      dispatch(catchError({ error, callType: callTypes.action }));
    });
};

export const createGroup = (payload:any) => (dispatch:any) => {
  dispatch(startCall({ callType: callTypes.action }));
  return requestFromServer
    .postRequest(`${API_URL}`, payload)
    .then(response => {
      dispatch(endCall({ callType: callTypes.action }));
      handleNotificationWithToastify(response.data);
      return response.data;
    })
    .catch(error => {
      error.clientMessage = "Can't create group";
      dispatch(catchError({ error, callType: callTypes.action }));
      return error;
    });
};

export const updateGroup = (group:any) => (dispatch:any) => {
  dispatch(startCall({ callType: callTypes.action }));
  return requestFromServer
    .patchRequest(`${API_URL}${group.id}`, group)
    .then(response => {
      dispatch(endCall({ callType: callTypes.action }));
      handleNotificationWithToastify(response.data);
      return response.data;
    })
    .catch(error => {
      error.clientMessage = "Can't update group";
      dispatch(catchError({ error, callType: callTypes.action }));
      return error;
    });
};

export const groupList = () => (dispatch:any) => {
  dispatch(startCall({ callType: callTypes.action }));
  return requestFromServer
    .getRequest(`${API_URL}dropdown`)
    .then(response => {
      dispatch(endCall({ callType: callTypes.action }));
      dispatch(actions.groupList({ groups: response.data.data.groups }));
    })
    .catch(error => {
      error.clientMessage = "Can't get group list";
      dispatch(catchError({ error, callType: callTypes.action }));
    });
};