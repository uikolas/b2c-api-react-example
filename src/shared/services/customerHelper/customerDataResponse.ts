import {ICustomerDataParsed} from "../../interfaces/customer/index";

interface ICustomerDataResponse {
  data: object;
  included: object;
}

export const parseCustomerDataResponse = (response: ICustomerDataResponse): ICustomerDataParsed => {
  console.log('parseCustomerDataResponse response', response);

  if (!response) {
    return null;
  }
  const { data, data: {attributes, id} }: any = response;

  let result: ICustomerDataParsed = {
    id,
    createdAt: attributes.createdAt,
    dateOfBirth: attributes.dateOfBirth,
    firstName: attributes.firstName,
    lastName: attributes.lastName,
    salutation: attributes.salutation,
    updatedAt: attributes.updatedAt,
    gender: attributes.gender,
    email: 'test_email',
  };

  return result;
};
