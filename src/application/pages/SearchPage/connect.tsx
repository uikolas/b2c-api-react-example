import * as React from 'react';
import { push } from 'react-router-redux';
import { reduxify } from 'src/application/hoc/Reduxify/index';
import {
    getAvailableLabels,
    getCategoriesLocalizedName,
    getProductsLabeled,
    getSortParamLocalizedNames,
    getSpellingSuggestion
} from '@stores/reducers/pages/search';
import { getAppCurrency, getCategoriesTree } from '@stores/reducers/common/init';
import { ISearchQuery, TSpellingSuggestion } from 'src/interfaces/searchPageData/index';
import { getRouterMatchParam } from 'src/helpers/router/index';
import {
    sendSearchAction,
    clearActiveFiltersAction,
    clearSearchTermAction
} from '@stores/actions/pages/search';
import { IReduxOwnProps, IReduxStore } from 'src/stores/reducers/types';
import { ICategory } from 'src/interfaces/category/index';
import { TAppCurrency } from 'src/interfaces/currency/index';
import { ISearchState } from 'src/stores/reducers/pages/search/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const pageSearchProps: ISearchState = state.pageSearch ? state.pageSearch : null;
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
        activeFilters: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.activeFilters : {},
        rangeFilters: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.rangeFilters : null,
        activeRangeFilters: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.activeRangeFilters : {},
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
        clearActiveFilters: () => dispatch(clearActiveFiltersAction()),
        clearSearchTerm: () => dispatch(clearSearchTermAction())
    }),
);
