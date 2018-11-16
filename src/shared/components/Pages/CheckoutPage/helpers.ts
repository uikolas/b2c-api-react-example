import {IExtraAddressesOptions, TAddressType} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/types";
import {
  InputLabelAddNewBillingAddress,
  InputLabelAddNewDeliveryAddress,
  InputLabelSameAsCurrentDelivery
} from "src/shared/constants/forms/labels";
import {ICheckoutPageProps} from "src/shared/components/Pages/CheckoutPage/types";
import {IAddressItem} from "src/shared/interfaces/addresses/index";

export const getExtraAddressesOptions = (isAddressesCollectionExist: boolean): IExtraAddressesOptions => {
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

  return response;
};

export const getDefaultAddressId = (collection: ICheckoutPageProps["addressesCollection"],
                                    addressType: TAddressType) => {
  if (!collection) {
    return null;
  }
  const variantData = collection
    .filter((item: IAddressItem) => {
      if (addressType === 'delivery') {
        return item.isDefaultShipping === true;
      } else if (addressType === 'billing') {
        return item.isDefaultBilling === true;
      } else {
        return false;
      }
    });
  return ((variantData && variantData[0]) ? variantData[0].id : null);
};
