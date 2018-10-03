import api, {setAuthToken} from '../api';
import { toast } from 'react-toastify';
import {API_WITH_FIXTURES} from '../../constants/Environment';
import {cartCreateFixture, cartUpdateQuantityFixture} from './cartFixture';
import {getTestDataPromise} from "../apiFixture/index";
import {TProductQuantity, TProductSKU} from "../../interfaces/product";
import {TCartId} from "../../interfaces/cart";
import {parseAddToCartResponse} from "../cartHelper";
import {parseCartCreateResponse} from "../cartHelper/response";
import {RefreshTokenService} from './RefreshToken';
import {
  cartAddItemFulfilledStateAction,
  cartAddItemPendingStateAction,
  cartAddItemRejectedStateAction,
  cartCreateFulfilledStateAction,
  cartCreatePendingStateAction,
  cartCreateRejectedStateAction, cartUpdateItemFulfilledStateAction, cartUpdateItemPendingStateAction,
  cartUpdateItemRejectedStateAction
} from "../../actions/Common/Cart";

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

  public static async cartCreate(dispatch: Function, payload: ICartCreatePayload): Promise<any> {
    try {
      dispatch(cartCreatePendingStateAction());

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
        dispatch(cartCreateFulfilledStateAction(responseParsed));
        return responseParsed.id;
      } else {
        dispatch(cartCreateRejectedStateAction(response.problem));
        toast.error('Request Error: ' + response.problem);
        return null;
      }

    } catch (error) {
      dispatch(cartCreateRejectedStateAction(error.message));
      toast.error('Unexpected Error: ' + error.message);
      return null;
    }
  }

  // Adds an item to the cart.
  public static async cartAddItem(dispatch: Function,
                                  payload: ICartAddItem,
                                  cartId: TCartId | null,
                                  payloadCartCreate: ICartCreatePayload): Promise<any> {
    try {
      // Create cart if not exist
      if (!cartId) {
        try {
          cartId = await CartService.cartCreate(dispatch, payloadCartCreate);
        } catch (err) {
          console.error('await CartService.cartCreate err', err);
        }
      }

      dispatch(cartAddItemPendingStateAction());

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
        dispatch(cartAddItemFulfilledStateAction(responseParsed));
        return responseParsed;
      } else {
        dispatch(cartAddItemRejectedStateAction(response.problem));
        toast.error('Request Error: ' + response.problem);
        return null;
      }

    } catch (error) {
      dispatch(cartAddItemRejectedStateAction(error.message));
      toast.error('Unexpected Error: ' + error.message);
      return null;
    }
  }

  public static async cartDeleteItem(ACTION_TYPE: string, dispatch: Function, cartId: string, itemId: string): Promise<any> {
    try {
      const token = await RefreshTokenService.getActualToken(dispatch);
      setAuthToken(token);
      const response: any = await api.delete(`carts/${cartId}/items/${itemId}`, {}, { withCredentials: true });

      if (response.ok) {
        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          itemId,
        });

        const newCart = await api.get(`carts/${cartId}`);

        const responseParsed = parseAddToCartResponse(newCart.data);
        dispatch(cartAddItemFulfilledStateAction(responseParsed));

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
      console.error('Delete item catch:', error);
      dispatch({
        type: ACTION_TYPE + '_REJECTED',
        error: error.message,
      });
      toast.error('Unexpected Error: ' + error.message);
      return null;
    }
  }

  // Update cart item quantity.
  public static async cartUpdateItem( dispatch: Function,
                                      payload: ICartAddItem,
                                      cartId: TCartId | null): Promise<any> {
    try {
      dispatch(cartUpdateItemPendingStateAction());

      const body = {
        data: {
          type: "items",
          attributes: payload,
        }
      };
      const {sku} = payload;
      let response: any;

      // TODO: this is only for development reasons - remove after finish
      if(API_WITH_FIXTURES) {
        const result = {
          ok: true,
          problem: 'Test API_WITH_FIXTURES',
          data: cartUpdateQuantityFixture.data,
        };
        response = await getTestDataPromise(result);
        console.log('+++API_WITH_FIXTURES response: ', response);
      } else {
        try {
          const endpoint = `carts/${cartId}/items/${sku}`;
          const token = await RefreshTokenService.getActualToken(dispatch);
          if (!token) {
            throw new Error(authenticateErrorText);
          }
          setAuthToken(token);
          response = await api.patch(endpoint, body, { withCredentials: true });
        } catch (err) {
          console.error('CartService: cartUpdateItem: err', err);
        }
      }

      console.log('cartUpdateItem response: ', response);

      if (response.ok) {
        const responseParsed = parseAddToCartResponse(response.data);
        console.log('cartUpdateItem responseParsed: ', responseParsed);
        dispatch(cartUpdateItemFulfilledStateAction(responseParsed));
        return responseParsed;
      } else {
        dispatch(cartUpdateItemRejectedStateAction(response.problem));
        toast.error('Request Error: ' + response.problem);
        return null;
      }

    } catch (error) {
      dispatch(cartUpdateItemRejectedStateAction(error.message));
      toast.error('Unexpected Error: ' + error.message);
      return null;
    }
  }
}
