import {callTypes, CommonSlices} from "./slices";
import * as requestFromServer from "./cruds";

const { actions } = CommonSlices;

export const getDashboardStatistics = () => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getRequest(`${process.env.REACT_APP_API_BASE_URL}dashboard`)
    .then(response => {
      dispatch(actions.dashboardStatistics(response.data.data));
      return response.data.data;
    })
    .catch(error => {
      error.clientMessage = "Can't find statistics";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const getInspectionsCalenderData = (payload: any) => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .postRequest(`${process.env.REACT_APP_API_BASE_URL}inspections/calendar-data`, payload)
    .then(response => {
      dispatch(actions.inspectionsCalenderData(response.data.data));
      return response.data.data;
    })
    .catch(error => {
      error.clientMessage = "Can't find data";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
}
