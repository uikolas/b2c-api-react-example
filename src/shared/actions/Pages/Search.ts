import {
  PAGES_SEARCH_REQUEST,
  PAGES_SEARCH_REQUEST_CLEAR,
  PAGES_SUGGESTION_REQUEST,
  CATEGORIES_REQUEST,
} from '../../constants/ActionTypes/Pages/Search';
import {CatalogService} from '../../services/Common/Catalog';


export const suggestPendingState = {
  type: PAGES_SUGGESTION_REQUEST + '_PENDING',
};

export const searchPendingState = {
  type: PAGES_SEARCH_REQUEST + '_PENDING',
};

export const categoriesPendingState = {
  type: CATEGORIES_REQUEST + '_PENDING',
};

export const sendSuggestionAction = function (query: string) {
  return (dispatch: Function, getState: Function) => {
    dispatch(suggestPendingState);
    CatalogService.catalogSuggestion(PAGES_SUGGESTION_REQUEST, dispatch, query);
  };
};

export const sendSearchAction = function (params: any) {
  return (dispatch: Function, getState: Function) => {
    dispatch(searchPendingState);
    CatalogService.catalogSearch(PAGES_SEARCH_REQUEST, dispatch, params);
  };
};

export const getCategoriesAction = function () {
  return (dispatch: Function, getState: Function) => {
    dispatch(categoriesPendingState);
    CatalogService.getCategoriesTree(CATEGORIES_REQUEST, dispatch);
  };
};

export const clearSuggestions = function(searchTerm: string) {
  return {
    type: PAGES_SEARCH_REQUEST_CLEAR,
    searchTerm,
  };
};

