import api, {setAuthToken} from '../api';
import { toast } from 'react-toastify';
import {RefreshTokenService} from '../Common/RefreshToken';
import {ICheckoutRequest} from "src/shared/interfaces/checkout/index";


export class CheckoutService {
  public static async getCheckoutData(dispatch: Function, payload: ICheckoutRequest): Promise<any> {
    try {
      const token = await RefreshTokenService.getActualToken(dispatch);
      setAuthToken(token);

      const body: any = {
        data: {
          type: 'checkout-data',
          attributes: payload,
        }
      };

      const response: any = await api.post('checkout-data', body, { withCredentials: true });

      if (response.ok) {

        return response.ok;
      } else {

        toast.error('Request Error: ' + response.problem);
        return null;
      }

    } catch (error) {

      toast.error('Unexpected Error: ' + error.message);
      return null;
    }
  }

  public static async sendOrderData(dispatch: Function, payload: ICheckoutRequest): Promise<any> {
    try {
      const token = await RefreshTokenService.getActualToken(dispatch);
      setAuthToken(token);

      const body: any = {
        data: {
          type: 'checkout',
          attributes: payload,
        }
      };

      const response: any = await api.post('checkout', body, { withCredentials: true });

      if (response.ok) {
        toast.success('Order created successfull');
        return response.data.data;
      } else {

        toast.error('Request Error: ' + response.problem);
        return null;
      }

    } catch (error) {

      toast.error('Unexpected Error: ' + error.message);
      return null;
    }
  }
}
