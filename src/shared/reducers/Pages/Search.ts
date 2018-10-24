import produce from 'immer';
import {
  PAGES_SEARCH_REQUEST,
  PAGES_SEARCH_REQUEST_CLEAR,
  PAGES_SUGGESTION_REQUEST,
  CATEGORIES_REQUEST,
} from '../../constants/ActionTypes/Pages/Search';
import {
  IReduxState,
} from '../../../typings/app';
import {ISearchPageData, TSpellingSuggestion} from "../../interfaces/searchPageData";

export interface SearchState extends IReduxState {
  data: ISearchPageData;
}

export const initialState: SearchState = {
  data: {
    suggestions: [],
    items: [],
    searchTerm: '',
    filters: [],
    rangeFilters: [],
    sortParams: [],
    currentSort: '',
    pagination: {
      numFound: 0,
      currentPage: 0,
      maxPage: 0,
      currentItemsPerPage: 12,
    },
    category: [],
    categoriesTree: [],
    categories: [],
    spellingSuggestion: null,
  },
};

export const pageSearch = produce<SearchState>(
  (draft: SearchState, action: any) => {
    switch (action.type) {
      case `${PAGES_SUGGESTION_REQUEST}_PENDING`:
      case `${PAGES_SEARCH_REQUEST}_PENDING`:
        draft.error = false;
        draft.pending = true;
        draft.fulfilled = false;
        draft.rejected = false;
        draft.initiated = true;
        break;
      case `${PAGES_SUGGESTION_REQUEST}_FULFILLED`:
        draft.data.suggestions = action.products;
        draft.data.categories = action.categories;
        draft.data.searchTerm = action.searchTerm;
        draft.data.currency = action.currency || draft.data.currency;
        draft.data.spellingSuggestion = null;
        draft.error = false;
        draft.pending = false;
        draft.fulfilled = true;
        draft.rejected = false;
        draft.initiated = true;
        break;
      case `${PAGES_SUGGESTION_REQUEST}_REJECTED`:
      case `${CATEGORIES_REQUEST}_REJECTED`:
      case `${PAGES_SEARCH_REQUEST}_REJECTED`:
        draft.error = action.error;
        draft.pending = false;
        draft.fulfilled = false;
        draft.rejected = true;
        break;
      case `${PAGES_SEARCH_REQUEST}_FULFILLED`:
        console.log('action', action);
        draft.data.items = action.items;
        draft.data.filters = action.filters;
        draft.data.category = action.category;
        draft.data.rangeFilters = action.rangeFilters;
        draft.data.sortParams = action.sortParams;
        draft.data.currentSort = action.currentSort;
        draft.data.pagination = action.pagination;
        draft.data.spellingSuggestion = action.spellingSuggestion || null;
        draft.error = false;
        draft.pending = false;
        draft.fulfilled = true;
        draft.rejected = false;
        draft.initiated = true;
        break;
      case `${CATEGORIES_REQUEST}_FULFILLED`:
        draft.data.categoriesTree = action.categories;
        draft.error = false;
        draft.pending = false;
        draft.fulfilled = true;
        draft.rejected = false;
        draft.initiated = true;
        break;
      case PAGES_SEARCH_REQUEST_CLEAR:
        draft.data.suggestions = [];
        draft.data.searchTerm = action.searchTerm;
        draft.data.spellingSuggestion = null;
        draft.error = false;
        draft.pending = false;
        draft.fulfilled = true;
        draft.rejected = false;
        draft.initiated = true;
        break;
      default:
        break;
    }
  },
  initialState,
);

// selectors
export function isPageSearchStateLoading(state: any, props: any): boolean {
  return (state.pageSearch && state.pageSearch.pending && state.pageSearch.pending === true);
}

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

export function getSpellingSuggestion(state: any, props: any): TSpellingSuggestion | null {
  return (
    state.pageSearch.data && state.pageSearch.data.spellingSuggestion
      ? state.pageSearch.data.spellingSuggestion
      : null
  );
}
