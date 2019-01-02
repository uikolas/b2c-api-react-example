import * as React from 'react';
import { TAppCurrency } from '../../../reducers/Common/Init/Init';
import { IOrderDetailsSelectedItems } from '../../../interfaces/order';
import {InputChangeEvent} from "src/shared/interfaces/common/react";

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
