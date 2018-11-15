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


export const DeliveryFormBase: React.SFC<IDeliveryFormProps> = (props): JSX.Element => {
  const {
    classes,
  }  = props;

  return (
    <CheckoutPageContext.Consumer>
      {({
          submitHandler,
          inputChangeHandler,
          deliveryAddress,
          selections,
          addressesCollection,
          extraAddressesOptions,
          isAddressesFulfilled,
          isUserLoggedIn,
      }) => {
        const deliveryParams = {addressData: deliveryAddress, submitHandler, inputChangeHandler};
        const savedDeliveryParams = {
          selections: selections.delivery,
          addressesCollection,
          extraAddressesOptions: extraAddressesOptions.delivery,
          submitHandler,
          inputChangeHandler
        };
        const deliveryFormSettings = getAddressFormSettings('delivery', deliveryParams);
        const savedAddressFormSettings = getDeliverySavedAddressFormSettings('savedDelivery', savedDeliveryParams);
        const selectionForm = <SprykerForm form={savedAddressFormSettings} />;
        const inputsForm = <SprykerForm form={deliveryFormSettings} />;

        return (
          <Grid container className={ classes.root }>
            <Grid item xs={ 12 }>
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
