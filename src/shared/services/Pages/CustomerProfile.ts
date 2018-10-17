import api, {setAuthToken} from '../api';
import { toast } from 'react-toastify';
import {API_WITH_FIXTURES} from '../../constants/Environment';
import {
  getCustomerProfileFulfilledStateAction,
  getCustomerProfilePendingStateAction,
  getCustomerProfileRejectedStateAction
} from "../../actions/Pages/CustomerProfile";
import {getProductDataFulfilledStateAction} from "../../actions/Pages/Product";
import {TCustomerReference} from "../../interfaces/customer/index";
import {parseCustomerDataResponse} from "../customerHelper/customerDataResponse";
import {RefreshTokenService} from "../Common/RefreshToken";
import {CustomerProfileAuthenticateErrorText} from "../../constants/messages/errors";


export class CustomerProfileService {

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
        response = await api.get(`/customers/${customerReference}`, {include: ''}, { withCredentials: true });
      } catch (err) {
        console.error('CustomerProfileService: getProfileData: err', err);
      }

      if (response.ok) {
        const responseParsed: any = parseCustomerDataResponse(response.data);
        console.log('CustomerProfileService: getProfileData: responseParsed', responseParsed);
        dispatch(getCustomerProfileFulfilledStateAction(responseParsed));
        return responseParsed;
      } else {
        let errorMessage = response.problem;
        if (response.data.errors[0].detail) {
          errorMessage = response.data.errors[0].detail;
        }
        dispatch(getCustomerProfileRejectedStateAction(errorMessage));
        toast.error('Request Error: ' + errorMessage);
        return null;
      }

    } catch (error) {
      console.error('Catalog catch search', error);
      dispatch(getCustomerProfileRejectedStateAction(error.message));
      toast.error('Unexpected Error: ' + error);
      return null;
    }
  }
}
