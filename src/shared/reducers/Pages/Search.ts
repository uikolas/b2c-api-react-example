import {
  PAGES_SEARCH_REQUEST,
} from '../../constants/ActionTypes/Pages/Search';
import {
  IReduxState,
} from '../../../typings/app';
import {IProductCard} from '../../interfaces/productCard';
import {fixtureSearchTerm, fixtureItems} from '../../components/Pages/SearchPage/fixture';
import {ISearchPageData} from "../../interfaces/searchPageData/index";

export interface SearchState extends IReduxState {
  data: ISearchPageData;
}

export const initialState: SearchState = {
  data: {
    items: fixtureItems,
    searchTerm: fixtureSearchTerm,
    currency: 'EUR',
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
          currency: action.payload.currency,
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
