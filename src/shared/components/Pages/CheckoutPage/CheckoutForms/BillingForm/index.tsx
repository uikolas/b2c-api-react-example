import * as React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import {IBillingFormProps} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/BillingForm/types";
import {CheckoutPageContext} from '../../context';
import {formStyles} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/styles";
import {SprykerForm} from "src/shared/components/UI/SprykerForm";
import {getAddressFormSettings} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/settings/addressSettings";
import {
  getSameAsDeliveryFormSettings
} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/settings/sameAsDeliverySettings";
import {
  getBillingSavedAddressFormSettings
} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/settings/savedAddressSettings";
import {FormTextWaitingForResponse} from "src/shared/constants/forms/labels";

import {AppPageSubTitle} from "src/shared/components/Common/AppPageSubTitle";
import {checkoutFormsNames} from "src/shared/components/Pages/CheckoutPage/constants";
import {
  IAddressParams,
  IBillingAddressesParams,
  ISameAsDeliveryParams
} from "src/shared/components/Pages/CheckoutPage/types/formSettingsTypes";
import {billingConfigInputStable} from "src/shared/components/Pages/CheckoutPage/constants/inputsConfig";


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
          billingSelections,
          currentValueBillingSelection,
          addressesCollection,
          extraOptionsBillingSelection,
          isAddressesFulfilled,
          isUserLoggedIn,
          countriesCollection
      }) => {
        const billingParams: IAddressParams = {
          inputsData: billingNewAddress,
          inputsConfig: billingConfigInputStable,
          countriesCollection,
          submitHandler,
          inputChangeHandler: handleBillingInputs,
          onBlurHandler: onBlurHandler(checkoutFormsNames.billing),
        };
        const sameAsDeliveryParams: ISameAsDeliveryParams = {
          isSameAsDelivery: isBillingSameAsDelivery,
          submitHandler,
          inputChangeHandler: selectionsChangeHandler,
        };
        const savedBillingParams: IBillingAddressesParams = {
          currentValueInSelection: currentValueBillingSelection,
          addressesCollection,
          extraOptionsToSelection: extraOptionsBillingSelection,
          submitHandler,
          inputChangeHandler: selectionsChangeHandler,
        };
        const billingFormSettings = getAddressFormSettings(checkoutFormsNames.billing, billingParams);
        const sameAsDeliveryFormSettings = getSameAsDeliveryFormSettings(checkoutFormsNames.sameAsDeliveryForm,
                                                                         sameAsDeliveryParams
                                                                         );
        const savedAddressFormSettings = getBillingSavedAddressFormSettings(checkoutFormsNames.savedBilling,
                                                                            savedBillingParams
                                                                            );

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
                    {billingSelections.isAddNew ? inputsForm : null}
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
