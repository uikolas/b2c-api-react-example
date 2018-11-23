import {ICheckoutPageState} from "src/shared/components/Pages/CheckoutPage/types/index";


export const mutateDeliverySelectionAddNew = (prevState: ICheckoutPageState):
  Pick<ICheckoutPageState, "deliverySelection" | "stepsCompletion"> | null => {

  return ({
    deliverySelection: {
      selectedAddressId: null,
      isAddNew: true,
    },
    stepsCompletion: {
      ...prevState.stepsCompletion,
      first: false,
    },
  });
};

export const mutateDeliverySelectionAddressId = (prevState: ICheckoutPageState, value: string):
  Pick<ICheckoutPageState, "deliverySelection" | "stepsCompletion"> | null => {

  return ({
    deliverySelection: {
      selectedAddressId: value,
      isAddNew: false,
    },
    stepsCompletion: {
      ...prevState.stepsCompletion,
      first: true,
    },
  });
};

export const mutateBillingSelectionAddNew = (prevState: ICheckoutPageState):
  Pick<ICheckoutPageState, "billingSelection" | "stepsCompletion"> | null => {

  return ({
    billingSelection: {
      selectedAddressId: null,
      isAddNew: true,
      isSameAsDelivery: false,
    },
    stepsCompletion: {
      ...prevState.stepsCompletion,
      second: false,
    },
  });
};

export const mutateBillingSelectionSameAsDelivery = (prevState: ICheckoutPageState):
  Pick<ICheckoutPageState, "billingSelection" | "stepsCompletion"> | null => {

  const newSameValue = !prevState.billingSelection.isSameAsDelivery;

  return ({
    billingSelection: {
      selectedAddressId: null,
      isAddNew: !newSameValue,
      isSameAsDelivery: newSameValue,
    },
    stepsCompletion: {
      ...prevState.stepsCompletion,
      second: true,
    },
  });
};

export const mutateBillingSelectionAddressId = (prevState: ICheckoutPageState, value: string):
  Pick<ICheckoutPageState, "billingSelection" | "stepsCompletion"> | null => {

  return ({
    billingSelection: {
      selectedAddressId: value,
      isAddNew: false,
      isSameAsDelivery: false,
    },
    stepsCompletion: {
      ...prevState.stepsCompletion,
      second: true,
    },
  });
};
