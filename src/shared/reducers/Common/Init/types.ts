import {IInitData} from "src/shared/interfaces/init/index";
import {ICategory} from "src/shared/interfaces/category/index";
import {IApiErrorResponse} from "src/shared/services/types";
import {IReduxState} from "src/typings/app";

export type TInitAction = {
  type: string;
  payloadInitFulfilled?: IInitData;
  payloadCategoriesTreeFulfilled?: {categories: Array<ICategory>};
  payloadRejected?: IApiErrorResponse;
};

export interface IInitState extends IReduxState {
  data: IInitData | null;
}
