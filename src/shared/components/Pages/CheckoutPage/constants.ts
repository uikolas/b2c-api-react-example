import {
  IBillingObjectConfigInputStable,
  IDeliveryObjectConfigInputStable
} from "src/shared/components/Pages/CheckoutPage/types";

export const deliveryNewAddressDefault = {
  firstName: {
    value: '',
    isError: false,
  },
  lastName: {
    value: '',
    isError: false,
  },
  salutation: {
    value: ' ',
    isError: false,
  },
  address1: {
    value: '',
    isError: false,
  },
  address2: {
    value: '',
    isError: false,
  },
  address3: {
    value: '',
    isError: false,
  },
  zipCode: {
    value: '',
    isError: false,
  },
  city: {
    value: '',
    isError: false,
  },
  country: {
    value: ' ',
    isError: false,
  },
  company: {
    value: '',
    isError: false,
  },
  phone: {
    value: '',
    isError: false,
  },
};

export const billingNewAddressDefault = {
  ...deliveryNewAddressDefault,
};

export const deliveryConfigInputStable: IDeliveryObjectConfigInputStable = {
  firstName: {
    isRequired: true,
    inputName: 'firstName',
  },
  lastName: {
    isRequired: true,
    inputName: 'lastName',
  },
  salutation: {
    isRequired: true,
    inputName: 'salutation',
  },
  address1: {
    isRequired: true,
    inputName: 'address1',
  },
  address2: {
    isRequired: true,
    inputName: 'address2',
  },
  address3: {
    isRequired: false,
    inputName: 'address3',
  },
  zipCode: {
    isRequired: true,
    inputName: 'zipCode',
  },
  city: {
    isRequired: true,
    inputName: 'city',
  },
  country: {
    isRequired: true,
    inputName: 'country',
  },
  company: {
    isRequired: true,
    inputName: 'company',
  },
  phone: {
    isRequired: false,
    inputName: 'phone',
  },
};

export const billingConfigInputStable: IBillingObjectConfigInputStable = {
  ...deliveryConfigInputStable
};

export const stepCompletionCheckoutDefault = {
  first: false,
  second: false,
  third: false,
  fourth: false,
};
