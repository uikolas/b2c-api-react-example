import {
    CATEGORIES_TREE_REQUEST,
    INIT_APP_ACTION_TYPE,
    SET_AUTH_FROM_STORAGE,
} from '@stores/actionTypes/common/init';
import { InitAppService } from '@services/Common/init';
import { ICategory } from 'src/shared/interfaces/category';
import { IInitData } from 'src/shared/interfaces/init';
import { ICustomerLoginDataParsed } from 'src/shared/interfaces/customer';

export interface IInitApplicationDataPayload {}

export const initApplicationDataPendingStateAction = () => ({
    type: INIT_APP_ACTION_TYPE + '_PENDING',
});

export const initApplicationDataRejectedStateAction = (message: string) => ({
    type: INIT_APP_ACTION_TYPE + '_REJECTED',
    payloadRejected: {error: message},
});

export const initApplicationDataFulfilledStateAction = (payload: IInitData) => ({
    type: INIT_APP_ACTION_TYPE + '_FULFILLED',
    payloadInitFulfilled: payload,
});

export const categoriesPendingState = () => ({
    type: CATEGORIES_TREE_REQUEST + '_PENDING',
});

export const categoriesRejectedState = (message: string) => ({
    type: CATEGORIES_TREE_REQUEST + '_REJECTED',
    payloadRejected: {error: message},
});

export const categoriesFulfilledState = (categories: ICategory[]) => ({
    type: CATEGORIES_TREE_REQUEST + '_FULFILLED',
    payloadCategoriesTreeFulfilled: {categories},
});

export const initApplicationDataAction = function (payload: IInitApplicationDataPayload) {
    return (dispatch: Function, getState: Function) => {
        InitAppService.getInitData(dispatch, payload);
    };
};

export const setAuthFromStorageAction = (payload: ICustomerLoginDataParsed) => ({
    type: SET_AUTH_FROM_STORAGE + '_FULFILLED',
    payloadAuthFulfilled: payload,
});

export const getCategoriesAction = function () {
    return (dispatch: Function, getState: Function) => {
        InitAppService.getCategoriesTree(dispatch);
    };
};
