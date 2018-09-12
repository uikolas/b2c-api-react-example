import {
  PAGES_SEARCH_REQUEST,
} from '../../constants/ActionTypes/Pages/Search';
import {PagesLoginService} from '../../services/Pages/Login';


export const searchPendingState = {
  type: PAGES_SEARCH_REQUEST + '_PENDING',
};
// TODO: sendSearchAction - to make request
export const sendSearchAction = function (payload: any) {
  return (dispatch: Function, getState: Function) => {
    PagesLoginService.loginRequest(PAGES_SEARCH_REQUEST, dispatch, payload);
    dispatch(searchPendingState);
  };
};

