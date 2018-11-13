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
    shippingAddress,
    billingAddress,
    selectedAddresses,
    addressesCollection,
  }  = props;

  return (
    <Grid container className={ classes.root }>
      <Grid item xs={ 12 }>
        <FormWrapper title="Delivery Address" >
          <DeliveryForm
            addressData={shippingAddress}
            addressesCollection={addressesCollection}
            selectedAddresses={selectedAddresses}
          />
        </FormWrapper>
        <FormWrapper title="Billing Address" >
          <BillingForm
            addressData={billingAddress}
          />
        </FormWrapper>
      </Grid>
    </Grid>
  );
};

export const CheckoutForms = withStyles(formStyles)(CheckoutFormsBase);

