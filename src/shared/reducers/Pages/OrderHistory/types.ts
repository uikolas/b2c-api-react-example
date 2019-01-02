import {IOrderCollectionParsed} from "src/shared/interfaces/order/index";
import {IReduxState} from "src/typings/app";
import {IActionData} from "src/shared/reducers/types";

export interface IOrdersData extends IOrderCollectionParsed {

}

export interface IOrderHistoryState extends IReduxState {
  data: IOrdersData;
}

export interface IPageOrderHistoryAction extends IActionData {
  payloadFulfilled?: IOrderCollectionParsed;
}
