import * as React from 'react';
import {
  InputLabelSelectSavedBillingAddress,
  InputLabelSelectSavedDeliveryAddress
} from "src/shared/constants/forms/labels";
import {IFormSettings} from "src/shared/components/UI/SprykerForm/types";
import {IAddressItem} from "src/shared/interfaces/addresses/index";
import {salutationVariants} from "src/shared/constants/customer/index";
import {TSalutationVariant} from "src/shared/interfaces/customer/index";
import {
  IAddressesParams,
  IBillingAddressesParams,
  IDeliveryAddressesParams
} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/settings/types";


export const getDeliverySavedAddressFormSettings = (formName: string,
                                                    params: IDeliveryAddressesParams): IFormSettings => {

  const {
    addressesCollection,
    submitHandler,
    inputChangeHandler,
    extraOptionsToSelection,
    currentValueInSelection,
  } = params;

  const formSettings: IFormSettings = {
    formName,
    onChangeHandler: inputChangeHandler,
    onSubmitHandler: submitHandler,
    fields: [
      [
        {
          type: 'radio',
          inputName: 'deliverySelection',
          inputValue: currentValueInSelection,
          spaceNumber: 12,
          isRequired: false,
          label: InputLabelSelectSavedDeliveryAddress,
          isError: false,
          radioItems: getRadioItems(addressesCollection, extraOptionsToSelection),
        }
      ]
    ],
  };

  return formSettings;
};

export const getBillingSavedAddressFormSettings = (formName: string,
                                                   params: IBillingAddressesParams): IFormSettings => {

  const {
    addressesCollection,
    submitHandler,
    inputChangeHandler,
    extraOptionsToSelection,
    currentValueInSelection,
  } = params;

  const formSettings: IFormSettings = {
    formName,
    onChangeHandler: inputChangeHandler,
    onSubmitHandler: submitHandler,
    fields: [
      [
        {
          type: 'radio',
          inputName: 'billingSelection',
          inputValue: currentValueInSelection,
          spaceNumber: 12,
          isRequired: false,
          label: InputLabelSelectSavedBillingAddress,
          isError: false,
          radioItems: getRadioItems(addressesCollection, extraOptionsToSelection),
        }
      ]
    ],
  };

  return formSettings;
};

const getRadioItems = (collection: IAddressesParams["addressesCollection"],
                       extraOptions: IAddressesParams["extraOptionsToSelection"]) => {
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


const createRadioItemLabel = (address: IAddressItem) => {
  let response: React.ReactNode = '';

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
