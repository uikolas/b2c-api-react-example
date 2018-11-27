import produce from 'immer';
import {
  CHECKOUT_DATA_INIT_REQUEST,
  SEND_CHECKOUT_DATA,
} from 'src/shared/constants/ActionTypes/Pages/Checkout';
import {
  IReduxState,
} from 'src/typings/app';
import {IAddressItem, IAddressItemCollection} from "src/shared/interfaces/addresses";
import {
  IPaymentMethod,
  IShipmentMethod,
} from 'src/shared/interfaces/checkout';

export interface ICheckoutState extends IReduxState {
  data: {
    billingAddress: IAddressItem | null;
    deliveryAddress: IAddressItem | null;
    payments: Array<IPaymentMethod>;
    shipments: Array<IShipmentMethod>;
    addressesCollection: Array<IAddressItemCollection>;
  };
}

const addressesCollectionFixture: Array<IAddressItemCollection> = [
  {
    "id": "dd1ddd99-1315-5eae-aaaf-9e74f78a33d52",
    "salutation": "Mr",
    "firstName": "spencor",
    "lastName": "hopkin",
    "address1": "West road",
    "address2": "212",
    "address3": "",
    "zipCode": "61000",
    "city": "Berlin",
    "country": {
      "id_country": 60,
      "iso2_code": "DE",
      "iso3_code": "DEU",
      "name": "Germany",
      "postal_code_mandatory": true,
      "postal_code_regex": "\\d{5}",
      "regions": {}
    },
    "iso2Code": "DE",
    "company": "Spryker",
    "phone": "+380669455897"
  },
  {
    "id": "dd1ddd99-1315-5eae-aaaf-9e74f78a33d53",
    "salutation": "Mr",
    "firstName": "spencor",
    "lastName": "hopkin",
    "address1": "West road",
    "address2": "212",
    "address3": "",
    "zipCode": "61000",
    "city": "Berlin",
    "country": {
      "id_country": 60,
      "iso2_code": "DE",
      "iso3_code": "DEU",
      "name": "Germany",
      "postal_code_mandatory": true,
      "postal_code_regex": "\\d{5}",
      "regions": {}
    },
    "iso2Code": "DE",
    "company": "Spryker",
    "phone": "+380669455897"
  }
];

const shipmentMethodsFixture: Array<IShipmentMethod> = [
  {
    carrierName: 'DHL',
    id: '1',
    name: 'Express',
    price: 500,
    taxRate: 2,
    shipmentDeliveryTime: null
  },
  {
    carrierName: 'DHL',
    id: '2',
    name: 'Standard',
    price: 600,
    taxRate: null,
    shipmentDeliveryTime: null
  },
  {
    carrierName: 'Hermes',
    id: '3',
    name: 'Air Light',
    price: 560,
    taxRate: 2,
    shipmentDeliveryTime: null
  },
  {
    carrierName: 'Spryker Drone Shipment',
    id: '4',
    name: 'Air Sonic',
    price: 1500,
    taxRate: null,
    shipmentDeliveryTime: null
  },
  {
    carrierName: 'Hermes',
    id: '5',
    name: 'Air Standard',
    price: 490,
    taxRate: null,
    shipmentDeliveryTime: null
  }
];
const paymentMethodsFixture: Array<IPaymentMethod> = [
  {
    paymentProvider: 'visa',
    paymentMethod: 'creditCard',
    paymentSelection: '1',
    amount: 0,
  },
  {
    paymentProvider: 'masterCard',
    paymentMethod: 'creditCard',
    paymentSelection: '2',
    amount: 0,
  },
  {
    paymentProvider: 'Dummy name invoice',
    paymentMethod: 'invoice',
    paymentSelection: '3',
    amount: 0,
  },
];

export const initialState: ICheckoutState = {
  data: {
    billingAddress: null,
    deliveryAddress: null,
    payments: paymentMethodsFixture || [],
    shipments: shipmentMethodsFixture || [],
    addressesCollection: addressesCollectionFixture || [],
  },
};

export const pageCheckout = produce<ICheckoutState>(
  (draft: ICheckoutState, action: any) => {
    switch (action.type) {
      case `${CHECKOUT_DATA_INIT_REQUEST}_PENDING`:
      case `${SEND_CHECKOUT_DATA}_PENDING`:
        draft.error = false;
        draft.pending = true;
        draft.fulfilled = false;
        draft.rejected = false;
        draft.initiated = true;
        break;
      case `${CHECKOUT_DATA_INIT_REQUEST}_REJECTED`:
      case `${SEND_CHECKOUT_DATA}_REJECTED`:
        draft.error = action.error;
        draft.pending = false;
        draft.fulfilled = false;
        draft.rejected = true;
        draft.initiated = true;
        break;
      case `${CHECKOUT_DATA_INIT_REQUEST}_FULFILLED`:
        draft.data.billingAddress = action.billingAddress || null;
        draft.data.deliveryAddress = action.deliveryAddress || null;

        draft.error = false;
        draft.pending = false;
        draft.fulfilled = true;
        draft.rejected = false;
        draft.initiated = true;
        break;
      case `${SEND_CHECKOUT_DATA}_FULFILLED`: {

        draft.error = false;
        draft.pending = false;
        draft.fulfilled = true;
        draft.rejected = false;
        draft.initiated = true;
        break;
      }
      default:
        break;
    }
  },
  initialState,
);

export function isPageCheckoutStateLoading(state: any, props: any): boolean {
  return Boolean(isStateExist(state, props) && state.pageCheckout.pending);
}

export function isPageCheckoutStateRejected(state: any, props: any): boolean {
  return Boolean(isStateExist(state, props) && state.pageCheckout.rejected);
}

export function isPageCheckoutFulfilled(state: any, props: any): boolean {
  return Boolean(isStateExist(state, props) && state.pageCheckout.fulfilled);
}

export function getShipmentMethodsFromStore(state: any, props: any): Array<IShipmentMethod> | null {
  return isShipmentMethodsExist(state, props) ? state.pageCheckout.data.shipments : null;
}

export function isShipmentMethodsExist(state: any, props: any): boolean {
  return Boolean(isStateExist(state, props) && state.pageCheckout.data.shipments);
}

export function getPaymentMethodsFromStore(state: any, props: any): Array<IPaymentMethod> | null {
  return isPaymentMethodsExist(state, props) ? state.pageCheckout.data.payments : null;
}

export function isPaymentMethodsExist(state: any, props: any): boolean {
  return Boolean(isStateExist(state, props) && state.pageCheckout.data.payments);
}

export function getAddressesCollectionFromCheckoutStore(state: any, props: any): Array<IAddressItemCollection> | null {
  return checkAddressesCollectionExist(state, props) ? state.pageCheckout.data.addressesCollection : null;
}

export function checkAddressesCollectionExist(state: any, props: any): boolean {
  return Boolean(isStateExist(state, props)
    && state.pageCheckout.data.addressesCollection
    && state.pageCheckout.data.addressesCollection.length
  );
}

function isStateExist(state: any, props: any): boolean {
  return Boolean(state.pageCheckout.data);
}
