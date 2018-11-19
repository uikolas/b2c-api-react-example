import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import { formStyles } from './styles';
import {ICheckoutFormsProps, IPanelData} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/types";
import {DeliveryForm} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/DeliveryForm/index";
import {FormWrapper} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/FormWrapper/index";
import {BillingForm} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/BillingForm/index";


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
          isOpen={panels.first.isOpen}
        >
          <DeliveryForm />
        </FormWrapper>
        <FormWrapper
          title={panels.second.title}
          isDisabled={panels.second.isDisabled}
          isOpen={panels.second.isOpen}
        >
          <BillingForm />
        </FormWrapper>
        <FormWrapper
          title={panels.third.title}
          isDisabled={panels.third.isDisabled}
          isOpen={panels.third.isOpen}
        >
          First
        </FormWrapper>
        <FormWrapper
          title={panels.fourth.title}
          isDisabled={panels.fourth.isDisabled}
          isOpen={panels.fourth.isOpen}
        >
          second
        </FormWrapper>
      </Grid>
    </Grid>
  );
};

export const CheckoutForms = withStyles(formStyles)(CheckoutFormsBase);
