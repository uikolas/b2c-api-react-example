import api, {setAuthToken} from '../api';
import { toast } from 'react-toastify';
import {RefreshTokenService} from '../Common/RefreshToken';
import {
  getCheckoutDataInitFulfilledStateAction,
  getCheckoutDataInitPendingStateAction,
  getCheckoutDataInitRejectedStateAction,
  sendCheckoutDataFulfilledStateAction,
  sendCheckoutDataPendingStateAction,
  sendCheckoutDataRejectedStateAction,
} from 'src/shared/actions/Pages/Checkout';
import {
  IBillingAddress,
  IShippingAddress,
} from 'src/shared/interfaces/checkout';


export class CheckoutService {
  public static async getCheckoutData(dispatch: Function, payload: any): Promise<any> {
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

        console.info(response.data.data);

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

  public static async sendOrderData(dispatch: Function, payload: any): Promise<any> {
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
        console.info(response.data.data);

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
