import { IOrderCollectionParsed } from 'src/shared/interfaces/order';
import { IReduxState } from 'src/typings/app';
import { IActionData } from 'src/shared/stores/reducers/types';

export interface IOrdersData extends IOrderCollectionParsed {}

export interface IOrderHistoryState extends IReduxState {
    data: IOrdersData;
}

export interface IPageOrderHistoryAction extends IActionData {
    payloadFulfilled?: IOrderCollectionParsed;
}
