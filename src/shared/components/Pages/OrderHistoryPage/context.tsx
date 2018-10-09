import * as React from "react";

type TOrderHistoryContext = {
  viewClickHandler(event: any): any,
};

export const OrderHistoryContext = React.createContext<TOrderHistoryContext>({
  viewClickHandler: (event: any) => {
    throw new Error('viewClickHandler() not implemented');
  }
});
