import {
  InputLabelCity,
  InputLabelCompany,
  InputLabelCountry,
  InputLabelFirstName,
  InputLabelLastName,
  InputLabelNumber,
  InputLabelPhone, InputLabelSalutation,
  InputLabelStreet,
  InputLabelStreetExtra,
  InputLabelZipCode
} from "src/shared/constants/forms/labels";
import {salutationVariants} from "src/shared/constants/customer/index";
import {TSalutationVariant} from "src/shared/interfaces/customer/index";
import {IFormSettings} from "src/shared/components/UI/SprykerForm/types";
import {IDeliveryFormSettings} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/DeliveryForm/types";

export const getDeliveryFormSettings = ( deliveryFormName: string,
                                         {shippingAddress, submitHandler, inputChangeHandler}: IDeliveryFormSettings
                                        ) => {
  const {
    firstName,
    lastName,
    salutation,
    address1,
    address2,
    address3,
    zipCode,
    city,
    country,
    company,
    phone,
    iso2Code,
  } = shippingAddress;

  const formSettings: IFormSettings = {
    formName: deliveryFormName,
    onChangeHandler: inputChangeHandler,
    onSubmitHandler: submitHandler,
    fields: [
      [
        {
          type: 'select',
          inputName: 'salutation',
          inputValue: salutation,
          spaceNumber: 4,
          label: InputLabelSalutation,
          isError: false,
          menuItems: salutationVariants
            .map((item: TSalutationVariant) => ({value: item.value, name: item.label}))
        }
      ],
      [
        {
          type: 'input',
          inputName: 'firstName',
          inputValue: firstName,
          spaceNumber: 6,
          label: InputLabelFirstName,
          isError: false,
        },
        {
          type: 'input',
          inputName: 'lastName',
          inputValue: lastName,
          spaceNumber: 6,
          label: InputLabelLastName,
          isError: false,
        }
      ],
      [
        {
          type: 'input',
          inputName: 'company',
          inputValue: company,
          spaceNumber: 6,
          label: InputLabelCompany,
          isError: false,
        },
      ],
      [
        {
          type: 'input',
          inputName: 'address1',
          inputValue: address1,
          spaceNumber: 6,
          label: InputLabelStreet,
          isError: false,
        },
        {
          type: 'input',
          inputName: 'address2',
          inputValue: address2,
          spaceNumber: 6,
          label: InputLabelNumber,
          isError: false,
        }
      ],
      [
        {
          type: 'input',
          inputName: 'address3',
          inputValue: address3,
          spaceNumber: 4,
          label: InputLabelStreetExtra,
          isError: false,
        },
      ],
      [
        {
          type: 'input',
          inputName: 'city',
          inputValue: city,
          spaceNumber: 6,
          label: InputLabelCity,
          isError: false,
        },
        {
          type: 'input',
          inputName: 'zipCode',
          inputValue: zipCode,
          spaceNumber: 6,
          label: InputLabelZipCode,
          isError: false,
        },
      ],
      [
        {
          type: 'input',
          inputName: 'country',
          inputValue: country,
          spaceNumber: 6,
          label: InputLabelCountry,
          isError: false,
        },
        {
          type: 'input',
          inputName: 'phone',
          inputValue: phone,
          spaceNumber: 6,
          label: InputLabelPhone,
          isError: false,
        },
      ],
    ],
  };

  return formSettings;
};
