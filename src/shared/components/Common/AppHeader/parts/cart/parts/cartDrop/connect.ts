import { bindActionCreators, Dispatch } from 'redux';

import { reduxify } from 'src/shared/lib/redux-helper';
import { cartDeleteItemAction, removeItemGuestCartAction } from 'src/shared/actions/Common/Cart';
import { ICartState } from 'src/shared/reducers/Common/Cart/types';
import { isUserAuthenticated } from 'src/shared/reducers/Pages/Login';
import { getAnonymId } from 'src/shared/reducers/Common/Init/index';
import {getCartId, isCartStateLoading} from "src/shared/reducers/Common/Cart/selectors";
import {IReduxOwnProps, IReduxStore} from "src/shared/reducers/types";

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
  const cartProps: ICartState = state.cart ? state.cart : null;
  const isUserLoggedIn = isUserAuthenticated(state, ownProps);
  const anonymId = getAnonymId(state, ownProps);
  const isCartLoading = isCartStateLoading(state, ownProps);

  return ({
    cartId: getCartId(state, ownProps),
    totals: cartProps && cartProps.data ? cartProps.data.totals : null,
    cartItems: cartProps && cartProps.data ? cartProps.data.items : null,
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
