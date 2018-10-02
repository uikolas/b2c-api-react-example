import api, {setAuthToken} from '../api';
import { toast } from 'react-toastify';
import {API_WITH_FIXTURES} from '../../constants/Environment';
import {cartCreateFixture} from './cartFixture';
import {getTestDataPromise} from "../apiFixture/index";
import {RefreshTokenService} from './RefreshToken';
import {TAccessToken} from "../../interfaces/login";
import {TProductQuantity, TProductSKU} from "../../interfaces/product";
import {TCartId} from "../../interfaces/cart";

export interface ICartCreatePayload {
  priceMode: string;
  currency: string;
  store: string;
}

export interface ICartAddItem {
  sku: TProductSKU;
  quantity: TProductQuantity;
}

export class CartService {

  public static async cartCreate(
                                  ACTION_TYPE: string,
                                  dispatch: Function,
                                  payload: ICartCreatePayload,
                                  accessToken: TAccessToken): Promise<any> {
    try {
      const body = {
        data: {
          type: "carts",
          attributes: payload,
        }
      };

      let response: any;
      //setAuthToken(accessToken);
      // TODO: this is only for development reasons - remove after finish
      if(API_WITH_FIXTURES) {
        const result = {
          ok: true,
          problem: 'Test API_WITH_FIXTURES',
          data: cartCreateFixture.data,
        };
        response = await getTestDataPromise(result);
        console.log('+++API_WITH_FIXTURES response: ', response);
      } else {
        try {
          const token = await RefreshTokenService.getActualToken(dispatch);
          response = await api.post('carts', body, { withCredentials: true, headers: {Authorization: `Bearer ${token}`} });
        } catch (err) {
          console.error(err);
        }
      }

      console.log('cartCreate response: ', response);

      if (response.ok) {
        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          payload: response.data.data,
        });
        toast.success('You have successfully created a cart');
        return response.data;
      } else {
        console.error('cartCreate', response.problem);
        dispatch({
          type: ACTION_TYPE + '_REJECTED',
          error: {error: response.problem},
        });
        toast.error('Request Error: ' + response.problem);
        return null;
      }

    } catch (error) {
      console.error('register', error);
      dispatch({
        type: ACTION_TYPE + '_REJECTED',
        payload: {error: error.message},
      });
      toast.error('Unexpected Error: ' + error.message);
      return null;
    }
  }

  // Adds an item to the cart.
  public static async cartAddItem(
                                  ACTION_TYPE: string,
                                  dispatch: Function,
                                  payload: ICartAddItem,
                                  cartId: TCartId,
                                  accessToken: TAccessToken): Promise<any> {
    try {
      const body = {
        data: {
          type: "items",
          attributes: payload,
        }
      };

      let response: any;
      setAuthToken(accessToken);
      // TODO: this is only for development reasons - remove after finish
      if(API_WITH_FIXTURES) {
        const result = {
          ok: true,
          problem: 'Test API_WITH_FIXTURES',
          data: cartCreateFixture.data,
        };
        response = await getTestDataPromise(result);
        console.log('+++API_WITH_FIXTURES response: ', response);
      } else {
        const endpoint = `carts/${cartId}/items`;
        response = await api.post(endpoint, body, { withCredentials: true });
      }

      console.log('cartAddItem response: ', response);

      if (response.ok) {
        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          payload: response.data.data,
        });
        toast.success('You have successfully added an item to the cart ' + cartId);
        return response.data;
      } else {
        console.error('cartCreate', response.problem);
        dispatch({
          type: ACTION_TYPE + '_REJECTED',
          error: {error: response.problem},
        });
        toast.error('Request Error: ' + response.problem);
        return null;
      }

    } catch (error) {
      console.error('cartAddItem', error);
      dispatch({
        type: ACTION_TYPE + '_REJECTED',
        payload: {error: error.message},
      });
      toast.error('Unexpected Error: ' + error.message);
      return null;
    }
  }
}
