import * as React from 'react';
import {TOrderHistoryContext} from "src/shared/components/Pages/OrderHistoryPage/types";


export const OrderHistoryContext = React.createContext<TOrderHistoryContext>({
  viewClickHandler: (event: any) => {
    throw new Error('viewClickHandler() not implemented');
  },
});
