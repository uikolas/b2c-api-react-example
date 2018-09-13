import {
  PAGES_SEARCH_REQUEST,
} from '../../constants/ActionTypes/Pages/Search';
import {CatalogService} from '../../services/Common/Catalog';


export const searchPendingState = {
  type: PAGES_SEARCH_REQUEST + '_PENDING',
};
// TODO: sendSearchAction - to make request
export const sendSearchAction = function (query: string) {
  return (dispatch: Function, getState: Function) => {
    CatalogService.catalogSearchSuggestion(PAGES_SEARCH_REQUEST, dispatch, query);
    dispatch(searchPendingState);
  };
};

