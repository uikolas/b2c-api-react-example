import * as React from 'react';
import { FormattedPlural } from 'react-intl';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { createCartItemAddToCart } from 'src/shared/helpers/cart/item';
import { AppMain } from 'src/shared/components/Common/AppMain';
import { CartRows } from './CartRows';
import { OrderSummary } from './OrderSummary';
import { styles } from './styles';
import { connect } from './connect';
import { CartPageProps, CartPageState } from './types';

@connect
export class CartPageBase extends React.Component<CartPageProps, CartPageState> {
  private listRef: React.RefObject<HTMLDivElement> = React.createRef();

  public state: CartPageState = {
    heightListItem: 129,
    voucherCode: '',
  };

  public componentDidMount() {
    window.addEventListener('resize', this.setListItemHeight);
    this.setListItemHeight();
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.setListItemHeight);
  }

  public componentDidUpdate() {
    this.setListItemHeight();
  }

  private setListItemHeight = () => {
    if (this.listRef && this.listRef.current && this.listRef.current.offsetWidth * 0.2 !== this.state.heightListItem) {
      this.setState({heightListItem: this.listRef.current.offsetWidth * 0.2});
    }
  };

  public handleDeleteItem = (sku: string) => {
    const {cartDeleteItemAction, removeItemGuestCartAction, cartId, isUserLoggedIn, anonymId} = this.props;

    if (isUserLoggedIn) {
      cartDeleteItemAction(cartId, sku);
    } else {
      removeItemGuestCartAction(cartId, sku, anonymId);
    }
  };

  public handleChangeQty = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value}: {name: string, value: string} = event.target;
    const {
      cartDeleteItemAction,
      removeItemGuestCartAction,
      updateItemInCartAction,
      updateGuestCartAction,
      cartId,
      isUserLoggedIn,
      anonymId,
    } = this.props;
    // If is selected 0, the cart item should be removed from the cart
    if (+value <= 0) {
      if (isUserLoggedIn) {
        cartDeleteItemAction(cartId, name);
      } else {
        removeItemGuestCartAction(cartId, name, anonymId);
      }
    } else {
      if (isUserLoggedIn) {
        updateItemInCartAction(
          createCartItemAddToCart(name, +value),
          this.props.cartId,
        );
      } else {
        updateGuestCartAction(
          createCartItemAddToCart(name, +value),
          this.props.cartId,
          anonymId,
        );
      }
    }
  };

  public handleChangeVouchercode = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({voucherCode: e.target.value});
  };

  public render() {
    const {classes, items, totals, isUserLoggedIn} = this.props;
    const {heightListItem, voucherCode} = this.state;

    if (!items || !items.length) {
      return (
        <AppMain>
          <Grid item xs={ 12 }>
            <Typography
              variant="display2"
              noWrap
              align="center"
            >
              Empty cart, go shopping
            </Typography>
          </Grid>
          <Grid item xs={ 8 }>
            <div className={ classes.fullWidth } ref={ this.listRef }/>
          </Grid>
        </AppMain>
      );
    }

    return (
      <AppMain>
        <Grid item xs={ 12 } container spacing={ 24 } className={ classes.root }>
          <Grid item xs={ 12 } md={ 8 }>
            <Typography variant="display1" noWrap align="left" color="primary">
              <span>{ isUserLoggedIn ? 'Cart' : 'Cart (guest)' }</span>
              <span>{ ` has ${items.length} ` }</span>
              <FormattedPlural value={ items.length } one='item' other='items'/>
            </Typography>
            <div className={ classes.listTitle } ref={ this.listRef }>
              <div style={ {width: '20%'} }>Item</div>
              <div className={ classes.itemWrapper }/>
              <div className={ classes.quantityForm }>Quantity</div>
              <div className={ classes.priceWrapper }>Price</div>
            </div>
            <Divider className={ classes.fullWidth }/>
            <List>
              <CartRows
                items={items}
                heightListItem={heightListItem}
                handleDeleteItem={this.handleDeleteItem}
                handleChangeQty={this.handleChangeQty}
              />
            </List>
          </Grid>

          <OrderSummary
            handleChangeVouchercode={this.handleChangeVouchercode}
            voucherCode={voucherCode}
            totals={totals}
          />
        </Grid>
      </AppMain>
    );
  }
}

export const CartPage = withStyles(styles)(CartPageBase);

export default CartPage;
