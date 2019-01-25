import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from 'src/shared/lib/redux-helper';
import { RouteProps } from 'react-router';
import { WishlistState } from '@stores/reducers/pages/wishlist/types';
import { getAppCurrency } from '@stores/reducers/common/init';
import { TCartId } from 'src/shared/interfaces/cart';
import { deleteItemAction, deleteMultiItemsAction } from '@stores/actions/pages/wishlist';
import { addItemToCartAction, multiItemsCartAction } from '@stores/actions/common/cart';
import { push } from 'react-router-redux';
import { getCartId, getTotalItemsQuantity, isCartStateLoading } from '@stores/reducers/common/cart/selectors';
import { IReduxOwnProps, IReduxStore } from 'src/shared/stores/reducers/types';
import { TAppCurrency } from 'src/shared/interfaces/currency';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const wishlistProps: WishlistState = state.pageWishlist ? state.pageWishlist : null;
    const currency: TAppCurrency = getAppCurrency(state, ownProps);
    const cartId: TCartId = getCartId(state, ownProps);
    const cartItemsLength: number = getTotalItemsQuantity(state, ownProps);
    const cartLoading: boolean = isCartStateLoading(state, ownProps);

    return ({
        wishlist: wishlistProps && wishlistProps.data ? wishlistProps.data.currentWishlist : null,
        products: wishlistProps && wishlistProps.data ? wishlistProps.data.currentItems : null,
        isLoading: wishlistProps ? wishlistProps.pending : false,
        currency,
        cartId,
        cartItemsLength,
        cartLoading,
    });
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            changeLocation: (location: string) => push(location),
            deleteItemAction,
            addItemToCartAction,
            multiItemsCartAction,
            deleteMultiItemsAction,
        },
        dispatch,
    );

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
