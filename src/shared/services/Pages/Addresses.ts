import api, {setAuthToken} from '../api';
import { toast } from 'react-toastify';
import {RefreshTokenService} from '../Common/RefreshToken';
import {IAddressItem} from "../../interfaces/addresses";


export class AddressesService {
  public static async getCustomerAddresses(ACTION_TYPE: string, dispatch: Function, customerId: string): Promise<any> {
    try {
      const token = await RefreshTokenService.getActualToken(dispatch);
      setAuthToken(token);

      const response: any = await api.get(`customers/${customerId}/addresses`, {}, { withCredentials: true });

      if (response.ok) {
        console.info(response.data.data);

        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
        });
        return response.data.data;
      } else {
        dispatch({
          type: ACTION_TYPE + '_REJECTED',
          error: response.problem,
        });
        toast.error('Request Error: ' + response.problem);
        return null;
      }

    } catch (error) {
      dispatch({
        type: ACTION_TYPE + '_REJECTED',
        error: error.message,
      });
      toast.error('Unexpected Error: ' + error.message);
      return null;
    }
  }

  public static async addAddress(ACTION_TYPE: string, dispatch: Function, payload: IAddressItem, customerId: string): Promise<any> {
    try {
      const token = await RefreshTokenService.getActualToken(dispatch);
      setAuthToken(token);

      const body: any = {
        data: {
          type: 'addresses',
          attributes: payload,
        }
      };

      const response: any = await api.post(`customers/${customerId}/addresses`, body, { withCredentials: true });

      if (response.ok) {
        console.info(response.data.data);
        dispatch({
          type: ACTION_TYPE + '_FULFILLED',

        });
        return response.data.data;
      } else {
        dispatch({
          type: ACTION_TYPE + '_REJECTED',
          error: response.problem,
        });
        toast.error('Request Error: ' + response.problem);
        return null;
      }

    } catch (error) {
      dispatch({
        type: ACTION_TYPE + '_REJECTED',
        error,
      });
      toast.error('Unexpected Error: ' + error.message);
      return null;
    }
  }

  public static async deleteWishlist(ACTION_TYPE: string, dispatch: Function, wishlistId: string): Promise<any> {
    try {
      const token = await RefreshTokenService.getActualToken(dispatch);
      setAuthToken(token);

      const response: any = await api.delete(`wishlists/${wishlistId}`, {}, { withCredentials: true });

      if (response.ok) {
        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          wishlistId,
        });
        return response.ok;
      } else {
        dispatch({
          type: ACTION_TYPE + '_REJECTED',
          error: response.problem,
        });
        toast.error('Request Error: ' + response.problem);
        return null;
      }

    } catch (error) {
      dispatch({
        type: ACTION_TYPE + '_REJECTED',
        error,
      });
      toast.error('Unexpected Error: ' + error.message);
      return null;
    }
  }

  public static async updateWishlist(ACTION_TYPE: string, dispatch: Function, wishlistId: string, name: string): Promise<any> {
    try {
      const token = await RefreshTokenService.getActualToken(dispatch);
      setAuthToken(token);

      const body: any = {
        data: {
          type: 'wishlists',
          attributes: {name}
        }
      };

      const response: any = await api.patch(`wishlists/${wishlistId}`, body, { withCredentials: true });

      if (response.ok) {
        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
        });
        return response.data.data;
      } else {
        dispatch({
          type: ACTION_TYPE + '_REJECTED',
          error: response.problem,
        });
        toast.error('Request Error: ' + response.problem);
        return null;
      }

    } catch (error) {
      dispatch({
        type: ACTION_TYPE + '_REJECTED',
        error,
      });
      toast.error('Unexpected Error: ' + error.message);
      return null;
    }
  }
}
