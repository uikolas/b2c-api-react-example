import { ICustomerDataParsed } from 'src/shared/interfaces/customer';

interface ICustomerDataResponse {
  data: object;
  included: object;
}

export const parseCustomerDataResponse = (response: ICustomerDataResponse): ICustomerDataParsed => {
  if (!response) {
    return null;
  }
  const {data: {attributes, id}}: any = response;

  let result: ICustomerDataParsed = {
    id,
    createdAt: attributes.createdAt,
    dateOfBirth: attributes.dateOfBirth,
    firstName: attributes.firstName,
    lastName: attributes.lastName,
    salutation: attributes.salutation,
    updatedAt: attributes.updatedAt,
    gender: attributes.gender,
    email: '',
  };

  return result;
};
