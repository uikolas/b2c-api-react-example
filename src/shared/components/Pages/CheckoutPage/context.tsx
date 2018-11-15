import * as React from 'react';
import {ChangeEvent, FormEvent} from "react";
import {TCheckoutPageContext} from "src/shared/components/Pages/CheckoutPage/types";


export const CheckoutPageContext = React.createContext<TCheckoutPageContext>({
  submitHandler: (event: FormEvent<HTMLFormElement>) => {
    throw new Error('submitHandler() not implemented');
  },
  inputChangeHandler: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
    throw new Error('inputChangeHandler() not implemented');
  },
  isBillingSameAsDelivery: false,
});
