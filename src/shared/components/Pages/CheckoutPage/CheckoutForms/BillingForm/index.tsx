import * as React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import {IBillingFormProps} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/BillingForm/types";
import {CheckoutPageContext} from '../../context/index';
import {formStyles} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/styles";
import {SprykerForm} from "src/shared/components/UI/SprykerForm/index";
import {getAddressFormSettings} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/settings/addressSettings";
import {
  getSameAsDeliveryFormSettings
} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/settings/sameAsDeliverySettings";
import {
  getBillingSavedAddressFormSettings
} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/settings/savedAddressSettings";
import {FormTextWaitingForResponse} from "src/shared/constants/forms/labels";
import {AppPageSubTitle} from "src/shared/components/Common/AppPageSubTitle/index";
import {billingConfigInputStable, checkoutInputsFormNames} from "src/shared/components/Pages/CheckoutPage/constants";
import {
  IAddressParams, IBillingAddressesParams,
  ISameAsDeliveryParams
} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/settings/types";


export const BillingFormBase: React.SFC<IBillingFormProps> = (props): JSX.Element => {
  const {
    classes,
  }  = props;

  return (
    <CheckoutPageContext.Consumer>
      {({
          submitHandler,
          onBlurHandler,
          selectionsChangeHandler,
          handleBillingInputs,
          isBillingSameAsDelivery,
          billingNewAddress,
          selections,
          currentValuesInSelections,
          addressesCollection,
          extraAddressesOptions,
          isAddressesFulfilled,
          isUserLoggedIn,
          countriesCollection
      }) => {
        const billingParams: IAddressParams = {
          addressData: billingNewAddress,
          addressInputsConfig: billingConfigInputStable,
          countriesCollection,
          submitHandler,
          inputChangeHandler: handleBillingInputs,
          onBlurHandler: onBlurHandler(checkoutInputsFormNames.billing),
        };
        const sameAsDeliveryParams: ISameAsDeliveryParams = {
          isSameAsDelivery: isBillingSameAsDelivery,
          submitHandler,
          inputChangeHandler: selectionsChangeHandler,
        };
        const savedBillingParams: IBillingAddressesParams = {
          currentValueInSelection: currentValuesInSelections.billing,
          addressesCollection,
          extraAddressesOptions: extraAddressesOptions.billing,
          submitHandler,
          inputChangeHandler: selectionsChangeHandler,
        };
        const billingFormSettings = getAddressFormSettings(checkoutInputsFormNames.billing, billingParams);
        const sameAsDeliveryFormSettings = getSameAsDeliveryFormSettings('sameAsDeliveryForm', sameAsDeliveryParams);
        const savedAddressFormSettings = getBillingSavedAddressFormSettings('savedBilling', savedBillingParams);

        const inputsForm = isBillingSameAsDelivery ? null : <SprykerForm form={billingFormSettings} />;
        const sameAsDeliveryForm = <SprykerForm form={sameAsDeliveryFormSettings} />;
        const selectionForm = <SprykerForm form={savedAddressFormSettings} />;

        return (
          <Grid container className={classes.root}>
            <Grid item xs={12}>
              { isUserLoggedIn
                ? (!isAddressesFulfilled)
                  ? <AppPageSubTitle title={FormTextWaitingForResponse} />
                  : <React.Fragment>
                    {addressesCollection ? selectionForm : [sameAsDeliveryForm, inputsForm]}
                    {selections.billing.isAddNew ? inputsForm : null}
                  </React.Fragment>
                : [sameAsDeliveryForm, inputsForm]
              }
            </Grid>
          </Grid>
        );
      }}
    </CheckoutPageContext.Consumer>
  );
};

export const BillingForm = withStyles(formStyles)(BillingFormBase);
