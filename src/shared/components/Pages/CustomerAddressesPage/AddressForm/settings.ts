import {
  InputLabelFirstName,
  InputLabelLastName,
  InputLabelSalutation,
  InputLabelCompany,
  InputLabelStreet,
  InputLabelNumber,
  InputLabelStreetExtra,
  InputLabelCity,
  InputLabelZipCode,
  InputLabelCountry,
  InputLabelPhone,
  InputLabelDefaultDeliveryAddress,
  InputLabelDefaultShippingAddress,
} from "src/shared/constants/forms/labels";
import { salutationVariants } from "src/shared/constants/customer";
import { TSalutationVariant } from "src/shared/interfaces/customer";
import { ICountries } from "src/shared/reducers/Common/Init";
import { IFormField } from "src/shared/components/UI/SprykerForm/types";
import { IAddressItem } from 'src/shared/interfaces/addresses';

export const setFormFields = (currentState: IAddressItem, countries: ICountries[]): Array<IFormField[]> => {
  const {
    salutation,
    firstName,
    lastName,
    company,
    address1,
    address2,
    address3,
    zipCode,
    city,
    iso2Code,
    phone,
    isDefaultShipping,
    isDefaultBilling,
  } = currentState;

  return ([
    [{
      type: 'select',
      inputName: 'salutation',
      inputValue: salutation,
      spaceNumber: 3,
      isRequired: true,
      label: InputLabelSalutation,
      isError: false,
      menuItems: salutationVariants
        .map((item: TSalutationVariant) => ({value: item.value, name: item.label})),
    }], [{
      type: 'input',
      inputName: 'firstName',
      inputValue: firstName,
      spaceNumber: 6,
      isRequired: true,
      label: InputLabelFirstName,
      isError: false,
    }, {
      type: 'input',
      inputName: 'lastName',
      inputValue: lastName,
      spaceNumber: 6,
      isRequired: true,
      label: InputLabelLastName,
      isError: false,
    }], [{
      type: 'input',
      inputName: 'company',
      inputValue: company,
      spaceNumber: 6,
      label: InputLabelCompany,
    }], [{
      type: 'input',
      inputName: 'address1',
      inputValue: address1,
      spaceNumber: 6,
      isRequired: true,
      label: InputLabelStreet,
      isError: false,
    }, {
      type: 'input',
      inputName: 'address2',
      inputValue: address2,
      spaceNumber: 3,
      isRequired: true,
      label: InputLabelNumber,
      isError: false,
    }], [{
      type: 'input',
      inputName: 'address3',
      inputValue: address3,
      spaceNumber: 6,
      label: InputLabelStreetExtra,
      isError: false,
    }], [{
      type: 'input',
      inputName: 'city',
      inputValue: city,
      spaceNumber: 6,
      isRequired: true,
      label: InputLabelCity,
      isError: false,
    }, {
      type: 'input',
      inputName: 'zipCode',
      inputValue: zipCode,
      spaceNumber: 3,
      isRequired: true,
      label: InputLabelZipCode,
      isError: false,
    }], [{
      type: 'select',
      inputName: 'iso2Code',
      inputValue: iso2Code,
      spaceNumber: 6,
      isRequired: true,
      label: InputLabelCountry,
      isError: false,
      menuItems: countries
        .map((country: ICountries) => ({value: country.iso2Code, name: country.name})),
    }, {
      type: 'input',
      inputName: 'phone',
      inputValue: phone,
      inputType: 'tel',
      spaceNumber: 6,
      label: InputLabelPhone,
    }], [{
      type: 'checkbox',
      inputName: 'isDefaultBilling',
      inputValue: isDefaultBilling,
      spaceNumber: 6,
      label: InputLabelDefaultDeliveryAddress,
    }, {
      type: 'checkbox',
      inputName: 'isDefaultShipping',
      inputValue: isDefaultShipping,
      spaceNumber: 6,
      label: InputLabelDefaultShippingAddress,
      // onChangeOwnHandler: this.handleCheckbox,
    }],
  ]);
};
