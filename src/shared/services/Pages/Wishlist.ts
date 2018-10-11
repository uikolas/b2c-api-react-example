import api, {setAuthToken} from '../api';
import { toast } from 'react-toastify';
import {RefreshTokenService} from '../Common/RefreshToken';
import {IWishlist, IWishlistItem} from "../../interfaces/wishlist";
import {CartService, ICartCreatePayload} from "../Common/Cart";
import {
  cartAddItemFulfilledStateAction,
  cartAddItemPendingStateAction,
  cartAddItemRejectedStateAction
} from "../../actions/Common/Cart";
import {cartCreateFixture} from "../fixtures/cartFixture";
import {cartAuthenticateErrorText} from "../../constants/messages/errors";
import {TCartId} from "../../interfaces/cart";
import {parseAddToCartResponse} from "../cartHelper";
import {API_WITH_FIXTURES} from "../../constants/Environment";
import {getTestDataPromise} from "../apiFixture";

export class WishlistService {
  public static async getLists(ACTION_TYPE: string, dispatch: Function): Promise<any> {
    try {
      const token = await RefreshTokenService.getActualToken(dispatch);
      setAuthToken(token);

      const response: any = await api.get('wishlists', {}, { withCredentials: true });

      if (response.ok) {
        const wishlists: IWishlist[] = response.data.data.map((list: any) => WishlistService.parseWishlistResponse(list));

        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          wishlists,
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

  public static async getWishlist(ACTION_TYPE: string, dispatch: Function, wishlistId: string): Promise<any> {
    try {
      const token = await RefreshTokenService.getActualToken(dispatch);
      setAuthToken(token);

      const response: any = await api.get(`wishlists/${wishlistId}`, {}, { withCredentials: true });

      if (response.ok) {
        let items: IWishlistItem[] = [];
        const wishlist: IWishlist = WishlistService.parseWishlistResponse(response.data.data);

        if (response.data.included) {
          items = WishlistService.parseWishlistItems(response.data.included);
        }

        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          wishlist,
          items
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

  public static async addWishlist(ACTION_TYPE: string, dispatch: Function, name: string): Promise<any> {
    try {
      const token = await RefreshTokenService.getActualToken(dispatch);
      setAuthToken(token);

      const body: any = {
        data: {
          type: 'wishlists',
          attributes: {name}
        }
      };

      const response: any = await api.post('wishlists', body, { withCredentials: true });

      if (response.ok) {
        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          wishlist: WishlistService.parseWishlistResponse(response.data.data)
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
          data: WishlistService.parseWishlistResponse(response.data.data),
          wishlistId,
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

  public static async addItemWishlist(ACTION_TYPE: string, dispatch: Function, wishlistId: string, sku: string): Promise<any> {
    try {
      const token = await RefreshTokenService.getActualToken(dispatch);
      setAuthToken(token);

      const body: any = {
        data: {
          type: 'wishlists',
          attributes: {sku}
        }
      };

      const response: any = await api.post(`wishlists/${wishlistId}/wishlist-items`, body, { withCredentials: true });

      if (response.ok) {
        const wishlistResponse: any = await api.get(`wishlists/${wishlistId}`, {include: ''}, { withCredentials: true });
        const wishlist: IWishlist = WishlistService.parseWishlistResponse(wishlistResponse.data.data);

        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          wishlist,
        });
        toast.success(`This product have added in wishlist ${wishlist.name}.`);
        return wishlist;
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

  public static async deleteItemWishlist(ACTION_TYPE: string, dispatch: Function, wishlistId: string, sku: string): Promise<any> {
    try {
      const token = await RefreshTokenService.getActualToken(dispatch);
      setAuthToken(token);

      const response: any = await api.delete(`wishlists/${wishlistId}/wishlist-items/${sku}`, {}, { withCredentials: true });

      if (response.ok) {
        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          wishlistId,
          sku,
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

  private static parseWishlistResponse(data: any): IWishlist {
    const wishlist: IWishlist = {
      id: data.id,
      name: data.attributes.name,
      numberOfItems: data.attributes.numberOfItems || 0,
      createdAt: data.attributes.createdAt,
      updatedAt: data.attributes.updatedAt,
    };

    return wishlist;
  }

  private static parseWishlistItems(included: any[]): IWishlistItem[] {
    const items: {[key: string]: IWishlistItem} = {};

    included.forEach((row: any) => {
      if (!items[row.id]) {
        items[row.id] = {attributes: [], image: ''} as IWishlistItem;
      }

      if (row.type === 'concrete-product-image-sets') {
        if (row.attributes.imageSets && row.attributes.imageSets.length && row.attributes.imageSets[0].images && row.attributes.imageSets[0].images.length) {
          items[row.id].image = row.attributes.imageSets[0].images[0].externalUrlSmall;
        }
      } else if (row.type === 'concrete-products') {
        items[row.id].sku = row.attributes.sku;
        items[row.id].name = row.attributes.name;
        Object.keys(row.attributes.attributes).forEach((attr: string) => {
          if (row.attributes.superAttributesDefinition.includes(attr)) {
            items[row.id].attributes.push({[attr]: row.attributes.attributes[attr]});
          }
        });
      } else if (row.type === 'concrete-product-prices') {
        items[row.id].prices = row.attributes.prices;
      } else if (row.type === 'concrete-product-availabilities') {
        items[row.id].availability = row.attributes.availability;
      }
    });

    return Object.values(items);
  }
}
