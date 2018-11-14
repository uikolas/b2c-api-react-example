import {InputLabelSelectSavedDeliveryAddress} from "src/shared/constants/forms/labels";
import {IFormSettings} from "src/shared/components/UI/SprykerForm/types";
import {
  ISavedAddressParamsFormSettings,
  TAddressType
} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/types";
import {IAddressItem} from "src/shared/interfaces/addresses/index";
import {salutationVariants} from "src/shared/constants/customer/index";
import {TSalutationVariant} from "src/shared/interfaces/customer/index";


export const getDeliverySavedAddressFormSettings = ( formName: string,
                                                     { selectedAddressId,
                                                       addressesCollection,
                                                       submitHandler,
                                                       inputChangeHandler,
                                                       extraAddressesOptions,
                                                     }: ISavedAddressParamsFormSettings
                                                   ) => {

  const formSettings: IFormSettings = {
    formName,
    onChangeHandler: inputChangeHandler,
    onSubmitHandler: submitHandler,
    fields: [
      [
        {
          type: 'radio',
          inputName: 'deliverySelectedAddressId',
          inputValue: selectedAddressId
                      || getDefaultAddressId(addressesCollection, 'delivery'),
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

const getRadioItems = (addressesCollection: ISavedAddressParamsFormSettings["addressesCollection"],
                       extraAddressesOptions: ISavedAddressParamsFormSettings["extraAddressesOptions"]) => {
  let items = convertAddressesToRadioItems(addressesCollection);
  if (!items) {
    return null;
  }
  if(Array.isArray(extraAddressesOptions) && extraAddressesOptions.length > 0) {
    items = items.concat(extraAddressesOptions);
  }
  return items;
};

const convertAddressesToRadioItems = (addressesCollection: ISavedAddressParamsFormSettings["addressesCollection"]) => {

  return (isAddressesCollectionExist(addressesCollection)
          ? addressesCollection.map((item: IAddressItem) => ({value: item.id, label: createRadioItemLabel(item)}))
          : null
  );
};

const isAddressesCollectionExist = (addressesCollection: ISavedAddressParamsFormSettings["addressesCollection"]) => {
  return Boolean(addressesCollection
    && Array.isArray(addressesCollection)
    && addressesCollection.length > 0
  );
};

const getDefaultAddressId = (addressesCollection: ISavedAddressParamsFormSettings["addressesCollection"],
                             addressType: TAddressType) => {
  if (!isAddressesCollectionExist(addressesCollection)) {
    return null;
  }
  const variantData = addressesCollection
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
