import * as React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import { SprykerForm } from 'src/shared/components/UI/SprykerForm';
import { FormTextWaitingForResponse } from 'src/shared/constants/forms/labels';

import { AppPageSubTitle } from 'src/shared/components/Common/AppPageSubTitle';
import {
  IAddressParams,
  IDeliveryAddressesParams,
} from '../../types/formSettingsTypes';
import { deliveryConfigInputStable } from '../../constants/inputsConfig';
import { checkoutFormsNames } from '../../constants';
import { CheckoutPageContext } from '../../context';
import { getAddressFormSettings } from '../settings/addressSettings';
import { getDeliverySavedAddressFormSettings } from '../settings/savedAddressSettings';
import { formStyles } from '../styles';
import { IDeliveryFormProps } from './types';

export const DeliveryFormBase: React.SFC<IDeliveryFormProps> = (props): JSX.Element => {
  const {
    classes,
  } = props;

  return (
    <CheckoutPageContext.Consumer>
      { ({
           submitHandler,
           onBlurHandler,
           selectionsChangeHandler,
           handleDeliveryInputs,
           deliveryNewAddress,
           deliverySelections,
           currentValueDeliverySelection,
           addressesCollection,
           extraOptionsDeliverySelection,
           isAddressesFulfilled,
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
          savedDeliveryParams,
        );
        const selectionForm = <SprykerForm form={ savedAddressFormSettings }/>;
        const inputsForm = <SprykerForm form={ deliveryFormSettings }/>;

        return (
          <Grid container className={ classes.root }>
            <Grid item xs={ 12 }>
              { isUserLoggedIn
                ? (!isAddressesFulfilled)
                  ? <AppPageSubTitle title={ FormTextWaitingForResponse }/>
                  : (
                    <React.Fragment>
                      { addressesCollection ? selectionForm : inputsForm }
                      { deliverySelections.isAddNew ? inputsForm : null }
                    </React.Fragment>
                  )
                : inputsForm
              }
            </Grid>
          </Grid>
        );
      } }
    </CheckoutPageContext.Consumer>
  );
};

export const DeliveryForm = withStyles(formStyles)(DeliveryFormBase);
