import * as React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import {IDeliveryFormProps} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/DeliveryForm/types";
import {formStyles} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/styles";
import {CheckoutPageContext} from '../../context';
import {SprykerForm} from "src/shared/components/UI/SprykerForm/index";
import {getAddressFormSettings} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/settings/addressSettings";
import {
  getDeliverySavedAddressFormSettings
} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/settings/savedAddressSettings";
import {FormTextWaitingForResponse} from "src/shared/constants/forms/labels";
import {AppPageSubTitle} from "src/shared/components/Common/AppPageSubTitle/index";
import {checkoutInputsFormNames, deliveryConfigInputStable} from "src/shared/components/Pages/CheckoutPage/constants";


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
          selections,
          currentValuesInSelections,
          addressesCollection,
          extraAddressesOptions,
          isAddressesFulfilled,
          isUserLoggedIn,
          countriesCollection,
      }) => {
        const deliveryParams = {
          addressData: deliveryNewAddress,
          addressInputsConfig: deliveryConfigInputStable,
          countriesCollection,
          submitHandler,
          inputChangeHandler: handleDeliveryInputs,
          onBlurHandler: onBlurHandler(checkoutInputsFormNames.delivery),
        };
        const savedDeliveryParams = {
          currentValueInSelection: currentValuesInSelections.delivery,
          addressesCollection,
          extraAddressesOptions: extraAddressesOptions.delivery,
          submitHandler,
          inputChangeHandler: selectionsChangeHandler,
        };
        const deliveryFormSettings = getAddressFormSettings(checkoutInputsFormNames.delivery, deliveryParams);
        const savedAddressFormSettings = getDeliverySavedAddressFormSettings('savedDelivery', savedDeliveryParams);
        const selectionForm = <SprykerForm form={savedAddressFormSettings} />;
        const inputsForm = <SprykerForm form={deliveryFormSettings} />;

        return (
          <Grid container className={ classes.root }>
            <Grid item xs={12}>
              { isUserLoggedIn
                ? (!isAddressesFulfilled)
                  ? <AppPageSubTitle title={FormTextWaitingForResponse} />
                  : <React.Fragment>
                    {addressesCollection ? selectionForm : inputsForm}
                    {selections.delivery.isAddNew ? inputsForm : null}
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
