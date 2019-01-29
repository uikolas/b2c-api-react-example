import * as React from 'react';
import { IOrderDetailsSelectedItems } from '../../../interfaces/order';
import { InputChangeEvent } from 'src/shared/interfaces/common/react';
import { TAppCurrency } from 'src/shared/interfaces/currency';

type TOrderDetailsContext = {
    selectItemHandler(event: InputChangeEvent): void,
    currency: TAppCurrency,
    selectedItems: IOrderDetailsSelectedItems,
};

export const OrderDetailsContext = React.createContext<TOrderDetailsContext>({
    selectItemHandler: (event: InputChangeEvent) => {
        throw new Error('selectItemHandler() is not implemented');
    },
    currency: null,
    selectedItems: {},
});
