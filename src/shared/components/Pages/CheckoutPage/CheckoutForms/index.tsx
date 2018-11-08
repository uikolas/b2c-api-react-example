import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import { formStyles } from './styles';
import {ICheckoutFormsProps} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/types";
import {DeliveryForm} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/DeliveryForm/index";
import {FormWrapper} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/FormWrapper/index";


export const CheckoutFormsBase: React.SFC<ICheckoutFormsProps> = (props): JSX.Element => {
  const {
    classes,
    submitHandler,
    inputChangeHandler,
    shippingAddress,
  }  = props;

  return (
    <Grid container className={ classes.root }>
      <Grid item xs={ 12 }>
        CheckoutFormsBase

        <FormWrapper title="Delivery Address" >
          <DeliveryForm
            submitHandler={submitHandler}
            inputChangeHandler={inputChangeHandler}
            shippingAddress={shippingAddress}
          />
        </FormWrapper>

      </Grid>
    </Grid>
  );
};

export const CheckoutForms = withStyles(formStyles)(CheckoutFormsBase);

