import * as React from 'react';
import { connect } from './connect';
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
import { checkoutFormsNames, checkoutSelectionInputs } from '@components/Pages/CheckoutPage/constants';
import {
    IAddressParams,
    IBillingAddressesParams,
    ISameAsDeliveryParams
} from '@components/Pages/CheckoutPage/types/formSettingsTypes';
import { billingConfigInputStable } from '@components/Pages/CheckoutPage/constants/inputsConfig';
import { FormattedMessage } from 'react-intl';
import { InputChangeEvent } from '@interfaces/common/react';
import { InputSaveErrorMessage } from '../../../../../translation';
import { validateBillingInput, validateBillingNewAddressForm } from '@components/Pages/CheckoutPage/helpers/validation';
import { ICheckoutPageProps, ICheckoutPageState } from '@components/Pages/CheckoutPage/types';
import { getDefaultAddressId, getExtraOptionsToSelection } from '@components/Pages/CheckoutPage/helpers';
import { IAddressItemCollection } from '@interfaces/addresses';

@connect
export class BillingFormBase extends React.Component<IBillingFormProps> {
    public componentDidUpdate = (prevProps: ICheckoutPageProps, prevState: ICheckoutPageState) => {
        if (!prevProps.isCheckoutFulfilled && this.props.isCheckoutFulfilled) {
            this.setDefaultAddresses();
        }
    };

    private setDefaultAddresses = (): void => {
        const defaultValueBilling = getDefaultAddressId(this.props.addressesCollection, 'billing');
        if (defaultValueBilling) {
            this.handleBillingSelection(defaultValueBilling);
        } else {
            this.handleBillingSelection(checkoutSelectionInputs.isSameAsDeliveryValue);
        }
    };

    public handleBillingInputs = (event: InputChangeEvent): void => {
        const {name, value} = event.target;
        const {
            mutateStateNewAddressBilling,
            billingNewAddress
        } = this.props;

        if (!billingNewAddress.hasOwnProperty(name)) {
            throw new Error(InputSaveErrorMessage);
        }

        const isInputValid = validateBillingInput(name, value);
        const changedFiledData = {
            key: name,
            value,
            isError: !isInputValid
        };
        mutateStateNewAddressBilling(changedFiledData);

        const isSelectChanged = name === billingConfigInputStable.salutation.inputName
            || name === billingConfigInputStable.country.inputName;

        if (isSelectChanged) {
            this.handleBillingNewAddressValidity();
        }
    };

    private handleBillingNewAddressValidity = (): boolean => {
        const isFormValid = validateBillingNewAddressForm(this.props.billingNewAddress);
        const {mutateBillingStep} = this.props;
        mutateBillingStep(isFormValid);

        return isFormValid;
    };

    public handleSelectionsChange = (event: InputChangeEvent): void => {
        const {value} = event.target;

        this.handleBillingSelection(value);
    };

    private handleBillingSelection = (value: string): void => {
        const {
            mutateStateBillingSelectionSameAsDelivery,
            mutateStateBillingSelectionAddressId,
            mutateStateBillingSelectionAddNew
        } = this.props;

        if (value === checkoutSelectionInputs.isAddNewBillingValue) {
            mutateStateBillingSelectionAddNew();
        } else if (value === checkoutSelectionInputs.isSameAsDeliveryValue) {
            mutateStateBillingSelectionSameAsDelivery();
        } else {
            mutateStateBillingSelectionAddressId(value);
        }
    };

    private getCurrentValueBillingSelection = (): IAddressItemCollection['id'] | string | null => (
        this.props.billingSelection.selectedAddressId
        || (this.props.billingSelection.isAddNew && checkoutSelectionInputs.isAddNewBillingValue)
        || (this.props.billingSelection.isSameAsDelivery && checkoutSelectionInputs.isSameAsDeliveryValue)
        || null
    );

    public render(): JSX.Element {
        const {
            classes,
            billingNewAddress,
            addressesCollection,
            isAddressesCollectionExist,
            isCheckoutFulfilled,
            isUserLoggedIn,
            countriesCollection,
            billingSelection: {
                isAddNew,
                isSameAsDelivery
            }
        } = this.props;

        return (
            <CheckoutPageContext.Consumer>
                {({
                      submitHandler,
                  }) => {
                    const billingParams: IAddressParams = {
                        inputsData: billingNewAddress,
                        inputsConfig: billingConfigInputStable,
                        countriesCollection,
                        submitHandler,
                        inputChangeHandler: this.handleBillingInputs,
                        onBlurHandler: this.handleBillingNewAddressValidity
                    };
                    const sameAsDeliveryParams: ISameAsDeliveryParams = {
                        isSameAsDelivery,
                        submitHandler,
                        inputChangeHandler: this.handleSelectionsChange
                    };
                    const savedBillingParams: IBillingAddressesParams = {
                        currentValueInSelection: this.getCurrentValueBillingSelection(),
                        addressesCollection,
                        extraOptionsToSelection: getExtraOptionsToSelection(
                            isAddressesCollectionExist,
                            'billing'
                        ),
                        submitHandler,
                        inputChangeHandler: this.handleSelectionsChange
                    };
                    const billingFormSettings = getAddressFormSettings(checkoutFormsNames.billing, billingParams, true);
                    const sameAsDeliveryFormSettings = getSameAsDeliveryFormSettings(checkoutFormsNames.sameAsDeliveryForm,
                        sameAsDeliveryParams
                    );
                    const savedAddressFormSettings = getBillingSavedAddressFormSettings(checkoutFormsNames.savedBilling,
                        savedBillingParams
                    );

                    const inputsForm = isSameAsDelivery ? null :
                        <SprykerForm key="inputsForm" form={billingFormSettings} />;
                    const sameAsDeliveryForm = <SprykerForm key="sameAsDeliveryForm"
                                                            form={sameAsDeliveryFormSettings} />;
                    const selectionForm = <SprykerForm key="selectionForm" form={savedAddressFormSettings} />;

                    return (
                        <Grid container className={classes.root}>
                            <Grid item xs={12}>
                                {isUserLoggedIn
                                    ? (!isCheckoutFulfilled)
                                        ? <AppPageSubTitle
                                            title={<FormattedMessage id={'form.waiting.for.response.title'} />} />
                                        : (<React.Fragment>
                                            {
                                                addressesCollection && addressesCollection.length ?
                                                    selectionForm : sameAsDeliveryForm
                                            }
                                            {isAddNew && inputsForm}
                                        </React.Fragment>)
                                    : [sameAsDeliveryForm, inputsForm]
                                }
                            </Grid>
                        </Grid>
                    );
                }}
            </CheckoutPageContext.Consumer>
        );
    }
};

export const BillingForm = withStyles(formStyles)(BillingFormBase);
