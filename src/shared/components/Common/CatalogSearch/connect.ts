import { bindActionCreators, Dispatch } from 'redux';
import { push } from 'react-router-redux';

import { reduxify } from 'src/shared/lib/redux-helper';
import { FlyoutSearch } from 'src/shared/interfaces/searchPageData';
import { getAppCurrency, TAppCurrency } from 'src/shared/reducers/Common/Init';
import { sendSearchAction, sendSuggestionAction, clearSuggestions } from 'src/shared/actions/Pages/Search';
import { getProductDataAction } from 'src/shared/actions/Pages/Product';

const mapStateToProps = (state: any, ownProps: any) => {
  const searchProps: FlyoutSearch = state.pageSearch && state.pageSearch.data ? state.pageSearch.data.flyoutSearch : null;
  const searchTerm: string =  state.pageSearch && state.pageSearch.data ? state.pageSearch.data.searchTerm : ownProps.searchTerm;
  const currency: TAppCurrency = getAppCurrency(state, ownProps);

  return (
    {
      categories: searchProps ? searchProps.categories : ownProps.categories,
      suggestions: searchProps ? searchProps.suggestions : ownProps.suggestions,
      completion: searchProps ? searchProps.completion : ownProps.completion,
      isLoading: searchProps ? searchProps.pending : ownProps.isLoading,
      currency,
      searchTerm,
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
