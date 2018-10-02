import api, {setAuthToken} from '../api';
import { toast } from 'react-toastify';
import {API_WITH_FIXTURES} from '../../constants/Environment';
import {cartCreateFixture} from './cartFixture';
import {getTestDataPromise} from "../apiFixture/index";
import {TProductQuantity, TProductSKU} from "../../interfaces/product";
import {TCartId} from "../../interfaces/cart";
import {parseAddToCartResponse} from "../cartHelper";
import {parseCartCreateResponse} from "../cartHelper/response";
import {RefreshTokenService} from './RefreshToken';
import {CART_CREATE} from "../../constants/ActionTypes/Common/Cart";
import {cartAddItemPendingStateAction, cartCreatePendingStateAction} from "../../actions/Common/Cart";

export interface ICartCreatePayload {
  priceMode: string;
  currency: string;
  store: string;
}

export interface ICartAddItem {
  sku: TProductSKU;
  quantity: TProductQuantity;
}

export const authenticateErrorText = 'You should register or login to add item to the cart';

export class CartService {

  public static async cartCreate(ACTION_TYPE: string, dispatch: Function, payload: ICartCreatePayload): Promise<any> {
    try {

      dispatch(cartCreatePendingStateAction);

      const body = {
        data: {
          type: "carts",
          attributes: payload,
        }
      };

      let response: any;
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
          if (!token) {
            throw new Error(authenticateErrorText);
          }
          setAuthToken(token);
          response = await api.post('carts', body, { withCredentials: true });
        } catch (err) {
          console.error('CartService: cartCreate: err', err);
        }
      }

      console.log('cartCreate response: ', response);
      if (response.ok) {
        const responseParsed = parseCartCreateResponse(response.data);
        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          payload: responseParsed,
        });
        toast.success('You have successfully created a cart');
        return responseParsed.id;
      } else {
        dispatch({
          type: ACTION_TYPE + '_REJECTED',
          error: {error: response.problem},
        });
        toast.error('Request Error: ' + response.problem);
        return null;
      }

    } catch (error) {
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
                                  cartId: TCartId | null,
                                  payloadCartCreate: ICartCreatePayload): Promise<any> {
    try {
      // Create cart if not exist
      if (!cartId) {
        try {
          cartId = await CartService.cartCreate(CART_CREATE, dispatch, payloadCartCreate);
        } catch (err) {
          console.error('await CartService.cartCreate err', err);
        }
      }

      dispatch(cartAddItemPendingStateAction);

      const body = {
        data: {
          type: "items",
          attributes: payload,
        }
      };

      let response: any;

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
          const endpoint = `carts/${cartId}/items`;
          const token = await RefreshTokenService.getActualToken(dispatch);
          console.log('CartService: cartAddItem: token', token);
          if (!token) {
            throw new Error(authenticateErrorText);
          }
          setAuthToken(token);
          response = await api.post(endpoint, body, { withCredentials: true });
        } catch (err) {
          console.error('CartService: cartAddItem: err', err);
        }
      }

      console.log('cartAddItem response: ', response);

      if (response.ok) {
        const responseParsed = parseAddToCartResponse(response.data);
        console.log('cartAddItem responseParsed: ', responseParsed);

        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          payload: responseParsed,
        });
        toast.success('You have successfully added an item to the cart ');
        return responseParsed;
      } else {
        dispatch({
          type: ACTION_TYPE + '_REJECTED',
          error: {error: response.problem},
        });
        toast.error('Request Error: ' + response.problem);
        return null;
      }

    } catch (error) {
      dispatch({
        type: ACTION_TYPE + '_REJECTED',
        payload: {error: error.message},
      });
      toast.error('Unexpected Error: ' + error.message);
      return null;
    }
  }
}
