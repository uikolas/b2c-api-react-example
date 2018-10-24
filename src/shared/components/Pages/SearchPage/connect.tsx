import * as React from 'react';
import { RouteProps } from 'react-router';
import { push } from 'react-router-redux';
import { reduxify } from 'src/shared/lib/redux-helper';
import {getSpellingSuggestion, SearchState} from 'src/shared/reducers/Pages/Search';
import { getAppCurrency, TAppCurrency } from 'src/shared/reducers/Common/Init';
import {TSpellingSuggestion} from "src/shared/interfaces/searchPageData/index";

const mapStateToProps = (state: any, ownProps: any) => {
  const routerProps: RouteProps = state.routing ? state.routing : {};
  const pageSearchProps: SearchState = state.pageSearch ? state.pageSearch : null;
  const currency: TAppCurrency = getAppCurrency(state, ownProps);
  const spellingSuggestion: TSpellingSuggestion = getSpellingSuggestion(state, ownProps);

  return ({
    location: routerProps.location ? routerProps.location : ownProps.location,
    items: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.items : ownProps.items,
    searchTerm: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.searchTerm : ownProps.searchTerm,
    filters: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.filters : ownProps.filters,
    rangeFilters: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.rangeFilters : ownProps.rangeFilters,
    sortParams: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.sortParams : ownProps.sortParams,
    currentSort: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.currentSort : ownProps.currentSort,
    pagination: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.pagination : ownProps.pagination,
    categoriesTree: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.categoriesTree : ownProps.categoriesTree,
    category: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.category : ownProps.category,
    isLoading: pageSearchProps && pageSearchProps.pending ? pageSearchProps.pending : ownProps.pending,
    currency,
    spellingSuggestion,
  });
};

export const connect = reduxify(
  mapStateToProps,
  (dispatch: Function) => ({
    dispatch,
    changeLocation: (location: string) => dispatch(push(location)),
  }),
);
