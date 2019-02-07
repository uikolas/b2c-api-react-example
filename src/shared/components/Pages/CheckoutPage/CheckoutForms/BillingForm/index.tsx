import * as React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import { IBillingFormProps } from './types';
import { CheckoutPageContext } from '../../context';
import { formStyles } from '@components/Pages/CheckoutPage/CheckoutForms/styles';
import { SprykerForm } from '@components/UI/SprykerForm';
import {
    getAddressFormSettings
} from '@components/Pages/CheckoutPage/CheckoutForms/settings/addressSettings';
import {
    getSameAsDeliveryFormSettings
} from '@components/Pages/CheckoutPage/CheckoutForms/settings/sameAsDeliverySettings';
import {
    getBillingSavedAddressFormSettings
} from '@components/Pages/CheckoutPage/CheckoutForms/settings/savedAddressSettings';
import { AppPageSubTitle } from '@components/Common/AppPageSubTitle';
import { checkoutFormsNames } from '@components/Pages/CheckoutPage/constants';
import {
    IAddressParams,
    IBillingAddressesParams,
    ISameAsDeliveryParams
} from '@components/Pages/CheckoutPage/types/formSettingsTypes';
import { billingConfigInputStable } from '@components/Pages/CheckoutPage/constants/inputsConfig';
import { FormattedMessage } from 'react-intl';

export const BillingFormBase: React.SFC<IBillingFormProps> = (props): JSX.Element => {
    const {
        classes,
    } = props;

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
                isCheckoutFulfilled,
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

                const inputsForm = isBillingSameAsDelivery ? null :
                    <SprykerForm key="inputsForm" form={billingFormSettings}/>;
                const sameAsDeliveryForm = <SprykerForm key="sameAsDeliveryForm" form={sameAsDeliveryFormSettings}/>;
                const selectionForm = <SprykerForm key="selectionForm" form={savedAddressFormSettings}/>;

                return (
                    <Grid container className={classes.root}>
                        <Grid item xs={12}>
                            {isUserLoggedIn
                                ? (!isCheckoutFulfilled)
                                    ? <AppPageSubTitle
                                        title={<FormattedMessage id={ 'form.waiting.for.response.title' } />}/>
                                    : (<React.Fragment>
                                        {
                                            addressesCollection && addressesCollection.length ?
                                            selectionForm : sameAsDeliveryForm
                                        }
                                        {billingSelections.isAddNew && inputsForm}
                                    </React.Fragment>)
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
