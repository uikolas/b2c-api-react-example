import * as React from 'react';
import { NavLink } from 'react-router-dom';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';

import { ICartItem } from 'src/shared/reducers/Common/Cart';
import { SprykerButton } from 'src/shared/components/UI/SprykerButton';
import { ICartTotals, TCartId } from 'src/shared/interfaces/cart';
import { createCartItemAddToCart } from 'src/shared/helpers/cart/item';
import { pathSearchPage } from 'src/shared/routes/contentRoutes';
import { AppMain } from '../../Common/AppMain';
import { AppPrice } from '../../Common/AppPrice';
import { styles } from './styles';
import { connect } from './connect';

interface CartPageProps extends WithStyles<typeof styles> {
  dispatch: Function;
  location: string;
  items: Array<ICartItem>;
  totals: ICartTotals;
  cartId: TCartId;
  isUserLoggedIn: boolean;
  anonymId: string;
  updateItemInCartAction: Function;
  cartDeleteItemAction: Function;
  removeItemGuestCartAction: Function;
  updateGuestCartAction: Function;
}

interface CartPageState {
  anchorEl: HTMLElement | null;
  currentItem: ICartItem | null;
}

export const pageTitle = 'Search results for ';

@connect
export class CartPageBase extends React.Component<CartPageProps, CartPageState> {
  private listRef: React.RefObject<HTMLDivElement> = React.createRef()

  public state: CartPageState = {
    anchorEl: null,
    currentItem: null,
  };

  public handleDeleteItem = (sku: string) => (e: any) => {
    e.preventDefault();

    const {cartDeleteItemAction, removeItemGuestCartAction, cartId, isUserLoggedIn, anonymId} = this.props;

    if (isUserLoggedIn) {
      cartDeleteItemAction(cartId, sku);
    } else {
      removeItemGuestCartAction(cartId, sku, anonymId);
    }
  };

  public openMenu = (item: ICartItem) => (e: any) => {
    this.setState({anchorEl: e.currentTarget, currentItem: item});
  };

  public closeMenu = () => {
    this.setState({anchorEl: null, currentItem: null});
  };

  // Update quantity of the item
  public setItemQty = (e: any) => {
    const newQuantity = e.target.value;
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
    if (newQuantity <= 0) {
      if (isUserLoggedIn) {
        cartDeleteItemAction(cartId, this.state.currentItem.sku);
      } else {
        removeItemGuestCartAction(cartId, this.state.currentItem.sku, anonymId);
      }
    } else {
      if (isUserLoggedIn) {
        updateItemInCartAction(
          createCartItemAddToCart(this.state.currentItem.sku, newQuantity),
          this.props.cartId,
        );
      } else {
        updateGuestCartAction(
          createCartItemAddToCart(this.state.currentItem.sku, newQuantity),
          this.props.cartId,
          anonymId,
        );
      }
    }

    this.closeMenu();
  };

  public render() {
    const {classes, items, totals} = this.props;

    const quantities: number[] = [];

    if (this.state.currentItem) {
      const {availableQuantity} = this.state.currentItem;
      const maxItems = availableQuantity && availableQuantity < 10 ? availableQuantity : 10;

      for (let i = 0; i <= maxItems; i++) {
        quantities.push(i);
      }
    }

    const rows = items.map((item: any) => (
      <ListItem
        key={ item.sku }
        disableGutters
        className={ classes.listItem }
      >
        <div className={ classes.imgWrapper } style={{height: this.listRef.current.offsetWidth}}>
          <img src={ item.image } height={ 100 } />
          <div className={ classes.actionAreaOverlay } />
        </div>
        <div className={classes.itemWrapper}>
          <div className={classes.itemName}>{ item.name }</div>
          <div>
            <span>Remove</span>
            <IconButton onClick={ this.handleDeleteItem(item.sku) }>
              <DeleteIcon className={ classes.delIcon }/>
            </IconButton>
          </div>
        </div>
        <div>
          <span>{ item.quantity }</span>
        </div>
      </ListItem>
    ));

    if (!items || !items.length) {
      return (
        <AppMain>
          <Grid item xs={ 12 }>
            <Typography
              variant="display2"
              noWrap
              align="center"
              className={ classes.title }
            >
              Empty cart, go shopping
            </Typography>
          </Grid>
        </AppMain>
      );
    }

    return (
      <AppMain>
        <Grid item xs={ 8 }>
          <Typography
            variant="headline"
            noWrap
            align="left"
          >
            { `Cart has ${items.length} items` }
          </Typography>
          <div className={ classes.listWrapper } ref={this.listRef}>
            <List>
              { rows }
            </List>
          </div>
        </Grid>

        <Grid
          item xs={ 4 }
          container
          direction="column"
          justify="space-evenly"
          alignItems="center"
        >
          <Typography
            variant="headline"
            noWrap
            align="left"
            className={ classes.title }
          >
            { 'Order summary' }
          </Typography>
          <div className={classes.totalMsg}>
            <div>Subtotal</div>
            <div>{ totals && <AppPrice value={ totals.subtotal }/> }</div>
          </div>
          <div className={classes.totalMsg}>
            <div>Tax</div>
            <div>{ totals && <AppPrice value={ totals.taxTotal }/> }</div>
          </div>
          <div className={classes.totalMsg}>
            <div>Discount</div>
            <div>{ totals && <AppPrice value={ totals.discountTotal }/> }</div>
          </div>

          <Divider/>

          <div className={classes.totalMsg}>
            <div>Grand Total</div>
            <div>{ totals && <AppPrice value={ totals.grandTotal }/> }</div>
          </div>

          <Divider/>

          <Grid item xs={ 12 } container justify="center" className={ classes.footer }>
            <NavLink to={ pathSearchPage }>
              <SprykerButton title="continue to checkout"/>
            </NavLink>
          </Grid>

        </Grid>

        <Menu
          anchorEl={ this.state.anchorEl }
          open={ !!this.state.anchorEl }
          onClose={ this.closeMenu }
        >
          {
            quantities.map((i: number) => (
              <MenuItem
                value={ i }
                key={ `qty-${i}` }
                selected={ this.state.currentItem && i === this.state.currentItem.quantity }
                onClick={ this.setItemQty }
              >{ i }</MenuItem>
            ))
          }
        </Menu>
      </AppMain>
    );
  }
}

export const CartPage = withStyles(styles)(CartPageBase);

export default CartPage;
