import { IInitData } from 'src/shared/interfaces/init/index';
import { ICategory } from 'src/shared/interfaces/category/index';
import { IReduxState } from 'src/typings/app';
import { IActionData } from 'src/shared/stores/reducers/types';

export interface IInitState extends IReduxState {
  data: IInitData | null;
}

export interface IInitAction extends IActionData {
  payloadInitFulfilled?: IInitData;
  payloadCategoriesTreeFulfilled?: {categories: ICategory[]};
}
