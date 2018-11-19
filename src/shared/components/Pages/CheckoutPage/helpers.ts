import {
  ICheckoutFormsProps, IExtraAddressesOptions,
  TAddressType
} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/types";
import {
  InputLabelAddNewBillingAddress,
  InputLabelAddNewDeliveryAddress,
  InputLabelSameAsCurrentDelivery
} from "src/shared/constants/forms/labels";
import {
  ICheckoutPageProps, ICheckoutPanelsSettings,
  IParamFormValidity,
  IParamInputValidity,
  isAddNewBillingValue,
  isAddNewDeliveryValue,
  isSameAsDeliveryValue
} from "src/shared/components/Pages/CheckoutPage/types";
import {IAddressItem} from "src/shared/interfaces/addresses/index";

export const getExtraAddressesOptions = (isAddressesCollectionExist: boolean): IExtraAddressesOptions => {
  const response: IExtraAddressesOptions = {delivery: null, billing: null};

  if (isAddressesCollectionExist) {
    response.delivery = [];
    response.billing = [];
    response.delivery.push({value: isAddNewDeliveryValue, label: InputLabelAddNewDeliveryAddress});
    response.billing.push(
      {value: isAddNewBillingValue, label: InputLabelAddNewBillingAddress},
      {value: isSameAsDeliveryValue, label: InputLabelSameAsCurrentDelivery}
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

export const checkFormInputValidity = (param: IParamInputValidity): boolean => {
  const {value, fieldConfig} = param;
  if (!value && fieldConfig.isRequired) {
    return false;
  }
  return true;
};

export const checkAddressFormValidity = (param: IParamFormValidity): boolean => {
  const {form, fieldsConfig} = param;
  let result: boolean = true;

  for (const field in form) {
    if (!result
      || form[field].isError
      || (fieldsConfig[field].isRequired && !form[field].value)
      || form[field].value === " "
    ) {
      result = false;
    }
  }

  return result;
};

export const getCheckoutPanelsSettings = (params: ICheckoutPanelsSettings): ICheckoutFormsProps["panels"] => {

  const {
    isFirstPanelDisabled,
    isSecondPanelDisabled,
    isThirdPanelDisabled,
    isFourthPanelDisabled,
  } = params;

  const response = {
    first: {
      title: "Delivery Address",
      isDisabled: isFirstPanelDisabled,
    },
    second: {
      title: "Billing Address",
      isDisabled: isSecondPanelDisabled,
    },
    third: {
      title: "Shipment",
      isDisabled: isThirdPanelDisabled,
    },
    fourth: {
      title: "Payment",
      isDisabled: isFourthPanelDisabled,
    },
  };

  return response;
};
