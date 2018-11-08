import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { FormattedPlural } from 'react-intl';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
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
  heightListItem: number;
  voucherCode: string;
}

export const pageTitle = 'Search results for ';

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

  public handleChangeVouchercode = (e: any) => {
    this.setState({voucherCode: e.target.value});
  };

  public render() {
    const {classes, items, totals, isUserLoggedIn} = this.props;

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
          <div className={ classes.imgWrapper } style={{ height: this.state.heightListItem }}>
            <img
              src={ item.image }
              style={{ maxWidth: this.state.heightListItem * 0.82, maxHeight: this.state.heightListItem * 0.82 }}
            />
            <div className={ classes.actionAreaOverlay } />
          </div>

          <div className={classes.itemWrapper}>
            <div className={classes.itemName}>{ item.name }</div>
            {
              item.superAttributes
                ? item.superAttributes.map((attr: any, idx: number) => (
                  <div key={`${item.sku}-attr-${idx}`} className={`${classes.itemAttr} ${classes.textCapitalize}`}>
                    <span>{Object.keys(attr)[0].split('_').join(' ')}</span>
                    <span style={{ marginRight: '5px' }}>:</span>
                    <span>{Object.values(attr)[0]}</span>
                  </div>
                ))
                : null
            }
            <div>
              <span className={`${classes.itemAttr} ${classes.remove}`}>remove</span>
              <IconButton onClick={ this.handleDeleteItem(item.sku) }>
                <DeleteIcon />
              </IconButton>
            </div>
          </div>

          <form
            noValidate
            autoComplete="off"
            className={classes.quantityForm}
          >
            <TextField
              required
              select
              name={item.sku}
              value={item.quantity}
              onChange={this.handleChangeQty}
              variant="outlined"
              InputProps={{
                className: classes.select,
              }}
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

          <div className={classes.priceWrapper}>
            <div className={classes.sumWrapper}>
             <AppPrice value={ item.calculations.sumPriceToPayAggregation } extraClassName={classes.mainCurrency} />
            </div>
            {
              item.quantity > 1
                ? <div className={classes.itemAttr}>
                    <span>(</span>
                    <AppPrice
                      value={ item.calculations.unitPriceToPayAggregation }
                      extraClassName={`${classes.itemAttr} ${classes.eachCurrency}`}
                    />
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
        <Grid item xs={ 12 } container spacing={ 24 } className={classes.root}>
          <Grid item xs={ 12 } md={ 8 }>
            <Typography
              variant="display1"
              noWrap
              align="left"
              color="primary"
            >
              <span>
                {
                  isUserLoggedIn
                    ? 'Cart'
                    : 'Cart (guest)'
                }
              </span>
              <span>{ ` has ${items.length} ` }</span>
              <FormattedPlural
                value={items.length}
                one='item'
                other='items'
              />
            </Typography>
            <div className={classes.listTitle} ref={this.listRef}>
              <div style={{width: '20%'}}>Item</div>
              <div className={classes.itemWrapper} />
              <div className={classes.quantityForm}>Quantity</div>
              <div className={classes.priceWrapper}>Price</div>
            </div>
            <Divider className={ classes.fullWidth } />
            <List>
              { rows }
            </List>
          </Grid>

          <Grid item xs={ 12 } md={ 4 }>
            <Typography
              variant="display1"
              noWrap
              align="left"
              color="primary"
            >
              { 'Order summary' }
            </Typography>
            <Divider className={ classes.calcDivider} />

            <Grid container spacing={24}>
              <Grid item xs={8}>
                <form
                  noValidate
                  autoComplete="off"
                  className={`${classes.fullWidth} ${classes.btnWrapper}`}
                >
                  <TextField
                    name="voucher"
                    label="Apply voucher code"
                    value={this.state.voucherCode}
                    onChange={this.handleChangeVouchercode}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      style: {height: '44px'},
                    }}
                    variant="outlined"
                  />
                </form>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  className={ classes.btnWrapper }
                >
                  apply
                </Button>
              </Grid>
            </Grid>

            <Divider className={ classes.fullWidth } />

            <div className={classes.totalMsg}>
              <div>Subtotal</div>
              <div>{ totals && <AppPrice value={ totals.subtotal } extraClassName={classes.mainCurrency} /> }</div>
            </div>
            <div className={classes.totalMsg}>
              <div>Tax</div>
              <div>{ totals && <AppPrice value={ totals.taxTotal } extraClassName={classes.mainCurrency} /> }</div>
            </div>
            <div className={classes.totalMsg} style={{ marginBottom: '24px'}}>
              <div>Discount</div>
              <div>{ totals && <AppPrice value={ totals.discountTotal } extraClassName={classes.mainCurrency} /> }</div>
            </div>

            <Divider className={ classes.fullWidth } />

            <div className={`${classes.totalMsg}`}>
              <div className={classes.grandTotal}>
                Grand Total
              </div>
              <div>{ totals && <AppPrice value={ totals.grandTotal }/> }</div>
            </div>

            <Divider className={ classes.fullWidth } />

            <NavLink to={ pathSearchPage } className={ classes.fullWidth }>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className={ classes.btnWrapper }
              >
                continue to checkout
              </Button>
            </NavLink>

            <div className={`${classes.itemAttr} ${classes.shippingMsg}`}>
              Shipping fee will be calculated based on Shipping address
            </div>
          </Grid>
        </Grid>
      </AppMain>
    );
  }
}

export const CartPage = withStyles(styles)(CartPageBase);

export default CartPage;
