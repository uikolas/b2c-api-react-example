import { bindActionCreators, Dispatch } from 'redux';
import { RouteProps } from 'react-router';
import { push } from 'react-router-redux';

import { reduxify } from '../../../lib/redux-helper';
import { SearchState } from '../../../reducers/Pages/Search';
import { clearSuggestions } from '../../../actions/Pages/Search';
import { getAppCurrency, TAppCurrency } from '../../../reducers/Common/Init';
import { sendSearchAction, sendSuggestionAction } from '../../../actions/Pages/Search';
import { getProductDataAction } from '../../../actions/Pages/Product';

const mapStateToProps = (state: any, ownProps: any) => {
  const routerProps: RouteProps = state.routing ? state.routing : {};
  const searchProps: SearchState = state.pageSearch ? state.pageSearch : null;
  const currency: TAppCurrency = getAppCurrency(state, ownProps);

  return (
    {
      location: routerProps.location ? routerProps.location : ownProps.location,
      categories: searchProps && searchProps.data ? searchProps.data.categories : ownProps.categories,
      suggestions: searchProps && searchProps.data ? searchProps.data.suggestions : ownProps.suggestions,
      searchTerm: searchProps && searchProps.data ? searchProps.data.searchTerm : ownProps.searchTerm,
      isLoading: searchProps && searchProps.pending ? searchProps.pending : ownProps.pending,
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
