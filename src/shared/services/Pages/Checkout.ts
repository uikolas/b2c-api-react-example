import api, {setAuthToken} from '../api';
import { toast } from 'react-toastify';
import {RefreshTokenService} from '../Common/RefreshToken';
import {ICheckoutRequest} from "src/shared/interfaces/checkout";
import { ApiServiceAbstract } from '../apiAbstractions/ApiServiceAbstract';

interface IRequestBody {
  data: {
    type: string;
    include?: string;
    attributes: ICheckoutRequest;
  };
}


export class CheckoutService extends ApiServiceAbstract {
  public static async getCheckoutData(dispatch: Function, payload: ICheckoutRequest): Promise<void> {
    try {
      const token = await RefreshTokenService.getActualToken(dispatch);
      setAuthToken(token);

      const body: IRequestBody = {
        data: {
          type: 'checkout-data',
          attributes: payload,
        }
      };

      const response: any = await api.post('checkout-data', body, { withCredentials: true });

      if (response.ok) {
        console.info(response.data);
      } else {
        const errorMessage = this.getParsedAPIError(response);
        toast.error('Request Error: ' + errorMessage);
      }

    } catch (error) {

      toast.error('Unexpected Error: ' + error.message);
    }
  }

  public static async sendOrderData(dispatch: Function, payload: ICheckoutRequest): Promise<void> {
    try {
      const token = await RefreshTokenService.getActualToken(dispatch);
      setAuthToken(token);

      const body: IRequestBody = {
        data: {
          type: 'checkout',
          attributes: payload,
        }
      };

      const response: any = await api.post('checkout', body, { withCredentials: true });

      if (response.ok) {
        toast.success('Order created successfull');
      } else {
        const errorMessage = this.getParsedAPIError(response);
        toast.error('Request Error: ' + errorMessage);
      }

    } catch (error) {
      toast.error('Unexpected Error: ' + error.message);
    }
  }
}
