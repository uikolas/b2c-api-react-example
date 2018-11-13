import {InputLabelSelectSavedDeliveryAddress} from "src/shared/constants/forms/labels";
import {IFormSettings} from "src/shared/components/UI/SprykerForm/types";
import {ISavedAddressParamsFormSettings} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/types";


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
          /*menuItems: addressesCollection.
            .map((item: TSalutationVariant) => ({value: item.value, name: item.label})),*/
        }
      ]
    ],
  };

  return formSettings;
};
