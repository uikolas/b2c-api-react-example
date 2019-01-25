import { bindActionCreators, Dispatch } from 'redux';

import { reduxify } from 'src/shared/lib/redux-helper';
import {
  cartDeleteItemAction,
  removeItemGuestCartAction,
  updateItemInCartAction,
  updateGuestCartAction
} from '@stores/actions/common/cart';
import { isUserAuthenticated } from '@stores/reducers/pages/login';
import { getAnonymId } from '@stores/reducers/common/init';
import {ICartTotals, ICartItem, TCartId } from "src/shared/interfaces/cart";
import {getCartId, getCartTotals, getProductsFromCart} from "@stores/reducers/common/cart/selectors";
import {IReduxOwnProps, IReduxStore} from "src/shared/stores/reducers/types";

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
  const isUserLoggedIn: boolean = isUserAuthenticated(state, ownProps);
  const {items, totalQty}: {items: ICartItem[], totalQty: number} = getProductsFromCart(state, ownProps);
  const cartId: TCartId = getCartId(state, ownProps);
  const totals: ICartTotals = getCartTotals(state, ownProps);
  const anonymId: string = getAnonymId(state, ownProps);

  return (
    {
      items,
      totals,
      cartId,
      isUserLoggedIn,
      anonymId,
      totalQty,
    }
  );
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      cartDeleteItemAction,
      removeItemGuestCartAction,
      updateItemInCartAction,
      updateGuestCartAction,
    },
    dispatch,
  );

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
