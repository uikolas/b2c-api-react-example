import {
  PAGES_SEARCH_REQUEST,
} from '../../constants/ActionTypes/Pages/Search';
import {
  IReduxState,
} from '../../../typings/app';
import {IProduct} from '../../interfaces/product';
import {fixtureSearchTerm, fixtureItems} from '../../components/Pages/SearchPage/fixture';

export interface SearchState extends IReduxState {
  data: {
    items?: Array<IProduct> | null,
    searchTerm?: string,
  };
}

export const initialState: SearchState = {
  data: {
    items: fixtureItems,
    searchTerm: fixtureSearchTerm,
  },
};


export const pageSearch = function (state: SearchState = initialState, action: any): SearchState {
  switch (action.type) {
    case `${PAGES_SEARCH_REQUEST}_PENDING`:
      return {
        ...state,
        error: null,
        pending: true,
        fulfilled: false,
        rejected: false,
      };
    case `${PAGES_SEARCH_REQUEST}_FULFILLED`:
      return {
        error: null,
        data: {
          items: action.payload.items,
          searchTerm: action.payload.searchTerm,
        },
        pending: false,
        fulfilled: true,
        rejected: false,
      };
    case `${PAGES_SEARCH_REQUEST}_REJECTED`:
      return {
        ...state,
        error: action.error,
        pending: false,
        fulfilled: false,
        rejected: true,
      };
    default:
      return state;
  }
};
