import * as React from 'react';
import { reduxify } from 'src/shared/lib/redux-helper';
import { ICartItem, ICartTotals } from '@interfaces/cart';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { getCartTotals, getProductsFromCart } from '@stores/reducers/common/cart/selectors';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const totals: ICartTotals = getCartTotals(state, ownProps);
    const {items: products}: {items: ICartItem[]} = getProductsFromCart(state, ownProps);

    return {

    };
};

const mapDispatchToProps = (dispatch: Function) => ({
    dispatch,

});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
