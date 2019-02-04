import { Dispatch } from 'redux';

import { reduxify } from 'src/shared/lib/redux-helper';
import { isUserAuthenticated } from '@stores/reducers/pages/login';
import { getAnonymId } from '@stores/reducers/common/init';
import { ICartTotals, ICartItem, TCartId } from 'src/shared/interfaces/cart';
import { getCartId, getCartTotals, getProductsFromCart } from '@stores/reducers/common/cart/selectors';
import { IReduxOwnProps, IReduxStore } from 'src/shared/stores/reducers/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isUserLoggedIn: boolean = isUserAuthenticated(state, ownProps);
    const { totalQty }: { items: ICartItem[], totalQty: number } = getProductsFromCart(state, ownProps);

    return (
        {
            isCartEmpty: state.cart.data.isCartEmpty,
            isUserLoggedIn,
            totalQty,
        }
    );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
