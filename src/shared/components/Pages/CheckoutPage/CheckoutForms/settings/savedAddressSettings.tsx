import {InputLabelSelectSavedDeliveryAddress} from "src/shared/constants/forms/labels";
import {IFormSettings} from "src/shared/components/UI/SprykerForm/types";
import {ISavedAddressParamsFormSettings} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/types";
import {IAddressItem} from "src/shared/interfaces/addresses/index";


export const getDeliverySavedAddressFormSettings = ( formName: string,
                                                     { selectedAddresses,
                                                       addressesCollection,
                                                       submitHandler,
                                                       inputChangeHandler,
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
          inputValue: selectedAddresses.deliverySelectedAddressId,
          spaceNumber: 12,
          isRequired: false,
          label: InputLabelSelectSavedDeliveryAddress,
          isError: false,
          radioItems: convertAddressesCollectionToRadioItems(addressesCollection),
        }
      ]
    ],
  };

  return formSettings;
};

const convertAddressesCollectionToRadioItems = (
  addressesCollection: ISavedAddressParamsFormSettings["addressesCollection"]) => {

  const isAddressesCollectionExist = Boolean(addressesCollection
                                             && Array.isArray(addressesCollection)
                                             && addressesCollection.length > 0
  );

  return (isAddressesCollectionExist
          ? addressesCollection.map((item: IAddressItem) => ({value: item.id, label: item.address1}))
          : null
  );
};
