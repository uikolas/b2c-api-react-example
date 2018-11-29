import { toast } from 'react-toastify';
import { IAddressItem } from 'src/shared/interfaces/addresses';
import { RefreshTokenService } from '../Common/RefreshToken';
import api, { setAuthToken } from '../api';

export class AddressesService {
  public static async getCustomerAddresses(ACTION_TYPE: string, dispatch: Function, customerId: string): Promise<any> {
    try {
      const token = await RefreshTokenService.getActualToken(dispatch);
      setAuthToken(token);

      const response: any = await api.get(`customers/${customerId}/addresses`, {}, {withCredentials: true});

      if (response.ok) {
        const addresses = response.data.data.map((
          address: any,
        ): IAddressItem => ({id: address.id, ...address.attributes}));

        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          addresses,
        });
        return addresses;
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

  public static async addAddress(
    ACTION_TYPE: string, dispatch: Function, payload: IAddressItem, customerId: string
  ): Promise<any> {
    try {
      const token = await RefreshTokenService.getActualToken(dispatch);
      setAuthToken(token);

      const body: any = {
        data: {
          type: 'addresses',
          attributes: payload,
        },
      };

      const response: any = await api.post(`customers/${customerId}/addresses`, body, {withCredentials: true});

      if (response.ok) {
        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          address: {id: response.data.data.id, ...response.data.data.attributes},

        });
        toast.success('New address added successfull');

        // TODO - when after adding address in response will be id !== null - delete getCustomerAddresses
        
        // return response.data.data;
        return AddressesService.getCustomerAddresses('ADDRESSES_LIST', dispatch, customerId);
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

  public static async deleteAddress(
    ACTION_TYPE: string, dispatch: Function, addressId: string, customerId: string,
  ): Promise<any> {
    try {
      const token = await RefreshTokenService.getActualToken(dispatch);
      setAuthToken(token);

      const response: any = await api.delete(
        `customers/${customerId}/addresses/${addressId}`, {}, {withCredentials: true},
      );

      if (response.ok) {
        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          addressId,
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

  public static async updateAddress(
    ACTION_TYPE: string, dispatch: Function, addressId: string, customerId: string, payload: IAddressItem,
  ): Promise<any> {
    try {
      const token = await RefreshTokenService.getActualToken(dispatch);
      setAuthToken(token);

      const body: any = {
        data: {
          type: 'addresses',
          id: addressId,
          attributes: payload,
        },
      };

      const response: any = await api.patch(
        `customers/${customerId}/addresses/${addressId}`, body, {withCredentials: true},
      );

      if (response.ok) {
        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          addressId,
          data: response.data.data.attributes,
        });
        toast.success('Address updated successfull');
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
