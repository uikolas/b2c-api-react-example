import * as React from 'react';
import { RouteProps } from 'react-router';
import { push } from 'react-router-redux';
import { reduxify } from 'src/shared/lib/redux-helper';
import {
  getAvailableLabels,
  getCategoriesLocalizedName,
  getProductsLabeled,
  getSortParamLocalizedNames,
  getSpellingSuggestion,
  SearchState,
} from 'src/shared/reducers/Pages/Search';
import { getAppCurrency, getCategoriesTree } from 'src/shared/reducers/Common/Init/index';
import {ISearchQuery, TSpellingSuggestion} from 'src/shared/interfaces/searchPageData';
import {getRouterMatchParam} from "src/shared/selectors/Common/router/index";
import {sendSearchAction} from "src/shared/actions/Pages/Search";
import {IReduxOwnProps, IReduxStore} from "src/shared/reducers/types";
import {ICategory} from "src/shared/interfaces/category/index";
import {TAppCurrency} from "src/shared/interfaces/currency/index";

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
  const pageSearchProps: SearchState = state.pageSearch ? state.pageSearch : null;
  const currency: TAppCurrency = getAppCurrency(state, ownProps);
  const categoriesTree: ICategory[] = getCategoriesTree(state, ownProps);
  const spellingSuggestion: TSpellingSuggestion = getSpellingSuggestion(state, ownProps);
  const productsLabeled = getProductsLabeled(state, ownProps);
  const availableLabels = getAvailableLabels(state, ownProps);
  const sortParamLocalizedNames = getSortParamLocalizedNames(state, ownProps);
  const categoriesLocalizedName = getCategoriesLocalizedName(state, ownProps);
  const locationCategoryId = getRouterMatchParam(state, ownProps, 'categoryId');

  return ({
    items: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.items : null,
    searchTerm: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.searchTerm : '',
    filters: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.filters : null,
    rangeFilters: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.rangeFilters : null,
    sortParams: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.sortParams : null,
    currentSort: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.currentSort : null,
    pagination: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.pagination : null,
    category: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.category : null,
    currentCategory: pageSearchProps && pageSearchProps.data
      ? pageSearchProps.data.currentCategory
      : null,
    isLoading: pageSearchProps && pageSearchProps.pending ? pageSearchProps.pending : false,
    isFulfilled: pageSearchProps && pageSearchProps.fulfilled ? pageSearchProps.fulfilled : false,
    currency,
    categoriesTree,
    spellingSuggestion,
    productsLabeled,
    availableLabels,
    sortParamLocalizedNames,
    categoriesLocalizedName,
    locationCategoryId,
  });
};

export const connect = reduxify(
  mapStateToProps,
  (dispatch: Function) => ({
    dispatch,
    changeLocation: (location: string) => dispatch(push(location)),
    sendSearch: (params: ISearchQuery) => dispatch(sendSearchAction(params)),
  }),
);
