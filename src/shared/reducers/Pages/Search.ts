import {
  PAGES_SEARCH_REQUEST,
  PAGES_SEARCH_REQUEST_CLEAR,
  PAGES_SUGGESTION_REQUEST,
  CATEGORIES_REQUEST,
} from '../../constants/ActionTypes/Pages/Search';
import {
  IReduxState,
} from '../../../typings/app';
import {
  CURRENCY_DEFAULT,
} from '../../constants/Environment';
import {ISearchPageData} from "../../interfaces/searchPageData";
import {getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected} from "../parts";

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
    },
    categories: [],
  },
};

export const pageSearch = function (state: SearchState = initialState, action: any): SearchState {
  switch (action.type) {
    case `${PAGES_SUGGESTION_REQUEST}_PENDING`:
      return {
        ...state,
        ...getReducerPartPending(),
      };
    case `${CATEGORIES_REQUEST}_PENDING`:
      return state;
    case `${PAGES_SUGGESTION_REQUEST}_FULFILLED`:
      return {
        ...state,
        data: {
          ...state.data,
          suggestions: action.products,
          searchTerm: action.searchTerm,
          currency: action.currency || state.data.currency,
        },
        ...getReducerPartFulfilled(),
      };
    case `${PAGES_SUGGESTION_REQUEST}_REJECTED`:
    case `${CATEGORIES_REQUEST}_REJECTED`:
      return {
        ...state,
        ...getReducerPartRejected(action.error),
      };
    case `${PAGES_SEARCH_REQUEST}_PENDING`:
      return {
        ...state,
        ...getReducerPartPending(),
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
        ...getReducerPartFulfilled(),
      };
    case `${CATEGORIES_REQUEST}_FULFILLED`:
      return {
        ...state,
        data: {
          ...state.data,
          categories: action.categories,
        },
      };
    case `${PAGES_SEARCH_REQUEST}_REJECTED`:
      return {
        ...state,
        ...getReducerPartRejected(action.error),
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

// selectors
export function getSearchTerm(state: any, props: any): string | null {
  return (
    state.pageSearch.data && state.pageSearch.data.searchTerm
      ? state.pageSearch.data.searchTerm
      : null
  );
}

export function getSuggestions(state: any, props: any): string | null {
  return (
    state.pageSearch.data && state.pageSearch.data.suggestions
      ? state.pageSearch.data.suggestions
      : null
  );
}
