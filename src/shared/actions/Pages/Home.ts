import { PAGES_HOME_GET_DATA_REQUEST } from '../../constants/ActionTypes/Pages/Home';
import { PagesHomeService } from '../../services/Pages/Home';


export const dataActionPendingState = {
  type: PAGES_HOME_GET_DATA_REQUEST + '_PENDING',
  meta: {},
};

export const getDataAction = function() {
  return (dispatch: Function, getState: Function) => {
    PagesHomeService.getData(PAGES_HOME_GET_DATA_REQUEST, dispatch);
    dispatch(dataActionPendingState);
  };
};
