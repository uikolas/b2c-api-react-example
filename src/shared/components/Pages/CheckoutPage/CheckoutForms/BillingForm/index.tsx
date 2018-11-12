import * as React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import {IBillingFormProps} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/BillingForm/types";
import {formStyles} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/styles";
import {SprykerForm} from "src/shared/components/UI/SprykerForm/index";
import {getAddressFormSettings} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/addressSettings";


export const BillingFormBase: React.SFC<IBillingFormProps> = (props): JSX.Element => {
  const {
    classes,
    addressData,
    submitHandler,
    inputChangeHandler,
  }  = props;

  const params = {addressData, submitHandler, inputChangeHandler};
  const billingFormSettings = getAddressFormSettings('billing', params);

  return (
    <Grid container className={ classes.root }>
      <Grid item xs={ 12 }>
        <SprykerForm form={billingFormSettings} />
      </Grid>
    </Grid>
  );
};

export const BillingForm = withStyles(formStyles)(BillingFormBase);
