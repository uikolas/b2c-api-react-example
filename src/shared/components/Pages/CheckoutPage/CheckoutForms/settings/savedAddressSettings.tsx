import {
  InputLabelSelectSavedBillingAddress,
  InputLabelSelectSavedDeliveryAddress
} from "src/shared/constants/forms/labels";
import {IFormSettings} from "src/shared/components/UI/SprykerForm/types";
import {TAddressType} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/types";
import {IAddressItem} from "src/shared/interfaces/addresses/index";
import {salutationVariants} from "src/shared/constants/customer/index";
import {TSalutationVariant} from "src/shared/interfaces/customer/index";
import {
  IAddressesParams,
  IBillingAddressesParams,
  IDeliveryAddressesParams
} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/settings/types";


export const getDeliverySavedAddressFormSettings = (formName: string, params: IDeliveryAddressesParams) => {

  const {
    selections,
    addressesCollection,
    submitHandler,
    inputChangeHandler,
    extraAddressesOptions,
  } = params;

  const currentValue = selections.selectedAddressId
                       || (selections.isAddNew && 'isAddNewDelivery')
                       || getDefaultAddressId(addressesCollection, 'delivery');

  const formSettings: IFormSettings = {
    formName,
    onChangeHandler: inputChangeHandler,
    onSubmitHandler: submitHandler,
    fields: [
      [
        {
          type: 'radio',
          inputName: 'deliverySelection',
          inputValue: currentValue,
          spaceNumber: 12,
          isRequired: false,
          label: InputLabelSelectSavedDeliveryAddress,
          isError: false,
          radioItems: getRadioItems(addressesCollection, extraAddressesOptions),
        }
      ]
    ],
  };

  return formSettings;
};

export const getBillingSavedAddressFormSettings = (formName: string, params: IBillingAddressesParams) => {

  const {
    selections,
    addressesCollection,
    submitHandler,
    inputChangeHandler,
    extraAddressesOptions,
  } = params;

  const currentValue = selections.selectedAddressId
                      || (selections.isAddNew && 'isAddNewBilling')
                      || (selections.isSameAsDelivery && 'sameAsDelivery')
                      || getDefaultAddressId(addressesCollection, 'billing');

  const formSettings: IFormSettings = {
    formName,
    onChangeHandler: inputChangeHandler,
    onSubmitHandler: submitHandler,
    fields: [
      [
        {
          type: 'radio',
          inputName: 'billingSelection',
          inputValue: currentValue,
          spaceNumber: 12,
          isRequired: false,
          label: InputLabelSelectSavedBillingAddress,
          isError: false,
          radioItems: getRadioItems(addressesCollection, extraAddressesOptions),
        }
      ]
    ],
  };

  return formSettings;
};

const getRadioItems = (collection: IAddressesParams["addressesCollection"],
                       extraOptions: IAddressesParams["extraAddressesOptions"]) => {
  let items = convertAddressesToRadioItems(collection);
  if (!items) {
    return null;
  }
  if(Array.isArray(extraOptions) && extraOptions.length > 0) {
    items = items.concat(extraOptions);
  }
  return items;
};

const convertAddressesToRadioItems = (collection: IAddressesParams["addressesCollection"]) => {

  return (isAddressesCollectionExist(collection)
          ? collection.map((item: IAddressItem) => ({value: item.id, label: createRadioItemLabel(item)}))
          : null
  );
};

const isAddressesCollectionExist = (collection: IAddressesParams["addressesCollection"]) => {
  return Boolean(collection && Array.isArray(collection) && collection.length > 0);
};

const getDefaultAddressId = (collection: IAddressesParams["addressesCollection"],
                             addressType: TAddressType) => {
  if (!isAddressesCollectionExist(collection)) {
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

const createRadioItemLabel = (address: IAddressItem) => {
  let response: string = '';

  if (address.salutation) {
    const variantData = salutationVariants.filter((item: TSalutationVariant) => (item.value === address.salutation));
    response += (variantData && variantData[0]) ? variantData[0].label : address.salutation;
  }
  if (address.firstName) {
    response += ` ${address.firstName}`;
  }
  if (address.lastName) {
    response += ` ${address.lastName}`;
  }
  if (address.address1) {
    response += `, ${address.address1}`;
  }
  if (address.address2) {
    response += ` ${address.address2}`;
  }
  if (address.city) {
    response += `, ${address.city}`;
  }
  if (address.zipCode) {
    response += `, ${address.zipCode}`;
  }
  if (address.country) {
    response += `, ${address.country}`;
  }

  return response;
};
