import { bindActionCreators, Dispatch } from 'redux';

import { reduxify } from 'src/shared/lib/redux-helper';
import {
  cartDeleteItemAction,
  removeItemGuestCartAction,
  updateItemInCartAction,
  updateGuestCartAction
} from 'src/shared/actions/Common/Cart';
import { isUserAuthenticated } from 'src/shared/reducers/Pages/Login';
import { getAnonymId } from 'src/shared/reducers/Common/Init/Init';
import {ICartTotals, ICartItem, TCartId } from "src/shared/interfaces/cart";
import {getCartId, getCartTotals, getProductsFromCart} from "src/shared/reducers/Common/Cart/selectors";
import {IReduxOwnProps, IReduxStore} from "src/shared/reducers/types";

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
