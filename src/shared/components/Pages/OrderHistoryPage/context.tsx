import * as React from 'react';
import {TOrderHistoryContext} from "src/shared/components/Pages/OrderHistoryPage/types";
import {ClickEvent} from "src/shared/interfaces/commoon/react";


export const OrderHistoryContext = React.createContext<TOrderHistoryContext>({
  viewClickHandler: (event: ClickEvent): void => {
    throw new Error('viewClickHandler() not implemented');
  },
});
