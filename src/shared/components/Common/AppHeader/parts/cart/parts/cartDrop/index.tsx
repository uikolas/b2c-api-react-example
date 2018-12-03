import * as React from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

import { pathCartPage, pathCheckoutPage } from 'src/shared/routes/contentRoutes';
import { AppPrice } from 'src/shared/components/Common/AppPrice';

import { ProductItem } from '../productItem';
import { CartDropProps as Props } from './types';
import { styles } from './styles';
import { connect } from './connect';

@connect
export class CartDropComponent extends React.PureComponent<Props> {
  private deleteFromCart = (cartItemId: string) => {
    const {cartDeleteItemAction, removeItemGuestCartAction, cartId, anonymId, isUserLoggedIn} = this.props;

    if (isUserLoggedIn) {
      cartDeleteItemAction(cartId, cartItemId);
    } else {
      removeItemGuestCartAction(cartId, cartItemId, anonymId);
    }
  };

  public render() {
    const {classes, cartItems, totals} = this.props;

    return (
      <div className={ classes.cartDrop }>
        <p className={ classes.title }><strong>Cart</strong></p>

        <ul className={ classes.cartDropProductsList }>
          { cartItems.map(cartItem => (
            <li key={cartItem.sku}>
              <ProductItem productData={ cartItem } deleteItem={ this.deleteFromCart }/>
            </li>
          )) }
        </ul>

        <div className={ classes.cartTotalContainer }>
          <div className={ classes.cartTotal }>
            <span>Discounts</span>
            <AppPrice
              value={ -totals.discountTotal }
              extraClassName={ classes.priceTotal }
            />
          </div>
          <div className={ classes.cartTotal }>
            <span>Total</span>
            <AppPrice
              value={ totals.grandTotal }
              extraClassName={ classes.priceTotal }
            />
          </div>
        </div>

        <div className={ classes.cartBtns }>
          <Button
            variant="outlined" color="primary"
            component={ ({innerRef, ...props}) => <Link { ...props } to={ pathCartPage }/> }
          >
            Cart
          </Button>
          <Button
            variant="contained"
            color="primary"
            component={ ({innerRef, ...props}) => <Link { ...props } to={ pathCheckoutPage }/> }
          >
            Checkout
          </Button>
        </div>
      </div>
    );
  }
}

export const CartDrop = withStyles(styles)(CartDropComponent);
