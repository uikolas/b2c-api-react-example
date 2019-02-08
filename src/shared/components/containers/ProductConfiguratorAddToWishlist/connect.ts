import { reduxify } from 'src/shared/lib/redux-helper';
import { getAnonymId, getPayloadForCreateCart } from '@stores/reducers/common/init';
import {
    getWishlistsCollectionFromStore,
    isPageWishlistStateLoading,
    isWishlistsCollectionInitiated,
} from '@stores/reducers/pages/wishlist/selectors';
import { isUserAuthenticated } from '@stores/reducers/pages/login';
import { addItemAction, getWishlistsAction } from '@stores/actions/pages/wishlist';
import {
    addItemGuestCartAction,
    addItemToCartAction,
    createCartAndAddItemAction,
} from '@stores/actions/common/cart';
import { getCartId, isCartCreated } from '@stores/reducers/common/cart/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ICartCreatePayload } from 'src/shared/services/Common/Cart/types';
import { ICartAddItem, TCartId } from '@interfaces/cart';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isUserLoggedIn = isUserAuthenticated(state, ownProps);
    const cartCreated: boolean = isCartCreated(state, ownProps);
    const cartId: TCartId = getCartId(state, ownProps);
    const payloadForCreateCart: ICartCreatePayload = getPayloadForCreateCart(state, ownProps);
    const isWishListLoading: boolean = isPageWishlistStateLoading(state, ownProps);
    const wishLists = getWishlistsCollectionFromStore(state, ownProps);
    const isWishListsFetched: boolean = isWishlistsCollectionInitiated(state, ownProps);
    const anonymId = getAnonymId(state, ownProps);

    return ({
        cartCreated,
        cartId,
        payloadForCreateCart,
        isUserLoggedIn,
        wishLists,
        isWishListsFetched,
        isWishListLoading,
        anonymId,
    });
};

export const connect = reduxify(
    mapStateToProps,
    (dispatch: Function) => ({
        dispatch,
        getWishLists: () => dispatch(getWishlistsAction()),
        addToWishlist: (wishlistId: string, sku: string) => dispatch(addItemAction(wishlistId, sku)),
        createCartAndAddItem: (
            payload: ICartCreatePayload,
            item: ICartAddItem
        ) => dispatch(createCartAndAddItemAction(payload, item)),
        addItemToCart: (payload: ICartAddItem, cartId: TCartId) => dispatch(addItemToCartAction(payload, cartId)),
        addItemGuestCart: (item: ICartAddItem, anonymId: string) => dispatch(addItemGuestCartAction(item, anonymId))
    }),
);
