import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import { IDeliveryFormProps } from './types';
import { formStyles } from '@components/Pages/CheckoutPage/CheckoutForms/styles';
import { CheckoutPageContext } from '../../context';
import { SprykerForm } from '@components/UI/SprykerForm';
import {
    getAddressFormSettings
} from '@components/Pages/CheckoutPage/CheckoutForms/settings/addressSettings';
import {
    getDeliverySavedAddressFormSettings
} from '@components/Pages/CheckoutPage/CheckoutForms/settings/savedAddressSettings';
import { AppPageSubTitle } from '@components/Common/AppPageSubTitle';
import { checkoutFormsNames, checkoutSelectionInputs } from '@components/Pages/CheckoutPage/constants';
import {
    IAddressParams,
    IDeliveryAddressesParams
} from '@components/Pages/CheckoutPage/types/formSettingsTypes';
import { deliveryConfigInputStable } from '@components/Pages/CheckoutPage/constants/inputsConfig';
import { FormattedMessage } from 'react-intl';
import { InputChangeEvent } from '@interfaces/common/react';
import { InputSaveErrorMessage } from '../../../../../translation';
import {
    validateDeliveryInput,
    validateDeliveryNewAddressForm
} from '@components/Pages/CheckoutPage/helpers/validation';
import { IAddressItemCollection } from '@interfaces/addresses';
import { connect } from './connect';
import { getDefaultAddressId, getExtraOptionsToSelection } from '@components/Pages/CheckoutPage/helpers';

@connect
export class DeliveryFormBase extends React.Component<IDeliveryFormProps> {
    public componentDidUpdate = (prevProps: any, prevState: any) => {
        if (!prevProps.isCheckoutFulfilled && this.props.isCheckoutFulfilled) {
            this.setDefaultAddresses();
        }
    };

    private handleDeliverySelection = (value: string): void => {
        const {
            mutateStateDeliverySelectionAddNew,
            mutateStateDeliverySelectionAddressId
        } = this.props;

        if (value === checkoutSelectionInputs.isAddNewDeliveryValue) {
            mutateStateDeliverySelectionAddNew();
            this.handleDeliveryNewAddressValidity();
        } else {
            mutateStateDeliverySelectionAddressId(value);
        }
    };

    private setDefaultAddresses = (): void => {
        const defaultValueDelivery = getDefaultAddressId(this.props.addressesCollection, 'delivery');
        if (defaultValueDelivery) {
            this.handleDeliverySelection(defaultValueDelivery);
        } else {
            this.handleDeliverySelection(checkoutSelectionInputs.isAddNewDeliveryValue);
        }
    };

    public handleDeliveryInputs = (event: InputChangeEvent): void => {
        const {name, value} = event.target;
        const {
            mutateStateNewAddressDelivery,
            deliveryNewAddress
        } = this.props;

        if (!deliveryNewAddress.hasOwnProperty(name)) {
            throw new Error(InputSaveErrorMessage);
        }

        const isInputValid = validateDeliveryInput(name, value);
        const changedFiledData = {
            key: name,
            value,
            isError: !isInputValid
        };

        mutateStateNewAddressDelivery(changedFiledData);

        const isSelectChanged = name === deliveryConfigInputStable.salutation.inputName
            || name === deliveryConfigInputStable.country.inputName;

        if (isSelectChanged) {
            this.handleDeliveryNewAddressValidity();
        }
    };

    private handleDeliveryNewAddressValidity = (): void => {
        const {mutateDeliveryStep} = this.props;
        const newAddress = {...this.props.deliveryNewAddress};

        if (this.props.isUserLoggedIn) {
            delete newAddress.email;
        }
        const isFormValid = validateDeliveryNewAddressForm(newAddress);
        mutateDeliveryStep(isFormValid);
    };

    public handleSelectionsChange = (event: InputChangeEvent): void => {
        const {value} = event.target;

        this.handleDeliverySelection(value);
    };

    private getCurrentValueDeliverySelection = (): IAddressItemCollection['id'] | string | null => (
        this.props.deliverySelection.selectedAddressId
        || (this.props.deliverySelection.isAddNew && checkoutSelectionInputs.isAddNewDeliveryValue)
        || null
    );

    public render(): JSX.Element {
        const {
            classes,
            addressesCollection,
            isUserLoggedIn,
            isAddressesCollectionExist,
            isCheckoutFulfilled,
            countriesCollection,
            deliverySelection: {
                isAddNew
            }
        } = this.props;

        return (
            <CheckoutPageContext.Consumer>
                {({
                      submitHandler
                  }) => {

                    const deliveryParams: IAddressParams = {
                        inputsData: this.props.deliveryNewAddress,
                        inputsConfig: deliveryConfigInputStable,
                        countriesCollection,
                        submitHandler,
                        inputChangeHandler: this.handleDeliveryInputs,
                        onBlurHandler: this.handleDeliveryNewAddressValidity
                    };
                    const savedDeliveryParams: IDeliveryAddressesParams = {
                        currentValueInSelection: this.getCurrentValueDeliverySelection(),
                        addressesCollection,
                        extraOptionsToSelection: getExtraOptionsToSelection(
                            isAddressesCollectionExist,
                            'delivery'
                        ),
                        submitHandler,
                        inputChangeHandler: this.handleSelectionsChange
                    };
                    const deliveryFormSettings = getAddressFormSettings(
                        checkoutFormsNames.delivery,
                        deliveryParams,
                        isUserLoggedIn
                    );

                    const savedAddressFormSettings = getDeliverySavedAddressFormSettings(
                        checkoutFormsNames.savedDelivery,
                        savedDeliveryParams
                    );

                    return (
                        <Grid container className={classes.root}>
                            <Grid item xs={12}>
                                {!isCheckoutFulfilled
                                    ? <AppPageSubTitle
                                        title={<FormattedMessage id={'form.waiting.for.response.title'} />}
                                    />
                                    : <React.Fragment>
                                        {(addressesCollection && addressesCollection.length) &&
                                        <SprykerForm form={savedAddressFormSettings} />
                                        }
                                        {(isAddNew || !isUserLoggedIn) &&
                                            <SprykerForm form={deliveryFormSettings} />
                                        }
                                    </React.Fragment>
                                }
                            </Grid>
                        </Grid>
                    );
                }}
            </CheckoutPageContext.Consumer>
        );
    }
};

export const DeliveryForm = withStyles(formStyles)(DeliveryFormBase);
