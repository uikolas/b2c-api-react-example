import * as React from "react";
import {RouteProps} from "react-router";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';

import {reduxify} from '../../../lib/redux-helper';
import {ICartState, ICartItem, getCartId, isCartLoading} from '../../../reducers/Common/Cart';
import {getFormattedPrice} from '../../../services/productHelper';
import {cartDeleteItemAction, updateItemInCartAction} from '../../../actions/Common/Cart';
import {styles} from './styles';
import {ICartTotals, TCartId, ICartItemCalculation} from "../../../interfaces/cart";
import {getAppCurrency, TAppCurrency} from "../../../reducers/Common/Init";
import {ICartAddItem} from "../../../services/Common/Cart";
import {createCartItemAddToCart} from "../../../services/cartHelper/item";
import {AppMain} from "../../Common/AppMain/index";
import {TProductSKU} from "../../../interfaces/product/index";

interface CartPageProps extends WithStyles<typeof styles> {
  dispatch: Function;
  location: string;
  items: Array<ICartItem>;
  totals: ICartTotals;
  cartId: TCartId;
  currency: TAppCurrency;
  updateItemInCart: Function;
  deleteItemInCart: Function;
  isLoading: boolean;
}

interface CartPageState {
  anchorEl: HTMLElement | null;
  currentItem: ICartItem | null;
}

export const pageTitle = 'Search results for ';

export class CartPageBase extends React.Component<CartPageProps, CartPageState> {

  public state: CartPageState = {
    anchorEl: null,
    currentItem: null
  };

  public handleDeleteItem = (sku: string) => (e: any) => {
    e.preventDefault();

    this.props.dispatch(cartDeleteItemAction(this.props.cartId, sku));
  }

  public openMenu = (item: ICartItem) => (e: any) => {
    this.setState({ anchorEl: e.currentTarget, currentItem: item });
  }

  public closeMenu = () => {
    this.setState({ anchorEl: null, currentItem: null });
  }

  // Update quantity of the item
  public setItemQty = (e: any) => {
    const newQuantity = e.target.value;

    // If is selected 0, the cart item should be removed from the cart
    if (newQuantity <= 0) {
      this.props.deleteItemInCart(this.props.cartId, this.state.currentItem.sku);
    } else {
      this.props.updateItemInCart(
        createCartItemAddToCart(this.state.currentItem.sku, newQuantity),
        this.props.cartId,
      );
    }

    this.closeMenu();
  }

  public render() {
    const {classes, items, totals, isLoading} = this.props;

    const quantities: number[] = [];

    if (this.state.currentItem) {
      const {availableQuantity} = this.state.currentItem;
      const maxItems = availableQuantity && availableQuantity < 10 ? availableQuantity : 10;

      for (let i = 0; i <= maxItems; i++) {
        quantities.push(i);
      }
    }

    // export interface ICartItem {
    //   sku: TProductSKU| null;
    //   name: TProductName| null;
    //   image: TProductImageSRC| null;
    //   quantity: TProductQuantity| null;
    //   amount: TProductPrice | null;
    //   calculations: ICartItemCalculation| null;
    //   groupKey: string | null;
    //   availability: TProductAvailability | null;
    //   availableQuantity: TProductQuantity | null;
    // }

    // const items = [
    //   {sku: 1, name: 'Sony', price: 50, quantity: 3, img: '//images.icecat.biz/img/norm/high/24602396-8292.jpg'},
    //   {sku: 2, name: 'Sony Player', price: 120, quantity: 1, img: '//images.icecat.biz/img/gallery/17360369_3328.jpg'},
    //   {sku: 3, name: 'Samsung', price: 80, quantity: 2, img: '//images.icecat.biz/img/norm/high/24699831-1991.jpg'}
    // ];

    const rows = items.map((item: any) => (
      <TableRow
        hover
        key={item.sku}
      >
        <TableCell component="th" scope="row">{item.name}</TableCell>
        <TableCell>
          <img src={item.image} height={60} />
        </TableCell>
        <TableCell>{getFormattedPrice(item.calculations.sumPrice, this.props.currency)}</TableCell>
        <TableCell>
          <span>{item.quantity}</span>
          <IconButton
            onClick={this.openMenu(item)}
          >
            <MoreVertIcon />
          </IconButton>
        </TableCell>
        <TableCell numeric>
          <IconButton  onClick={this.handleDeleteItem(item.sku)}>
            <DeleteIcon className={classes.delIcon} />
          </IconButton>
        </TableCell>
      </TableRow>
    ));

    return (
      <AppMain isLoading={isLoading}>
        <Grid container>
          <Grid item xs={12}>
            <Typography
              variant="title"
              noWrap
              align="center"
              className={classes.title}
            >
              {items.length > 0 ? `Cart have ${items.length} items` : 'Empty cart, go shopping'}
            </Typography>
          </Grid>
          <Grid
            item xs={9}
            container
            alignItems="center"
          >
            <Paper className={classes.root}>
              <div className={classes.tableWrapper}>
                <Table className={classes.table}>
                  <TableBody>
                    {rows}
                  </TableBody>
                </Table>
              </div>
            </Paper>
          </Grid>

          <Grid
            item xs={3}
            container
            direction="column"
            justify="space-evenly"
            alignItems="center"
          >
            <Typography>SubTotal: {totals.subtotal}</Typography>
            <Typography>TaxTotal: {totals.taxTotal}</Typography>
            <Typography >Discount: {`- ${totals.discountTotal}`}</Typography>
            <Typography variant="body2" color="primary">GrandTotal: {totals.grandTotal}</Typography>
          </Grid>

          <Menu
            anchorEl={this.state.anchorEl}
            open={!!this.state.anchorEl}
            onClose={this.closeMenu}
          >
            {
              quantities.map((i: number) => (
                <MenuItem
                  value={i}
                  key={`qty-${i}`}
                  selected={this.state.currentItem && i === this.state.currentItem.quantity}
                  onClick={this.setItemQty}
                >{i}</MenuItem>
              ))
            }
          </Menu>
      </Grid>
      </AppMain>
    );
  }
}

export const CartPage = withStyles(styles)(CartPageBase);

export const ConnectedCartPage = reduxify(
  (state: any, ownProps: any) => {
    const routerProps: RouteProps = state.routing ? state.routing : {};
    const cartProps: ICartState = state.cart ? state.cart : null;
    const currency: TAppCurrency = getAppCurrency(state, ownProps);
    const cartId: TCartId = getCartId(state, ownProps);
    const cartLoading: boolean = isCartLoading(state, ownProps);
    const isLoading = cartLoading || false;
    return (
      {
        location: routerProps.location ? routerProps.location : ownProps.location,
        items: cartProps && cartProps.data ? cartProps.data.items : ownProps.items,
        totals: cartProps && cartProps.data ? cartProps.data.totals : ownProps.totals,
        cartId,
        currency,
        isLoading,
      }
    );
  },
  (dispatch: Function) => ({
    updateItemInCart: (
      payload: ICartAddItem, cartId: TCartId
    ) => dispatch(updateItemInCartAction(payload, cartId)),
    deleteItemInCart: (
      cartId: TCartId, itemId: TProductSKU
    ) => dispatch(cartDeleteItemAction(cartId, itemId)),
  })
)(CartPage);
