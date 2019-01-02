import {
  CATEGORIES_TREE_REQUEST,
  INIT_APP_ACTION_TYPE,
  SET_AUTH_FROM_STORAGE,
} from '../../constants/ActionTypes/Common/Init';
import { InitAppService } from '../../services/Common/Init';
import {ICategory} from "src/shared/interfaces/category/index";
import {IInitData} from "src/shared/interfaces/init/index";

export interface IInitApplicationDataPayload {

}

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

export const categoriesFulfilledState = (categories: Array<ICategory>) => ({
  type: CATEGORIES_TREE_REQUEST + '_FULFILLED',
  payloadCategoriesTreeFulfilled: categories,
});


export const initApplicationDataAction = function(payload: IInitApplicationDataPayload) {
  return (dispatch: Function, getState: Function) => {
    InitAppService.getInitData(dispatch, payload);
  };
};

export const setAuthFromStorageAction = (
  payload: {expiresIn: string, accessToken: string, refreshToken: string, customerRef: string}
) => ({
  type: SET_AUTH_FROM_STORAGE + '_FULFILLED',
  payload,
});

export const getCategoriesAction = function() {
  return (dispatch: Function, getState: Function) => {
    InitAppService.getCategoriesTree(dispatch);
  };
};

