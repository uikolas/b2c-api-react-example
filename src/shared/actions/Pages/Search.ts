import {
  PAGES_SEARCH_REQUEST,
  PAGES_SEARCH_REQUEST_CLEAR,
  PAGES_SEARCH_SET_ITEMS,
} from '../../constants/ActionTypes/Pages/Search';
import {CatalogService} from '../../services/Common/Catalog';


export const searchPendingState = {
  type: PAGES_SEARCH_REQUEST + '_PENDING',
};

export const sendSearchAction = function (query: string) {
  return (dispatch: Function, getState: Function) => {
    CatalogService.catalogSearchSuggestion(PAGES_SEARCH_REQUEST, dispatch, query);
    dispatch(searchPendingState);
  };
};

export const clearSuggestions = function(searchTerm: string) {
  return {
    type: PAGES_SEARCH_REQUEST_CLEAR,
    searchTerm,
  };
};

export const setItemsFromSuggestions = function() {
  return {
    type: PAGES_SEARCH_SET_ITEMS,
  };
}
