import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import { formStyles } from './styles';
import {ICheckoutFormsProps} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/types";
import {DeliveryForm} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/DeliveryForm/index";
import {FormWrapper} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/FormWrapper/index";
import {BillingForm} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/BillingForm/index";


export const CheckoutFormsBase: React.SFC<ICheckoutFormsProps> = (props): JSX.Element => {
  const {
    classes,
    submitHandler,
    inputChangeHandler,
    shippingAddress,
    billingAddress,
  }  = props;

  return (
    <Grid container className={ classes.root }>
      <Grid item xs={ 12 }>
        <FormWrapper title="Delivery Address" >
          <DeliveryForm
            submitHandler={submitHandler}
            inputChangeHandler={inputChangeHandler}
            addressData={shippingAddress}
          />
        </FormWrapper>
        <FormWrapper title="Billing Address" >
          <BillingForm
            submitHandler={submitHandler}
            inputChangeHandler={inputChangeHandler}
            addressData={billingAddress}
          />
        </FormWrapper>
      </Grid>
    </Grid>
  );
};

export const CheckoutForms = withStyles(formStyles)(CheckoutFormsBase);

