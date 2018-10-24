import { bindActionCreators, Dispatch } from 'redux';
import { RouteProps } from 'react-router';
import { push } from 'react-router-redux';

import { reduxify } from 'src/shared/lib/redux-helper';
import { FlyoutSearch } from 'src/shared/interfaces/searchPageData';
import { getAppCurrency, TAppCurrency } from 'src/shared/reducers/Common/Init';
import { sendSearchAction, sendSuggestionAction, clearSuggestions } from 'src/shared/actions/Pages/Search';
import { getProductDataAction } from 'src/shared/actions/Pages/Product';

const mapStateToProps = (state: any, ownProps: any) => {
  const searchProps: FlyoutSearch = state.pageSearch && state.pageSearch.flyoutSearch ? state.pageSearch.flyoutSearch : null;
  const currency: TAppCurrency = getAppCurrency(state, ownProps);

  return (
    {
      categories: searchProps ? searchProps.categories : ownProps.categories,
      suggestions: searchProps ? searchProps.suggestions : ownProps.suggestions,
      searchTerm: searchProps ? searchProps.searchTerm : ownProps.searchTerm,
      // isLoading: searchProps && searchProps.pending ? searchProps.pending : ownProps.pending,
      currency,
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
