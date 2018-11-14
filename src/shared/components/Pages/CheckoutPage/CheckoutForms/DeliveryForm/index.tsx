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


export const DeliveryFormBase: React.SFC<IDeliveryFormProps> = (props): JSX.Element => {
  const {
    classes,
    addressData,
    selectedAddressId,
    addressesCollection,
    extraAddressesOptions,
    isAddNewDelivery,
  }  = props;

  console.log('DeliveryFormBase selectedAddressId', selectedAddressId);
  console.log('DeliveryFormBase addressesCollection', addressesCollection);

  return (
    <CheckoutPageContext.Consumer>
      {({submitHandler, inputChangeHandler}) => {
        const deliveryParams = {addressData, submitHandler, inputChangeHandler};
        const savedDeliveryParams = {
          selectedAddressId,
          addressesCollection,
          extraAddressesOptions,
          submitHandler,
          inputChangeHandler
        };
        const deliveryFormSettings = getAddressFormSettings('delivery', deliveryParams);
        const savedAddressFormSettings = getDeliverySavedAddressFormSettings('savedDelivery', savedDeliveryParams);
        return (
          <Grid container className={ classes.root }>
            <Grid item xs={ 12 }>
              {addressesCollection
                ? <SprykerForm form={savedAddressFormSettings} />
                : <SprykerForm form={deliveryFormSettings} />
              }
            </Grid>
          </Grid>
        );
      }}
    </CheckoutPageContext.Consumer>
  );
};

export const DeliveryForm = withStyles(formStyles)(DeliveryFormBase);
