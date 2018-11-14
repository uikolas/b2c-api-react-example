import { bindActionCreators, Dispatch } from 'redux';

import { reduxify } from 'src/shared/lib/redux-helper';
import {
  cartDeleteItemAction,
  removeItemGuestCartAction,
  updateGuestCartAction,
  updateItemInCartAction,
} from 'src/shared/actions/Common/Cart';
import { getCartId, ICartState } from 'src/shared/reducers/Common/Cart';
import { isUserAuthenticated } from 'src/shared/reducers/Pages/Login';
import { getAnonymId } from 'src/shared/reducers/Common/Init';
import { RouteProps } from 'react-router';
import { TCartId } from 'src/shared/interfaces/cart';

const mapStateToProps = (state: any, ownProps: any) => {
  const isUserLoggedIn: boolean = isUserAuthenticated(state, ownProps);
  const routerProps: RouteProps = state.routing ? state.routing : {};
  const cartProps: ICartState = state.cart ? state.cart : null;
  const cartId: TCartId = getCartId(state, ownProps);
  const anonymId: string = getAnonymId(state, ownProps);

  return (
    {
      location: routerProps.location ? routerProps.location : ownProps.location,
      items: cartProps && cartProps.data ? cartProps.data.items : ownProps.items,
      totals: cartProps && cartProps.data ? cartProps.data.totals : ownProps.totals,
      cartId,
      isUserLoggedIn,
      anonymId,
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
