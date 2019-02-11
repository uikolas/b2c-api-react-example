import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import { connect } from './connect';
import { styles } from './styles';
import { ICheckoutPageProps, ICheckoutPageState } from './types';
import { CheckoutPageContext } from './context';
import {
    getCheckoutPanelsSettings,
    getAddressForm
} from './helpers';
import { AppMain } from 'src/shared/components/Common/AppMain';
import { CheckoutForms } from 'src/shared/components/Pages/CheckoutPage/CheckoutForms';
import { CheckoutCart } from 'src/shared/components/Pages/CheckoutPage/CheckoutCart';
import { OrderSuccess } from 'src/shared/components/Pages/CheckoutPage/OrderSuccess';
import {
    billingNewAddressDefault,
    billingSelectionDefault,
    deliveryNewAddressDefault,
    deliverySelectionDefault,
    paymentCreditCardDefault,
    paymentInvoiceDefault,
    stepCompletionCheckoutDefault
} from 'src/shared/components/Pages/CheckoutPage/constants/stateDefaults';
import { AppPageTitle } from 'src/shared/components/Common/AppPageTitle';
import { FormEvent } from '@interfaces/common/react';
import { IAddressItemCollection } from '@interfaces/addresses';
import { ICheckoutRequest } from '@interfaces/checkout';
import { FormattedMessage } from 'react-intl';

@connect
export class CheckoutPageBase extends React.Component<ICheckoutPageProps, ICheckoutPageState> {
    public state: ICheckoutPageState = {
        deliverySelection: {...deliverySelectionDefault},
        deliveryNewAddress: {...deliveryNewAddressDefault},
        billingSelection: {...billingSelectionDefault},
        billingNewAddress: {...billingNewAddressDefault},
        stepsCompletion: {...stepCompletionCheckoutDefault},
        shipmentMethod: null,
        paymentMethod: null,
        paymentCreditCardData: {...paymentCreditCardDefault},
        paymentInvoiceData: {...paymentInvoiceDefault}
    };

    public componentDidMount() {
        if (this.props.isUserLoggedIn) {
            this.props.getCheckoutData({idCart: this.props.cartId}, '');
        } else {
            this.props.getCheckoutData({idCart: this.props.cartId}, this.props.anonymId);
        }
    }

    public componentDidUpdate = (prevProps: ICheckoutPageProps, prevState: ICheckoutPageState) => {
        // If we get saved addressesCollection
        if (!prevProps.isCheckoutFulfilled && this.props.isCheckoutFulfilled) {
            if (!this.props.profile && this.props.isUserLoggedIn && this.props.customerReference) {
                this.props.getCustomerData(this.props.customerReference);
            }
        }
    };

    public handleSubmit = (event: FormEvent): void => {
        event.preventDefault();
        const {
            deliverySelection,
            billingSelection,
            deliveryNewAddress,
            billingNewAddress,
            paymentMethod,
            shipmentMethod
        } = this.state;
        const {
            addressesCollection,
            isUserLoggedIn,
            cartId,
            sendCheckoutData,
            profile,
            anonymId
        } = this.props;

        const payload: ICheckoutRequest = {};

        if (deliverySelection.isAddNew) {
            payload.shippingAddress = getAddressForm(deliveryNewAddress);
        } else {
            const shippingAddress = addressesCollection.find((address: IAddressItemCollection) =>
                address.id === deliverySelection.selectedAddressId);
            payload.shippingAddress = {...shippingAddress, country: ''};
        }

        if (billingSelection.isAddNew) {
            payload.billingAddress = getAddressForm(billingNewAddress);
        } else if (billingSelection.isSameAsDelivery) {
            payload.billingAddress = payload.shippingAddress;
        } else {
            const billingAddress = addressesCollection.find((address: IAddressItemCollection) =>
                address.id === deliverySelection.selectedAddressId);
            payload.billingAddress = {...billingAddress, country: ''};
        }

        payload.idCart = cartId;

        payload.payments = [{
            paymentProviderName: 'DummyPayment',
            paymentMethodName: paymentMethod
        }];

        payload.shipment = {idShipmentMethod: parseInt(shipmentMethod, 10)};

        if (isUserLoggedIn) {
            payload.customer = {
                email: profile.email,
                salutation: profile.salutation,
                firstName: profile.firstName,
                lastName: profile.lastName
            };

            sendCheckoutData(payload, '');
        } else {
            payload.customer = {
                email: payload.shippingAddress.email,
                salutation: payload.shippingAddress.salutation,
                firstName: payload.shippingAddress.firstName,
                lastName: payload.shippingAddress.lastName
            };

            sendCheckoutData(payload, anonymId);
        }
    };

    private checkCheckoutFormValidity = (): boolean => {
        const {first, second, third, fourth} = this.props.stepsCompletion;

        return first && second && third && fourth;
    };

    public render(): JSX.Element {
        const {
            classes,
            isProductsExists,
            orderId,
            isUserLoggedIn,
            anonymId,
            stepsCompletion
        } = this.props;

        return (
            <AppMain>
                {!isProductsExists && !orderId
                    ? <AppPageTitle title={<FormattedMessage id={'no.products.in.checkout.title'} />} />
                    : <CheckoutPageContext.Provider
                        value={{
                            submitHandler: this.handleSubmit,
                        }}
                    >
                        <Grid container className={classes.container}>
                            <Grid item xs={12} md={7} className={classes.leftColumn}>
                                {orderId
                                    ? <OrderSuccess order={orderId} />
                                    : <CheckoutForms
                                        panels={getCheckoutPanelsSettings(stepsCompletion)}
                                    />
                                }
                            </Grid>
                            <Grid item xs={12} md={5} className={classes.rightColumn}>
                                <CheckoutCart
                                    isSendBtnDisabled={!this.checkCheckoutFormValidity()}
                                    sendData={this.handleSubmit}
                                    order={orderId}
                                    isUserLoggedIn={isUserLoggedIn}
                                    anonymId={anonymId}
                                />
                            </Grid>
                        </Grid>
                    </CheckoutPageContext.Provider>
                }
            </AppMain>
        );
    }
}

export const CheckoutPage = withStyles(styles)(CheckoutPageBase);
export default CheckoutPage;
