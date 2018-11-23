import {ICheckoutPageState} from "src/shared/components/Pages/CheckoutPage/types/index";

export const mutateShipmentMethod = (prevState: ICheckoutPageState, value: string):
  Pick<ICheckoutPageState, "shipmentMethod" | "stepsCompletion"> | null => {

  return ({
    shipmentMethod: value,
    stepsCompletion: {
      ...prevState.stepsCompletion,
      third: true,
    },
  });
};

export const mutatePaymentMethod = (prevState: ICheckoutPageState, value: string):
  Pick<ICheckoutPageState, "paymentMethod"> | null => {

  return ({
    paymentMethod: value,
    /*stepsCompletion: {
      ...prevState.stepsCompletion,
      third: true,
    },*/
  });
};
