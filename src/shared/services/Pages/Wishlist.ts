import api, {setAuthToken} from '../api';
import { toast } from 'react-toastify';
import {RefreshTokenService} from '../Common/RefreshToken';
import {IWishlist} from "../../interfaces/wishlist";


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
        console.info(response.data);
        dispatch({
          type: ACTION_TYPE + '_FULFILLED',
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

  private static parseWishlistResponse(data: any): IWishlist {
    const wishlist: IWishlist = {
      id: data.id,
      name: data.attributes.name,
      numberOfItems: data.attributes.numberOfItems,
      createdAt: data.attributes.createdAt,
      updatedAt: data.attributes.updatedAt,
    };

    return wishlist;
  }
}
