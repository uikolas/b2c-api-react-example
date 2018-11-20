import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import { formStyles } from './styles';
import {ICheckoutFormsProps, IPanelData} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/types";
import {DeliveryForm} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/DeliveryForm/index";
import {FormWrapper} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/FormWrapper/index";
import {BillingForm} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/BillingForm/index";
import {ShipmentMethod} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/ShipmentMethod/index";
import {PaymentMethod} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/PaymentMethod/index";


export const CheckoutFormsBase: React.SFC<ICheckoutFormsProps> = (props): JSX.Element => {
  const {
    classes,
    panels,
  }  = props;

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <FormWrapper
          title={panels.first.title}
          isDisabled={panels.first.isDisabled}
        >
          <DeliveryForm />
        </FormWrapper>
        <FormWrapper
          title={panels.second.title}
          isDisabled={panels.second.isDisabled}
        >
          <BillingForm />
        </FormWrapper>
        <FormWrapper
          title={panels.third.title}
          isDisabled={panels.third.isDisabled}
        >
          <ShipmentMethod />
        </FormWrapper>
        <FormWrapper
          title={panels.fourth.title}
          isDisabled={panels.fourth.isDisabled}
        >
          <PaymentMethod />
        </FormWrapper>
      </Grid>
    </Grid>
  );
};

export const CheckoutForms = withStyles(formStyles)(CheckoutFormsBase);
