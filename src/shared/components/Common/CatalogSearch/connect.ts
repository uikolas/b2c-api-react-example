import { bindActionCreators, Dispatch } from 'redux';
import { push } from 'react-router-redux';

import { reduxify } from 'src/shared/lib/redux-helper';
import { FlyoutSearch } from 'src/shared/interfaces/searchPageData';
import {getAppCurrency, getCategoriesTree, ICategory, TAppCurrency} from 'src/shared/reducers/Common/Init';
import { clearSuggestions, sendSearchAction, sendSuggestionAction } from 'src/shared/actions/Pages/Search';
import { getProductDataAction } from 'src/shared/actions/Pages/Product';
import {IReduxOwnProps, IReduxStore} from "src/shared/reducers/types";

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
  const searchProps: FlyoutSearch = state.pageSearch && state.pageSearch.data
    ? state.pageSearch.data.flyoutSearch
    : null;
  const currency: TAppCurrency = getAppCurrency(state, ownProps);
  const categoriesTree: ICategory[] = getCategoriesTree(state, ownProps);

  return (
    {
      categories: searchProps ? searchProps.categories : null,
      suggestions: searchProps ? searchProps.suggestions : null,
      completion: searchProps ? searchProps.completion : null,
      isLoading: searchProps ? searchProps.pending : null,
      currency,
      categoriesTree,
    }
  );
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      clearSuggestions,
      sendSuggestionAction,
      sendSearchAction,
      getProductDataAction,
      push,
    },
    dispatch,
  );

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
