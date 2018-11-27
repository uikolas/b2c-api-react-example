import * as React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import {IDeliveryFormProps} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/DeliveryForm/types";
import {formStyles} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/styles";
import {CheckoutPageContext} from '../../context';
import {SprykerForm} from "src/shared/components/UI/SprykerForm";
import {getAddressFormSettings} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/settings/addressSettings";
import {
  getDeliverySavedAddressFormSettings
} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/settings/savedAddressSettings";
import {FormTextWaitingForResponse} from "src/shared/constants/forms/labels";

import {AppPageSubTitle} from "src/shared/components/Common/AppPageSubTitle";
import {checkoutFormsNames} from "src/shared/components/Pages/CheckoutPage/constants";
import {
  IAddressParams,
  IDeliveryAddressesParams
} from "src/shared/components/Pages/CheckoutPage/types/formSettingsTypes";
import {deliveryConfigInputStable} from "src/shared/components/Pages/CheckoutPage/constants/inputsConfig";


export const DeliveryFormBase: React.SFC<IDeliveryFormProps> = (props): JSX.Element => {
  const {
    classes,
  }  = props;

  return (
    <CheckoutPageContext.Consumer>
      {({
          submitHandler,
          onBlurHandler,
          selectionsChangeHandler,
          handleDeliveryInputs,
          deliveryNewAddress,
          deliverySelections,
          currentValueDeliverySelection,
          addressesCollection,
          extraOptionsDeliverySelection,
          isCheckoutFulfilled,
          isUserLoggedIn,
          countriesCollection,
      }) => {
        const deliveryParams: IAddressParams = {
          inputsData: deliveryNewAddress,
          inputsConfig: deliveryConfigInputStable,
          countriesCollection,
          submitHandler,
          inputChangeHandler: handleDeliveryInputs,
          onBlurHandler: onBlurHandler(checkoutFormsNames.delivery),
        };
        const savedDeliveryParams: IDeliveryAddressesParams = {
          currentValueInSelection: currentValueDeliverySelection,
          addressesCollection,
          extraOptionsToSelection: extraOptionsDeliverySelection,
          submitHandler,
          inputChangeHandler: selectionsChangeHandler,
        };
        const deliveryFormSettings = getAddressFormSettings(checkoutFormsNames.delivery, deliveryParams);
        const savedAddressFormSettings = getDeliverySavedAddressFormSettings(checkoutFormsNames.savedDelivery,
                                                                             savedDeliveryParams
        );
        const selectionForm = <SprykerForm form={savedAddressFormSettings} />;
        const inputsForm = <SprykerForm form={deliveryFormSettings} />;

        return (
          <Grid container className={ classes.root }>
            <Grid item xs={12}>
              { isUserLoggedIn
                ? (!isCheckoutFulfilled)
                  ? <AppPageSubTitle title={FormTextWaitingForResponse} />
                  : <React.Fragment>
                    {addressesCollection ? selectionForm : inputsForm}
                    {deliverySelections.isAddNew ? inputsForm : null}
                  </React.Fragment>
                : inputsForm
              }
            </Grid>
          </Grid>
        );
      }}
    </CheckoutPageContext.Consumer>
  );
};

export const DeliveryForm = withStyles(formStyles)(DeliveryFormBase);
