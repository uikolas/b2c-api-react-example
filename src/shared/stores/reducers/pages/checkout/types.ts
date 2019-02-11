import { IAddressItemCollection } from '@interfaces/addresses';
import { IPaymentMethod, IShipmentMethod } from '@interfaces/checkout';
import { IReduxState } from 'src/typings/app';
import { TOrderId } from '@interfaces/order';
import { IActionData } from 'src/shared/stores/reducers/types';
import {
    IBillingAddressState,
    IBillingSelectionState,
    ICheckoutCreditCardState,
    ICheckoutInvoiceState,
    ICheckoutStepsCompletionState,
    IDeliveryAddressState,
    IDeliverySelectionState
} from '@components/Pages/CheckoutPage/types';

export interface ICheckoutState extends IReduxState {
    deliverySelection: IDeliverySelectionState;
    billingSelection: IBillingSelectionState;
    deliveryNewAddress: IDeliveryAddressState;
    billingNewAddress: IBillingAddressState;
    stepsCompletion: ICheckoutStepsCompletionState;
    shipmentMethod: IShipmentMethod['id'] | null;
    paymentMethod: IPaymentMethod['paymentMethodName'] | null;
    paymentCreditCardData: ICheckoutCreditCardState;
    paymentInvoiceData: ICheckoutInvoiceState;
    data: ICheckoutStateData;
}

export interface IPageCheckoutAction extends IActionData {
    payloadSendFulfilled?: {
        orderId: TOrderId;
    };
    payloadGetFulfilled?: ICheckoutResponseData;
}

export interface ICheckoutResponseData {
    payments: IPaymentMethod[];
    shipments: IShipmentMethod[];
    addressesCollection: IAddressItemCollection[];
}

interface ICheckoutStateData extends ICheckoutResponseData {
    orderId: TOrderId;
}
