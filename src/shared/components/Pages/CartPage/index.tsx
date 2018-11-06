import * as React from 'react';
import { NavLink } from 'react-router-dom';
import debounce from "lodash/debounce";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Clear';

import { ICartItem } from 'src/shared/reducers/Common/Cart';
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

}

export const pageTitle = 'Search results for ';

@connect
export class CartPageBase extends React.Component<CartPageProps, CartPageState> {
  private listRef: React.RefObject<HTMLDivElement> = React.createRef();

  private heightListItem: number = 129;

  public state: CartPageState = {

  };

  public componentDidMount() {
    if (this.listRef && this.listRef.current) {
      window.addEventListener('resize', this.setListItemHeight);
      this.setListItemHeight();
    }
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.setListItemHeight);
  }

  private setListItemHeight = () => {
    this.heightListItem = this.listRef.current.offsetWidth * 0.2;
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

  public handleChangeQty = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: any = event.target;
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
    if (value <= 0) {
      if (isUserLoggedIn) {
        cartDeleteItemAction(cartId, name);
      } else {
        removeItemGuestCartAction(cartId, name, anonymId);
      }
    } else {
      if (isUserLoggedIn) {
        updateItemInCartAction(
          createCartItemAddToCart(name, value),
          this.props.cartId,
        );
      } else {
        updateGuestCartAction(
          createCartItemAddToCart(name, value),
          this.props.cartId,
          anonymId,
        );
      }
    }
  };

  public render() {
    const {classes, items, totals} = this.props;

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
            <div className={ classes.fullWidth } ref={this.listRef} />
          </Grid>
        </AppMain>
      );
    }

    const rows = items.map((item: any) => {
      const quantities: number[] = [];
      const maxItems = item.availableQuantity < 10 ? item.availableQuantity : 10;

      for (let i = 0; i <= maxItems; i++) {
        quantities.push(i);
      }

      return (
        <ListItem
          key={ item.sku }
          disableGutters
          divider
          className={ classes.listItem }
        >
          <div className={ classes.imgWrapper } style={{ height: this.heightListItem }}>
            <img src={ item.image } height={ this.heightListItem * 0.82 } />
            <div className={ classes.actionAreaOverlay } />
          </div>

          <div className={classes.itemWrapper} style={{ height: this.heightListItem }}>
            <div className={classes.itemName}>{ item.name }</div>
            <div>
              <span className={classes.itemAttr}>Remove</span>
              <IconButton onClick={ this.handleDeleteItem(item.sku) }>
                <DeleteIcon />
              </IconButton>
            </div>
          </div>

          <form
            noValidate
            autoComplete="off"
            className={classes.quantityForm}
            style={{ height: this.heightListItem }}
          >
            <TextField
              required
              select
              name={item.sku}
              value={item.quantity}
              onChange={this.handleChangeQty}
            >
              {
                quantities.map((i: number) => (
                  <MenuItem
                    value={ i }
                    key={ `qty-${item.sku}-${i}` }
                  >{ i }</MenuItem>
                ))
              }
            </TextField>
          </form>

          <div className={classes.priceWrapper} style={{ height: this.heightListItem }}>
            <AppPrice value={ item.calculations.sumPriceToPayAggregation }/>
            {
              item.quantity > 1
                ? <div>
                  <span>(</span>
                  <AppPrice value={ item.calculations.unitPriceToPayAggregation }/>
                  <span> each)</span>
                </div>
                : null
            }
          </div>
        </ListItem>
      );
    });

    return (
      <AppMain>
        <Grid container item xs={ 12 } spacing={ 24 }>
          <Grid item xs={ 8 }>
            <Typography
              variant="headline"
              noWrap
              align="left"
            >
              { `Cart has ${items.length} items` }
            </Typography>
            <div className={ classes.fullWidth } ref={this.listRef}>
              <List>
                <ListItem
                  disableGutters
                  divider
                  className={ classes.listItem }
                >
                  <div>Item</div>

                  <div className={classes.itemWrapper} />

                  <div className={classes.quantityForm}>Quantity</div>

                  <div className={classes.priceWrapper}>Price</div>
                </ListItem>
                { rows }
              </List>
            </div>
          </Grid>

          <Grid item xs={ 4 }>
            <Typography
              variant="headline"
              noWrap
              align="left"
            >
              { 'Order summary' }
            </Typography>
            <Divider className={ classes.fullWidth } />
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

            <Divider className={ classes.fullWidth } />

            <div className={classes.totalMsg}>
              <div>Grand Total</div>
              <div>{ totals && <AppPrice value={ totals.grandTotal }/> }</div>
            </div>

            <Divider className={ classes.fullWidth } />

            <Grid item xs={ 12 } container justify="center" className={ classes.footer }>
              <NavLink to={ pathSearchPage } className={ classes.fullWidth }>
                <Button variant="contained" color="primary" fullWidth>
                  continue to checkout
                </Button>
              </NavLink>
            </Grid>
          </Grid>
        </Grid>
      </AppMain>
    );
  }
}

export const CartPage = withStyles(styles)(CartPageBase);

export default CartPage;
