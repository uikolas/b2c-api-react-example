import { IActionData, IReduxState } from '@stores/reducers/types';
import { IConcreteProductAvailability, IProductDataParsed } from 'src/shared/interfaces/product/index';

export interface IProductState extends IReduxState {
    data: {
        selectedProduct: IProductDataParsed | null,
    };
}

export interface IPageProductAction extends IActionData {
    payloadFulfilled?: IProductDataParsed;
    payloadAvailability?: IConcreteProductAvailability | null;
}
