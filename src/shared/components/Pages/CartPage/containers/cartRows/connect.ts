import { reduxify } from '@lib/redux-helper';
import {
    cartDeleteItemAction,
    removeItemGuestCartAction,
    updateItemInCartAction,
    updateGuestCartAction
} from '@stores/actions/common/cart';
import { bindActionCreators, Dispatch } from 'redux';
import { ICartItem, TCartId } from '@interfaces/cart';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { getCartId, getProductsFromCart } from '@stores/reducers/common/cart/selectors';
import { isUserAuthenticated } from '@stores/reducers/pages/login';
import { getAnonymId } from '@stores/reducers/common/init';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isUserLoggedIn: boolean = isUserAuthenticated(state, ownProps);
    const anonymId: string = getAnonymId(state, ownProps);
    const { items }: { items: ICartItem[] } = getProductsFromCart(state, ownProps);
    const cartId: TCartId = getCartId(state, ownProps);

    return ({
        isUserLoggedIn,
        anonymId,
        items,
        cartId,
    });
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
    {
        cartDeleteItemAction,
        removeItemGuestCartAction,
        updateItemInCartAction,
        updateGuestCartAction,
    },
    dispatch,
);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
