import {
 INIT_APP_ACTION_TYPE
} from '../../constants/ActionTypes/Common/Init';
import {InitAppService} from "../../services/Common/Init";

export const initAppPendingState = {
  type: INIT_APP_ACTION_TYPE + '_PENDING',
};

export const initAppAction = function (payload: any) {
  return (dispatch: Function, getState: Function) => {
    dispatch(initAppPendingState);
    InitAppService.getInitData(INIT_APP_ACTION_TYPE, dispatch, payload);
  };
};
