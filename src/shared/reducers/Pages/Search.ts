import {
  PAGES_SEARCH_REQUEST,
  PAGES_SEARCH_REQUEST_CLEAR,
  PAGES_SEARCH_SET_ITEMS,
} from '../../constants/ActionTypes/Pages/Search';
import {
  IReduxState,
} from '../../../typings/app';
import {IProductCard} from '../../interfaces/productCard';
import {fixtureSearchTerm, fixtureItems} from '../../components/Pages/SearchPage/fixture';
import {ISearchPageData} from "../../interfaces/searchPageData";

export interface SearchState extends IReduxState {
  data: ISearchPageData;
}

export const initialState: SearchState = {
  data: {
    suggestions: fixtureItems,
    items: [],
    searchTerm: '',
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
        ...state,
        data: {
          ...state.data,
          suggestions: action.items,
          searchTerm: action.searchTerm,
          currency: action.currency || state.data.currency,
        },
        pending: false,
        fulfilled: true,
      };
    case `${PAGES_SEARCH_REQUEST}_REJECTED`:
      return {
        ...state,
        error: action.error,
        pending: false,
        fulfilled: false,
        rejected: true,
      };
    case PAGES_SEARCH_REQUEST_CLEAR:
      return {
        ...state,
        data: {...state.data, suggestions: [], searchTerm: action.searchTerm}
      };
    case PAGES_SEARCH_SET_ITEMS:
      return {
        ...state,
        data: {...state.data, suggestions: [], items: state.data.suggestions}
      };
    default:
      return state;
  }
};
