// tslint:disable:max-file-line-count

import api, { setAuthToken } from 'src/shared/services/api';
import { toast } from 'react-toastify';
import { RefreshTokenService } from 'src/shared/services/Common/RefreshToken/index';
import {IWishlist, IWishlistProduct, TWishListId} from 'src/shared/interfaces/wishlist';
import { ADD_WISHLIST } from '@stores/actionTypes/pages/wishlist';
import { WishlistAuthenticateErrorMessage } from 'src/shared/translation/translations';
import {
  WishlistCreated,
  WishlistDeleted,
  WishlistAddProduct,
  WishlistRemoveItems,
} from 'src/shared/translation/translations';
import { ApiServiceAbstract } from 'src/shared/services/apiAbstractions/ApiServiceAbstract';
import * as cartActions from "@stores/actions/common/cart";
import {IApiResponseData} from "src/shared/services/types";
import {
  IWishlistRawData,
  IWishlistRawResponse,
  TRowWishlistIncludedResponse
} from "src/shared/services/Pages/Wishlist/types";

interface IRequestBody {
  data: {
    type: string;
    include?: string;
    attributes: {};
  };
}


export class WishlistService extends ApiServiceAbstract {
  public static async getLists(ACTION_TYPE: string, dispatch: Function): Promise<void> {
    try {
      const token = await RefreshTokenService.getActualToken(dispatch);
      if (!token) {
        throw new Error(WishlistAuthenticateErrorMessage);
      }
      setAuthToken(token);
      const response: IApiResponseData = await api.get('wishlists', {}, {withCredentials: true});

      if (response.ok) {
        const wishlists: IWishlist[] = response.data.data.map((
          list: IWishlistRawData
        ) => WishlistService.parseWishlistResponse(list));

        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          payloadWishlistDataFulfilled: {wishlists},
        });
      } else {
        const errorMessage = this.getParsedAPIError(response);
        dispatch({
          type: ACTION_TYPE + '_REJECTED',
          payloadRejected: {error: errorMessage},
        });
        toast.error('Request Error: ' + errorMessage);
      }

    } catch (error) {
      dispatch({
        type: ACTION_TYPE + '_REJECTED',
        payloadRejected: {error: error.message},
      });
      toast.error('Unexpected Error: ' + error.message);
    }
  }

  public static async getWishlist(ACTION_TYPE: string, dispatch: Function, wishlistId: string): Promise<void> {
    try {
      const token = await RefreshTokenService.getActualToken(dispatch);
      setAuthToken(token);

      const response: IApiResponseData = await api.get(`wishlists/${wishlistId}`, {}, {withCredentials: true});

      if (response.ok) {
        let products: IWishlistProduct[] = [];
        const wishlist: IWishlist = WishlistService.parseWishlistResponse(response.data.data);

        if (response.data.included) {
          products = WishlistService.parseWishlistItems(response.data.included);
        }

        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          payloadWishlistDataFulfilled: {
            data: wishlist,
            products,
          },
        });
      } else {
        const errorMessage = this.getParsedAPIError(response);
        dispatch({
          type: ACTION_TYPE + '_REJECTED',
          payloadRejected: {error: errorMessage},
        });
        toast.error('Request Error: ' + errorMessage);
      }

    } catch (error) {
      dispatch({
        type: ACTION_TYPE + '_REJECTED',
        payloadRejected: {error: error.message},
      });
      toast.error('Unexpected Error: ' + error.message);
    }
  }

  public static async addWishlist(ACTION_TYPE: string, dispatch: Function, name: string): Promise<string> {
    try {
      const token = await RefreshTokenService.getActualToken(dispatch);
      setAuthToken(token);

      const body: IRequestBody = {
        data: {
          type: 'wishlists',
          attributes: {name},
        },
      };

      const response: IApiResponseData = await api.post('wishlists', body, {withCredentials: true});

      if (response.ok) {
        toast.success(WishlistCreated);
        const parsedWishlist: IWishlist = WishlistService.parseWishlistResponse(response.data.data);
        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          payloadWishlistDataFulfilled: {data: parsedWishlist},
        });
        return parsedWishlist.id;
      } else {
        const errorMessage = this.getParsedAPIError(response);
        dispatch({
          type: ACTION_TYPE + '_REJECTED',
          payloadRejected: {error: errorMessage},
        });
        toast.error('Request Error: ' + errorMessage);
        return '';
      }

    } catch (error) {
      dispatch({
        type: ACTION_TYPE + '_REJECTED',
        payloadRejected: {error: error.message},
      });
      toast.error('Unexpected Error: ' + error.message);
      return '';
    }
  }

  public static async deleteWishlist(ACTION_TYPE: string, dispatch: Function, wishlistId: TWishListId): Promise<void> {
    try {
      const token = await RefreshTokenService.getActualToken(dispatch);
      setAuthToken(token);

      const response: IApiResponseData = await api.delete(`wishlists/${wishlistId}`, {}, {withCredentials: true});

      if (response.ok) {
        toast.success(WishlistDeleted);
        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          payloadWishlistDataFulfilled: {wishlistId},
        });
      } else {
        const errorMessage = this.getParsedAPIError(response);
        dispatch({
          type: ACTION_TYPE + '_REJECTED',
          payloadRejected: {error: errorMessage},
        });
        toast.error('Request Error: ' + errorMessage);
      }

    } catch (error) {
      dispatch({
        type: ACTION_TYPE + '_REJECTED',
        payloadRejected: {error: error.message},
      });
      toast.error('Unexpected Error: ' + error.message);
    }
  }

  public static async updateWishlist(ACTION_TYPE: string,
                                     dispatch: Function,
                                     wishlistId: string,
                                     name: string): Promise<void> {
    try {
      const token = await RefreshTokenService.getActualToken(dispatch);
      setAuthToken(token);

      const body: IRequestBody = {
        data: {
          type: 'wishlists',
          attributes: {name},
        },
      };

      const response: IApiResponseData = await api.patch(`wishlists/${wishlistId}`, body, {withCredentials: true});

      if (response.ok) {
        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          payloadWishlistDataFulfilled: {
            data: WishlistService.parseWishlistResponse(response.data.data),
            wishlistId,
          },
        });
      } else {
        const errorMessage = this.getParsedAPIError(response);
        dispatch({
          type: ACTION_TYPE + '_REJECTED',
          payloadRejected: {error: errorMessage},
        });
        toast.error('Request Error: ' + errorMessage);
      }

    } catch (error) {
      dispatch({
        type: ACTION_TYPE + '_REJECTED',
        payloadRejected: {error: error.message},
      });
      toast.error('Unexpected Error: ' + error.message);
    }
  }

  public static async addItemWishlist(ACTION_TYPE: string,
                                      dispatch: Function,
                                      wishlistId: string | null,
                                      sku: string): Promise<void> {
    try {
      const token = await RefreshTokenService.getActualToken(dispatch);
      setAuthToken(token);
      let id: string | null = wishlistId;

      if (!wishlistId) {
        id = await WishlistService.addWishlist(ADD_WISHLIST, dispatch, 'My first wishlist');
      }

      if (!id) {
        throw new Error('Wishlist doesn`t created.');
      }

      const body: IRequestBody = {
        data: {
          type: 'wishlist-items',
          attributes: {sku},
        },
      };

      const endpointItems = `wishlists/${id}/wishlist-items`;
      const response: IApiResponseData = await api.post(endpointItems, body, {withCredentials: true});

      if (response.ok) {
        const endpoint = `wishlists/${id}`;
        const wishlistResponse: IApiResponseData = await api.get(endpoint, {include: ''}, {withCredentials: true});
        const wishlist: IWishlist = WishlistService.parseWishlistResponse(wishlistResponse.data.data);

        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          payloadWishlistDataFulfilled: {data: wishlist},
        });
        toast.success(`${WishlistAddProduct} ${wishlist.name}.`);
      } else {
        const errorMessage = this.getParsedAPIError(response);
        dispatch({
          type: ACTION_TYPE + '_REJECTED',
          payloadRejected: {error: errorMessage},
        });
        toast.error('Request Error: ' + errorMessage);
      }

    } catch (error) {
      dispatch({
        type: ACTION_TYPE + '_REJECTED',
        payloadRejected: {error: error.message},
      });
      toast.error('Unexpected Error: ' + error.message);
    }
  }

  public static async deleteItemWishlist(ACTION_TYPE: string,
                                         dispatch: Function,
                                         wishlistId: string,
                                         sku: string): Promise<void> {
    try {
      const token = await RefreshTokenService.getActualToken(dispatch);
      setAuthToken(token);

      const response: IApiResponseData = await api.delete(
        `wishlists/${wishlistId}/wishlist-items/${sku}`,
        {},
        {withCredentials: true}
      );

      if (response.ok) {
        toast.success(WishlistRemoveItems);
        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
          payloadWishlistProductFulfilled: {
            wishlistId,
            sku,
          },
        });
      } else {
        const errorMessage = this.getParsedAPIError(response);
        dispatch({
          type: ACTION_TYPE + '_REJECTED',
          payloadRejected: {error: errorMessage},
        });
        toast.error('Request Error: ' + errorMessage);
      }

    } catch (error) {
      dispatch({
        type: ACTION_TYPE + '_REJECTED',
        payloadRejected: {error: error.message},
      });
      toast.error('Unexpected Error: ' + error.message);
    }
  }

  public static async removeMultiItems(dispatch: Function, wishlistId: string, productsList: string[]): Promise<void> {
    try {
      const token = await RefreshTokenService.getActualToken(dispatch);
      setAuthToken(token);

      for (const sku of productsList) {
        await api.delete(
          `wishlists/${wishlistId}/wishlist-items/${sku}`,
          {},
          {withCredentials: true}
        );
      }

      await WishlistService.getWishlist('DETAIL_WISHLIST', dispatch, wishlistId);
    } catch (err) {
      dispatch(cartActions.cartAddItemRejectedStateAction(err.message));
      toast.error('Unexpected Error: ' + err.message);
    }
  }

  private static parseWishlistResponse(data: IWishlistRawData): IWishlist {
    const wishlist: IWishlist = {
      id: data.id,
      name: data.attributes.name,
      numberOfItems: data.attributes.numberOfItems || 0,
      createdAt: data.attributes.createdAt,
      updatedAt: data.attributes.updatedAt,
    };

    return wishlist;
  }

  private static parseWishlistItems(included: IWishlistRawResponse["included"]): IWishlistProduct[] {
    const items: {[key: string]: IWishlistProduct} = {};

    included.forEach((row: TRowWishlistIncludedResponse) => {
      if (!items[row.id]) {
        items[row.id] = {attributes: [], image: ''} as IWishlistProduct;
      }

      if (row.type === 'concrete-product-image-sets') {
        if (
          row.attributes.imageSets &&
          row.attributes.imageSets.length &&
          row.attributes.imageSets[0].images &&
          row.attributes.imageSets[0].images.length
        ) {
          items[row.id].image = row.attributes.imageSets[0].images[0].externalUrlSmall;
        }
      } else {
        if (row.type === 'concrete-products') {
          items[row.id].sku = row.attributes.sku;
          items[row.id].name = row.attributes.name;
          Object.keys(row.attributes.attributes).forEach((attr: string) => {
            if (row.attributes.superAttributesDefinition.includes(attr)) {
              const attributeKey: string = String(attr);
              const attributeValue: string = String(row.attributes.attributes[attr]);
              items[row.id].attributes.push({[attributeKey]: attributeValue});
            }
          });
        } else {
          if (row.type === 'concrete-product-prices') {
            items[row.id].prices = row.attributes.prices;
          } else {
            if (row.type === 'concrete-product-availabilities') {
              items[row.id].availability = row.attributes.availability;
            }
          }
        }
      }
    });

    return Object.values(items);
  }
}
