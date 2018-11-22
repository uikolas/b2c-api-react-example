import * as React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import {CheckoutPageContext} from '../../../context';
import {formStyles} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/styles";
import {SprykerForm} from "src/shared/components/UI/SprykerForm/index";
import {checkoutInputsFormNames, invoiceConfigInputStable} from "src/shared/components/Pages/CheckoutPage/constants";
import {IInvoicePaymentFormProps} from "./types";
import {getInvoiceFormSettings} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/settings/invoiceSettings";


export const InvoicePaymentFormBase: React.SFC<IInvoicePaymentFormProps> = (props): JSX.Element => {
  const {
    classes,
  }  = props;

  return (
    <CheckoutPageContext.Consumer>
      {({
          submitHandler,
          onBlurHandler,
          handleInvoiceInputs,
          paymentInvoiceDataInputs,
      }) => {
        const invoiceParams = {
          inputsData: paymentInvoiceDataInputs,
          inputsConfig: invoiceConfigInputStable,
          submitHandler,
          inputChangeHandler: handleInvoiceInputs,
          onBlurHandler: onBlurHandler(checkoutInputsFormNames.invoice),
        };

        const invoiceFormSettings = getInvoiceFormSettings(checkoutInputsFormNames.invoice, invoiceParams);

        return (
          <Grid container className={classes.root}>
            <Grid item xs={12}>
              <SprykerForm form={invoiceFormSettings} />
            </Grid>
          </Grid>
        );
      }}
    </CheckoutPageContext.Consumer>
  );
};

export const InvoicePaymentForm = withStyles(formStyles)(InvoicePaymentFormBase);
