import * as React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import {IBillingFormProps} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/BillingForm/types";
import {CheckoutPageContext} from '../../context';
import {formStyles} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/styles";
import {SprykerForm} from "src/shared/components/UI/SprykerForm/index";
import {getAddressFormSettings} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/settings/addressSettings";
import {
  getSameAsDeliveryFormSettings
} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/settings/sameAsDeliverySettings";


export const BillingFormBase: React.SFC<IBillingFormProps> = (props): JSX.Element => {
  const {
    classes,
    addressData,
    selectedAddressId,
    extraAddressesOptions,
  }  = props;

  return (
    <CheckoutPageContext.Consumer>
      {({submitHandler, inputChangeHandler, billingSameAsDeliveryHandler, isBillingSameAsDelivery}) => {
        const billingParams = {
          addressData,
          submitHandler,
          inputChangeHandler,
        };
        const sameAsDeliveryParams = {
          sameAsDeliveryData: {
            isSameAsDelivery: isBillingSameAsDelivery,
          },
          submitHandler,
          inputChangeHandler: billingSameAsDeliveryHandler,
        };
        const billingFormSettings = getAddressFormSettings('billing', billingParams);
        const sameAsDeliveryFormSettings = getSameAsDeliveryFormSettings('sameAsDeliveryForm', sameAsDeliveryParams);
        return (
          <Grid container className={classes.root}>
            <Grid item xs={ 12 }>
              <SprykerForm form={sameAsDeliveryFormSettings} />
              <SprykerForm form={billingFormSettings} />
            </Grid>
          </Grid>
        );
      }}
    </CheckoutPageContext.Consumer>
  );
};

export const BillingForm = withStyles(formStyles)(BillingFormBase);
