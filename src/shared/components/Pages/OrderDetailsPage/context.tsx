import * as React from "react";
import {TAppCurrency} from "../../../reducers/Common/Init";

type TOrderDetailsContext = {
  selectItemHandler(event: any): any,
  currency: TAppCurrency,
};

export const OrderDetailsContext = React.createContext<TOrderDetailsContext>({
  selectItemHandler: (event: any) => {
    throw new Error('selectItemHandler() is not implemented');
  },
  currency: null,
});
