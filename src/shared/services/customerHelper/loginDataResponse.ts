import {ICustomerLoginDataParsed, TCustomerId} from "../../interfaces/customer/index";
import {TAccessToken} from "../../interfaces/login/index";

interface ICustomerLoginDataResponse {
  data: {
    attributes: {
      accessToken: TAccessToken;
      expiresIn: number;
      refreshToken: TAccessToken;
      tokenType: string;
    },
    id: TCustomerId | null;
  };
}

export const parseLoginDataResponse = (response: ICustomerLoginDataResponse): ICustomerLoginDataParsed => {
  if (!response) {
    return null;
  }
  const { data: {attributes} }: any = response;

  let result: ICustomerLoginDataParsed = {
    accessToken: attributes.accessToken,
    expiresIn: attributes.expiresIn,
    refreshToken: attributes.refreshToken,
    tokenType: attributes.tokenType,
  };

  return result;
};
