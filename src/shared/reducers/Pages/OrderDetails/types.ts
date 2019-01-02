import {IReduxState} from "src/typings/app";
import {IOrderDetailsParsed} from "src/shared/interfaces/order/index";
import {IActionData} from "src/shared/reducers/types";


export interface IOrderDetailsState extends IReduxState {
  data: IOrderDetailsParsed;
}

export interface IPageOrderDetailsAction extends IActionData {
  payloadFulfilled?: IOrderDetailsParsed;
}
