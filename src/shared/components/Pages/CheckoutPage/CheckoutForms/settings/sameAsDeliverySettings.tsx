import {
  InputLabelSameAsDelivery,
} from "src/shared/constants/forms/labels";
import {IFormSettings} from "src/shared/components/UI/SprykerForm/types";
import {
  ISameAsDeliveryParamsFormSettings
} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/types";


export const getSameAsDeliveryFormSettings = ( formName: string,
                                               {sameAsDeliveryData,
                                                submitHandler,
                                                inputChangeHandler,
                                               }: ISameAsDeliveryParamsFormSettings
                                        ) => {
  const {
    isSameAsDelivery,
  } = sameAsDeliveryData;

  const formSettings: IFormSettings = {
    formName,
    onChangeHandler: inputChangeHandler,
    onSubmitHandler: submitHandler,
    fields: [
      [
        {
          type: 'checkbox',
          inputName: "sameAsDelivery",
          inputValue: isSameAsDelivery,
          spaceNumber: 12,
          isRequired: false,
          label: InputLabelSameAsDelivery,
          isError: false,
        }
      ]
    ],
  };

  return formSettings;
};
