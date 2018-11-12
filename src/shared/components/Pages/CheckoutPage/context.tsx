import * as React from 'react';
import {ChangeEvent, FormEvent} from "react";
import {ICheckoutPageContext} from "src/shared/components/Pages/CheckoutPage/types";


export const CheckoutPageContext = React.createContext<ICheckoutPageContext>({
  submitHandler: (event: FormEvent<HTMLFormElement>) => {
    throw new Error('submitHandler() not implemented');
  },
  inputChangeHandler: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
    throw new Error('inputChangeHandler() not implemented');
  },
});
