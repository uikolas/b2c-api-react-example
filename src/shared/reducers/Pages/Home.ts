import {
  PAGES_HOME_GET_DATA_REQUEST,
} from '../../constants/ActionTypes/Pages/Home';
import {
  IReduxState,
} from '../../../typings/app';


export interface IHomeState extends IReduxState {
  data: {
    items?: any[],
    items_count?: number,
  };
}

export const initialState: IHomeState = {
  data: {},
};


export const pagesHome = function (state: IHomeState = initialState, action: any): IHomeState {
  switch (action.type) {
    case `${PAGES_HOME_GET_DATA_REQUEST}_PENDING`:
      // console.info('pagesHomeGetDataAction', state);
      // console.info('pagesHomeGetDataAction', action);
      return {
        // ...state,
        error: null,
        data: {},
        pending: true,
        fulfilled: false,
        rejected: false,
      };
    case `${PAGES_HOME_GET_DATA_REQUEST}_FULFILLED`:
      // console.info('pagesHomeGetDataAction', state);
      // console.info('pagesHomeGetDataAction', action);
      return {
        // ...state,
        error: null,
        data: action.payload,
        pending: false,
        fulfilled: true,
        rejected: false,
      };
    case `${PAGES_HOME_GET_DATA_REQUEST}_REJECTED`:
      // console.info('pagesHomeGetDataAction', state);
      // console.info('pagesHomeGetDataAction', action);
      return {
        // ...state,
        error: action.error,
        data: {},
        pending: false,
        fulfilled: false,
        rejected: true,
      };
    default:
      return state;
  }
};
