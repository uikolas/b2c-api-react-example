import {
  PAGES_SEARCH_REQUEST,
  PAGES_SEARCH_REQUEST_CLEAR,
  PAGES_SUGGESTION_REQUEST,
} from '../../constants/ActionTypes/Pages/Search';
import {
  IReduxState,
} from '../../../typings/app';
import {
  CURRENCY_DEFAULT,
} from '../../constants/Environment';
import {fixtureSearchTerm, fixtureItems} from '../../components/Pages/SearchPage/fixture';
import {ISearchPageData} from "../../interfaces/searchPageData";

export interface SearchState extends IReduxState {
  data: ISearchPageData;
}

export const initialState: SearchState = {
  data: {
    suggestions: [],
    items: [],
    searchTerm: '',
    currency: CURRENCY_DEFAULT,
    filters: [],
    rangeFilters: [],
    sortParams: [],
    pagination: {
      numFound: 0,
      currentPage: 0,
      maxPage: 0,
      currentItemsPerPage: 0,
    }
  },
};

export const pageSearch = function (state: SearchState = initialState, action: any): SearchState {
  switch (action.type) {
    case `${PAGES_SUGGESTION_REQUEST}_PENDING`:
      return {
        ...state,
        error: null,
        pending: true,
        fulfilled: false,
        rejected: false,
      };
    case `${PAGES_SUGGESTION_REQUEST}_FULFILLED`:
      return {
        ...state,
        data: {
          ...state.data,
          suggestions: action.products,
          searchTerm: action.searchTerm,
          currency: action.currency || state.data.currency,
        },
        pending: false,
        fulfilled: true,
      };
    case `${PAGES_SUGGESTION_REQUEST}_REJECTED`:
      return {
        ...state,
        error: action.error,
        pending: false,
        fulfilled: false,
        rejected: true,
      };
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
          items: action.items,
          filters: action.filters,
          rangeFilters: action.rangeFilters,
          sortParams: action.sortParams,
          pagination: action.pagination,
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
    default:
      return state;
  }
};
