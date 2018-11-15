import {
  InputLabelCity,
  InputLabelCompany,
  InputLabelCountry,
  InputLabelFirstName,
  InputLabelLastName,
  InputLabelNumber,
  InputLabelPhone,
  InputLabelSalutation,
  InputLabelStreet,
  InputLabelStreetExtra,
  InputLabelZipCode, InputSelectCountryFirstItem
} from "src/shared/constants/forms/labels";
import {salutationVariants} from "src/shared/constants/customer/index";
import {TSalutationVariant} from "src/shared/interfaces/customer/index";
import {IFormSettings} from "src/shared/components/UI/SprykerForm/types";
import {IAddressParams} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/settings/types";
import {ICountries} from "src/shared/reducers/Common/Init";


export const getAddressFormSettings = ( formName: string, params: IAddressParams) => {
  const {
    addressData: {
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
    },
    countriesCollection,
    submitHandler,
    inputChangeHandler,
  } = params;

  const isCountriesCollectionExist = Boolean(Array.isArray(countriesCollection) && countriesCollection.length > 0);

  const formSettings: IFormSettings = {
    formName,
    onChangeHandler: inputChangeHandler,
    onSubmitHandler: submitHandler,
    fields: [
      [
        {
          type: 'select',
          inputName: 'salutation',
          inputValue: salutation,
          spaceNumber: 3,
          isRequired: true,
          label: InputLabelSalutation,
          isError: false,
          menuItems: salutationVariants
            .map((item: TSalutationVariant) => ({value: item.value, name: item.label})),
          menuItemFirst: null,
        }
      ],
      [
        {
          type: 'input',
          inputName: 'firstName',
          inputValue: firstName,
          spaceNumber: 6,
          isRequired: true,
          label: InputLabelFirstName,
          isError: false,
        },
        {
          type: 'input',
          inputName: 'lastName',
          inputValue: lastName,
          spaceNumber: 6,
          isRequired: true,
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
          isRequired: true,
          label: InputLabelStreet,
          isError: false,
        },
        {
          type: 'input',
          inputName: 'address2',
          inputValue: address2,
          spaceNumber: 3,
          isRequired: true,
          label: InputLabelNumber,
          isError: false,
        }
      ],
      [
        {
          type: 'input',
          inputName: 'address3',
          inputValue: address3,
          spaceNumber: 6,
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
          isRequired: true,
          label: InputLabelCity,
          isError: false,
        },
        {
          type: 'input',
          inputName: 'zipCode',
          inputValue: zipCode,
          spaceNumber: 6,
          isRequired: true,
          label: InputLabelZipCode,
          isError: false,
        },
      ],
      [
        {
          type: 'select',
          inputName: 'country',
          inputValue: country,
          spaceNumber: 6,
          isRequired: true,
          label: InputLabelCountry,
          isError: false,
          menuItems: isCountriesCollectionExist
                     ? countriesCollection
                        .map((item: ICountries) => ({value: item.iso2Code, name: item.name}))
                     : null,
          menuItemFirst: {
            value: " ",
            name: InputSelectCountryFirstItem,
            selected: true,
            disabled: true,
          },
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
