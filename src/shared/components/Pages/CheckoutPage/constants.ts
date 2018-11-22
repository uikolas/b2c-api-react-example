import {
  IBillingAddressState,
  IBillingObjectConfigInputStable,
  ICheckoutCreditCardState,
  ICheckoutInputsFormNames,
  ICheckoutInvoiceState,
  ICheckoutPaymentMethodsNames,
  ICheckoutStepsCompletion, ICreditCardObjectConfigInputStable,
  IDeliveryAddressState,
  IDeliveryObjectConfigInputStable, IInvoiceObjectConfigInputStable
} from "src/shared/components/Pages/CheckoutPage/types";


export const deliveryNewAddressDefault: IDeliveryAddressState = {
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

export const billingNewAddressDefault: IBillingAddressState = {
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

export const stepCompletionCheckoutDefault: ICheckoutStepsCompletion = {
  first: false,
  second: false,
  third: false,
  fourth: false,
};

export const paymentCreditCardDefault: ICheckoutCreditCardState = {
  paymentProvider: {
    value: '',
    isError: false,
  },
  cardNumber: {
    value: '',
    isError: false,
  },
  cardName: {
    value: '',
    isError: false,
  },
  cardExpiryMonth: {
    value: '',
    isError: false,
  },
  cardExpiryYear: {
    value: '',
    isError: false,
  },
  cardCVC: {
    value: '',
    isError: false,
  },
};

export const paymentInvoiceDefault: ICheckoutInvoiceState = {
  dateOfBirth: {
    value: '',
    isError: false,
  },
};

export const invoiceConfigInputStable: IInvoiceObjectConfigInputStable = {
  dateOfBirth: {
    isRequired: true,
    inputName: 'dateOfBirth',
  },
};

export const creditCardConfigInputStable: ICreditCardObjectConfigInputStable = {
  paymentProvider: {
    isRequired: true,
    inputName: 'paymentProvider',
  },
  cardNumber: {
    isRequired: true,
    inputName: 'cardNumber',
  },
  cardName: {
    isRequired: true,
    inputName: 'cardName',
  },
  cardExpiryMonth: {
    isRequired: true,
    inputName: 'cardExpiryMonth',
  },
  cardExpiryYear: {
    isRequired: true,
    inputName: 'cardExpiryYear',
  },
  cardCVC: {
    isRequired: true,
    inputName: 'cardCVC',
  },
};

export const checkoutInputsFormNames: ICheckoutInputsFormNames = {
  billing: 'billing',
  delivery: 'delivery',
  invoice: 'invoice',
  creditCard: 'creditCard',
};

export const checkoutPaymentMethodsNames: ICheckoutPaymentMethodsNames = {
  invoice: 'invoice',
  creditCard: 'creditCard',
};
