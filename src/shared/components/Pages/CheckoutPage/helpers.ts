import {IExtraAddressesOptions} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/types";
import {
  InputLabelAddNewBillingAddress,
  InputLabelAddNewDeliveryAddress,
  InputLabelSameAsCurrentDelivery
} from "src/shared/constants/forms/labels";

export const getExtraAddressesOptions = (isAddressesCollectionExist: boolean): IExtraAddressesOptions | null => {
  const response: IExtraAddressesOptions = {delivery: null, billing: null};

  if (isAddressesCollectionExist) {
    response.delivery = [];
    response.billing = [];
    response.delivery.push({value: 'isAddNewDelivery', label: InputLabelAddNewDeliveryAddress});
    response.billing.push(
      {value: 'isAddNewBilling', label: InputLabelAddNewBillingAddress},
      {value: 'sameAsDelivery', label: InputLabelSameAsCurrentDelivery}
    );
  }

  if (!response.delivery && !response.billing) {
    return null;
  }

  return response;
};
