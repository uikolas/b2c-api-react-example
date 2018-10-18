import api, {setAuthToken} from '../api';
import { toast } from 'react-toastify';
import {
  getCustomerProfileFulfilledStateAction,
  getCustomerProfilePendingStateAction,
  getCustomerProfileRejectedStateAction, updateCustomerPasswordAction, updateCustomerPasswordFulfilledStateAction,
  updateCustomerPasswordPendingStateAction,
  updateCustomerPasswordRejectedStateAction,
  updateCustomerProfileFulfilledStateAction,
  updateCustomerProfilePendingStateAction,
  updateCustomerProfileRejectedStateAction
} from "../../actions/Pages/CustomerProfile";
import {
  ICustomerProfile, ICustomerProfileIdentity, ICustomerProfilePassword,
  TCustomerReference
} from "../../interfaces/customer/index";
import {parseCustomerDataResponse} from "../customerHelper/customerDataResponse";
import {RefreshTokenService} from "../Common/RefreshToken";
import {CustomerProfileAuthenticateErrorText} from "../../constants/messages/errors";
import {ApiServiceAbstract} from "../apiHelper/ApiServiceAbstract";


export class CustomerProfileService extends ApiServiceAbstract {

  private static getCustomersEndpoint = (customerReference: TCustomerReference) => (`/customers/${customerReference}`);

  // Retrieve customer data.
  public static async getProfileData(dispatch: Function, customerReference: TCustomerReference): Promise<any> {
    try {
      dispatch(getCustomerProfilePendingStateAction());
      let response: any;

      try {
        const token = await RefreshTokenService.getActualToken(dispatch);
        if (!token) {
          throw new Error(CustomerProfileAuthenticateErrorText);
        }
        setAuthToken(token);
        response = await api.get(
          this.getCustomersEndpoint(customerReference),
          {include: ''},
          { withCredentials: true }
        );
      } catch (err) {
        console.error('CustomerProfileService: getProfileData: err', err);
      }

      if (response.ok) {
        const responseParsed: any = parseCustomerDataResponse(response.data);
        dispatch(getCustomerProfileFulfilledStateAction(responseParsed));
        return responseParsed;
      } else {
        const errorMessage = this.getParsedAPIError(response);
        dispatch(getCustomerProfileRejectedStateAction(errorMessage));
        toast.error('Request Error: ' + errorMessage);
        return null;
      }

    } catch (error) {
      console.error('getProfileData error', error);
      dispatch(getCustomerProfileRejectedStateAction(error.message));
      toast.error('Unexpected Error: ' + error);
      return null;
    }
  }

  // Update customer data
  public static async updateProfileData(dispatch: Function,
                                        customerReference: TCustomerReference,
                                        payload: ICustomerProfileIdentity): Promise<any> {
    try {
      dispatch(updateCustomerProfilePendingStateAction());
      let response: any;

      try {
        const body: any = {
          data: {
            type: 'customers',
            id: customerReference,
            attributes: payload,
            include: '',
          },
        };

        const token = await RefreshTokenService.getActualToken(dispatch);
        if (!token) {
          throw new Error(CustomerProfileAuthenticateErrorText);
        }
        setAuthToken(token);
        response = await api.patch(
          this.getCustomersEndpoint(customerReference),
          body,
          { withCredentials: true }
        );
      } catch (err) {
        console.error('CustomerProfileService: updateProfileData: err', err);
      }

      if (response.ok) {
        const responseParsed: any = parseCustomerDataResponse(response.data);
        dispatch(updateCustomerProfileFulfilledStateAction(responseParsed));
        toast.success('Your Profile Data was successfully updated!');
        return responseParsed;
      } else {
        const errorMessage = this.getParsedAPIError(response);
        dispatch(updateCustomerProfileRejectedStateAction(errorMessage));
        toast.error('Request Error: ' + errorMessage);
        return null;
      }

    } catch (error) {
      console.error('updateProfileData error', error);
      dispatch(updateCustomerProfileRejectedStateAction(error.message));
      toast.error('Unexpected Error: ' + error);
      return null;
    }
  }

  // Update customer password.
  public static async updatePasswordData(dispatch: Function, payload: ICustomerProfilePassword): Promise<any> {
    try {
      dispatch(updateCustomerPasswordPendingStateAction());

      let response: any;

      try {
        const body: any = {
          data: {
            type: 'customer-password',
            attributes: payload,
          },
        };

        const token = await RefreshTokenService.getActualToken(dispatch);
        if (!token) {
          throw new Error(CustomerProfileAuthenticateErrorText);
        }
        setAuthToken(token);
        response = await api.patch('customer-password', body, { withCredentials: true });
      } catch (err) {
        console.error('CustomerProfileService: updatePasswordData: err', err);
      }

      if (response.ok) {
        console.log('updatePasswordData response ', response);

        const responseParsed: any = response.data;
        dispatch(updateCustomerPasswordFulfilledStateAction());
        toast.success('Your Password was successfully updated!');
        return responseParsed;
      } else {
        const errorMessage = this.getParsedAPIError(response);
        dispatch(updateCustomerPasswordRejectedStateAction(errorMessage));
        toast.error('Request Error: ' + errorMessage);
        return null;
      }

    } catch (error) {
      console.error('updatePasswordData error', error);
      dispatch(updateCustomerPasswordRejectedStateAction(error.message));
      toast.error('Unexpected Error: ' + error);
      return null;
    }
  }
}
