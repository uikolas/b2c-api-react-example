import {ICustomerLoginDataParsed, ILoginDataToLocalStorage, TCustomerId} from "../../interfaces/customer/index";
import {TAccessToken} from "../../interfaces/login/index";
import jwtDecoder from 'jwt-decode';

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
  const {sub}: {sub: string} = jwtDecoder(attributes.accessToken);
  const customerRef = JSON.parse(sub).customer_reference;

  let result = {
    accessToken: attributes.accessToken,
    expiresIn: attributes.expiresIn,
    refreshToken: attributes.refreshToken,
    tokenType: attributes.tokenType,
    customerRef,
  };

  return result;
};

export const saveAccessDataToLocalStorage = (payload: ICustomerLoginDataParsed): boolean => {
  if (!payload) {
    return false;
  }
  localStorage.setItem(
    'tokenExpire',
    (Math.floor(Date.now() / 1000) + payload.expiresIn - 120).toString(10)
  );
  localStorage.setItem('accessToken', payload.accessToken);
  localStorage.setItem('refreshToken', payload.refreshToken);
  localStorage.setItem('customerRef', payload.customerRef);

  return true;
};

export const saveCustomerUsernameToLocalStorage = (payload: ILoginDataToLocalStorage): boolean => {
  if (!payload) {
    return false;
  }
  const customerUsername = payload.email ? payload.email : null;
  localStorage.setItem('customerUsername', customerUsername);

  return true;
};
