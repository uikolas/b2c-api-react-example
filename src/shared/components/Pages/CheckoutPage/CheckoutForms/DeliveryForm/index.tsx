import * as React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import {IDeliveryFormProps} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/DeliveryForm/types";
import {formStyles} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/styles";
import {CheckoutPageContext} from '../../context';
import {SprykerForm} from "src/shared/components/UI/SprykerForm/index";
import {getAddressFormSettings} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/addressSettings";


export const DeliveryFormBase: React.SFC<IDeliveryFormProps> = (props): JSX.Element => {
  const {
    classes,
    addressData,
  }  = props;

  return (
    <CheckoutPageContext.Consumer>
      {({submitHandler, inputChangeHandler}) => {
        const params = {addressData, submitHandler, inputChangeHandler};
        const deliveryFormSettings = getAddressFormSettings('delivery', params);
        return (
          <Grid container className={ classes.root }>
            <Grid item xs={ 12 }>
              <SprykerForm form={deliveryFormSettings} />
            </Grid>
          </Grid>
        );
      }}
    </CheckoutPageContext.Consumer>
  );
};

export const DeliveryForm = withStyles(formStyles)(DeliveryFormBase);
