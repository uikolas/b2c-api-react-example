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
import { IFormField } from '@components/UI/SprykerForm/types';
import { FormattedMessage } from 'react-intl';
import { InputChangeEvent } from '@interfaces/common/react';
import { InputSaveErrorMessage } from '../../../../../translation';
import {
    validateDeliveryInput,
    validateDeliveryNewAddressForm
} from '@components/Pages/CheckoutPage/helpers/validation';
import { ICheckoutPageState } from '@components/Pages/CheckoutPage/types';
import { mutateDeliveryInputs } from '@components/Pages/CheckoutPage/stateMutations/inputs';
import { mutateDeliveryNewAddressValidity } from '@components/Pages/CheckoutPage/stateMutations/validity';
import {
    mutateDeliverySelectionAddNew,
    mutateDeliverySelectionAddressId
} from '@components/Pages/CheckoutPage/stateMutations/selections';
import { IAddressItemCollection } from '@interfaces/addresses';
import { connect } from './connect';
import { getExtraOptionsToSelection } from '@components/Pages/CheckoutPage/helpers';

@connect
export class DeliveryFormBase extends React.Component<any, any> {
    public readonly state: any = {
        test: this.props.isUserLoggedIn,
        deliverySelection: {
            selectedAddressId: null,
            isAddNew: false
        },
        deliveryNewAddress: {
            firstName: {
                value: '',
                isError: false
            },
            lastName: {
                value: '',
                isError: false
            },
            salutation: {
                value: ' ',
                isError: false
            },
            address1: {
                value: '',
                isError: false
            },
            address2: {
                value: '',
                isError: false
            },
            address3: {
                value: '',
                isError: false
            },
            email: {
                value: '',
                isError: false
            },
            zipCode: {
                value: '',
                isError: false
            },
            city: {
                value: '',
                isError: false
            },
            country: {
                value: ' ',
                isError: false
            },
            company: {
                value: '',
                isError: false
            },
            phone: {
                value: '',
                isError: false
            }
        }
    };

    public handleDeliveryInputs = (event: InputChangeEvent): void => {
        const {name, value} = event.target;

        if (!this.state.deliveryNewAddress.hasOwnProperty(name)) {
            throw new Error(InputSaveErrorMessage);
        }
        const isInputValid = validateDeliveryInput(name, value);
        const payload = {
            key: name,
            value,
            isError: !isInputValid
        };

        this.props.mutateStateDelivery(payload);
        // console.log(this.props.deliveryNewAddress);

        this.setState((prevState: ICheckoutPageState) => (
            mutateDeliveryInputs(prevState, name, value, !isInputValid)
        ), () => {
            // Validate form when select input is changed
            if (name === deliveryConfigInputStable.salutation.inputName
                || name === deliveryConfigInputStable.country.inputName
            ) {
                this.handleDeliveryNewAddressValidity();
            }
        });
    };

    private handleDeliveryNewAddressValidity = (): void => {
        const newAddress = this.props.deliveryNewAddress;
        console.log(newAddress);
        // if (this.props.isUserLoggedIn) {
        //     delete newAddress.email;
        // }
        const isFormValid = validateDeliveryNewAddressForm(newAddress);
        this.setState((prevState: ICheckoutPageState) => (
            mutateDeliveryNewAddressValidity(prevState, isFormValid)
        ));
    };

    public handleSelectionsChange = (event: InputChangeEvent): void => {
        const {value} = event.target;
        if (value === checkoutSelectionInputs.isAddNewDeliveryValue) {
            this.setState((prevState: ICheckoutPageState) => (
                mutateDeliverySelectionAddNew(prevState)
            ));
        } else {
            this.setState((prevState: ICheckoutPageState) => (
                mutateDeliverySelectionAddressId(prevState, value)
            ));
        }
    };

    private getCurrentValueDeliverySelection = (): IAddressItemCollection['id'] | string | null => (
        this.state.deliverySelection.selectedAddressId
        || (this.state.deliverySelection.isAddNew && checkoutSelectionInputs.isAddNewDeliveryValue)
        || null
    );

    public render() {
        const {
            classes,
            addressesCollection,
            isUserLoggedIn,
            isAddressesCollectionExist,
            isCheckoutFulfilled,
            countriesCollection
        } = this.props;

        return (
            <CheckoutPageContext.Consumer>
                {({
                      submitHandler,
                      onBlurHandler
                  }) => {

                    const deliveryParams: IAddressParams = {
                        inputsData: this.props.deliveryNewAddress,
                        inputsConfig: deliveryConfigInputStable,
                        countriesCollection,
                        submitHandler,
                        inputChangeHandler: this.handleDeliveryInputs,
                        onBlurHandler: onBlurHandler(checkoutFormsNames.delivery)
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
                                {isUserLoggedIn
                                    ? (!isCheckoutFulfilled)
                                        ? <AppPageSubTitle
                                            title={<FormattedMessage id={'form.waiting.for.response.title'} />}
                                        />
                                        : <React.Fragment>
                                            {(addressesCollection && addressesCollection.length) &&
                                                <SprykerForm form={savedAddressFormSettings} />
                                            }
                                            {this.state.deliverySelection.isAddNew &&
                                                <SprykerForm form={deliveryFormSettings} />
                                            }
                                        </React.Fragment>
                                    : <SprykerForm form={deliveryFormSettings} />
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
