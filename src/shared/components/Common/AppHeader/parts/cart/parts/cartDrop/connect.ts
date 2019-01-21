import { bindActionCreators, Dispatch } from 'redux';

import { reduxify } from 'src/shared/lib/redux-helper';
import { cartDeleteItemAction, removeItemGuestCartAction } from '@stores/actions/common/cart';
import { ICartState } from '@stores/reducers/common/cart/types';
import { isUserAuthenticated } from '@stores/reducers/pages/login';
import { getAnonymId } from '@stores/reducers/common/init';
import {getCartId, isCartStateLoading} from "@stores/reducers/common/cart/selectors";

const mapStateToProps = (state: any, ownProps: any) => {
  const cartProps: ICartState = state.cart ? state.cart : null;
  const isUserLoggedIn = isUserAuthenticated(state, ownProps);
  const anonymId = getAnonymId(state, ownProps);
  const isCartLoading = isCartStateLoading(state, ownProps);

  return ({
    cartId: getCartId(state, ownProps),
    totals: cartProps && cartProps.data ? cartProps.data.totals : ownProps.totals,
    cartItems: cartProps && cartProps.data ? cartProps.data.items : ownProps.items,
    isUserLoggedIn,
    anonymId,
    isCartLoading,
  });
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      cartDeleteItemAction,
      removeItemGuestCartAction,
    },
    dispatch,
  );

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
