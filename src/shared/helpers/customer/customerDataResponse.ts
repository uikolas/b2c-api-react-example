import { ICustomerDataParsed } from 'src/shared/interfaces/customer';

interface ICustomerDataResponse {
  data: {
    attributes: ICustomerDataParsed;
    id: string;
  };
  included: object;
}

export const parseCustomerDataResponse = (response: ICustomerDataResponse): ICustomerDataParsed | null => {
  if (!response) {
    return null;
  }
  const {data: {attributes, id}}: ICustomerDataResponse = response;

  let result: ICustomerDataParsed = {...attributes, id};

  return result;
};
