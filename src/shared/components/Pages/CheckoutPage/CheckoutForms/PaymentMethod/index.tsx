import * as React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import {CheckoutPageContext} from '../../context';
import {formStyles} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/styles";
import {SprykerForm} from "src/shared/components/UI/SprykerForm/index";
import {IPaymentMethodProps} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/PaymentMethod/types";


export const PaymentMethodBase: React.SFC<IPaymentMethodProps> = (props): JSX.Element => {
  const {
    classes,
  }  = props;

  return (
    <CheckoutPageContext.Consumer>
      {({
          submitHandler,
          selectionsChangeHandler,
          /*shipmentMethods,
          currentValueShipmentMethod,*/
      }) => {

        return (
          <Grid container className={classes.root}>
            <Grid item xs={12} className={classes.shipmentMethodsParentForms}>
              Hello
            </Grid>
          </Grid>
        );
      }}
    </CheckoutPageContext.Consumer>
  );
};

export const PaymentMethod = withStyles(formStyles)(PaymentMethodBase);
