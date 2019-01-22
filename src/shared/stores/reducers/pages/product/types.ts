import { IReduxState } from 'src/typings/app';
import {IConcreteProductAvailability, IProductDataParsed} from "src/shared/interfaces/product/index";
import {IActionData} from "src/shared/stores/reducers/types";


export interface IProductState extends IReduxState {
  data: {
    selectedProduct: IProductDataParsed | null,
  };
}

export interface IPageProductAction extends IActionData {
  payloadFulfilled?: IProductDataParsed;
  payloadAvailability?: IConcreteProductAvailability | null;
}
