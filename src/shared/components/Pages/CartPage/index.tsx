import * as React from "react";
import {RouteProps} from "react-router";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';

import {reduxify} from '../../../lib/redux-helper';
import {ICartState, ICartItem, getCartId, isCartLoading} from '../../../reducers/Common/Cart';
import {SprykerButton} from '../../../components/UI/SprykerButton';
import {cartDeleteItemAction, updateItemInCartAction} from '../../../actions/Common/Cart';
import {styles} from './styles';
import {ICartTotals, TCartId, ICartItemCalculation} from "../../../interfaces/cart";
import {NavLink} from "react-router-dom";
import config from "../../../config";
import {ICartAddItem} from "../../../services/Common/Cart";
import {createCartItemAddToCart} from "../../../services/cartHelper/item";
import {AppMain} from "../../Common/AppMain/index";
import {TProductSKU} from "../../../interfaces/product/index";
import {AppPrice} from "../../Common/AppPrice/index";

interface CartPageProps extends WithStyles<typeof styles> {
  dispatch: Function;
  location: string;
  items: Array<ICartItem>;
  totals: ICartTotals;
  cartId: TCartId;
  updateItemInCart: Function;
  deleteItemInCart: Function;
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

    this.props.deleteItemInCart(this.props.cartId, sku);
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
      <TableRow
        hover
        key={item.sku}
      >
        <TableCell component="th" scope="row">{item.name}</TableCell>
        <TableCell>
          <img src={item.image} height={60} />
        </TableCell>
        <TableCell><AppPrice value={item.calculations.sumPrice}/></TableCell>
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

    if (!items || ! items.length) {
      return (
        <AppMain>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                variant="display2"
                noWrap
                align="center"
                className={classes.title}
              >
                Empty cart, go shopping
              </Typography>
            </Grid>
          </Grid>
        </AppMain>
      );
    }

    return (
     <AppMain>
      <Grid container>
        <Grid item xs={12}>
          <Typography
            variant="headline"
            noWrap
            align="center"
            className={classes.title}
          >
            {`Cart has ${items.length} items`}
          </Typography>
        </Grid>
        <Grid item xs={12}>

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
          <Typography variant="body2">SubTotal: {totals && <AppPrice value={totals.subtotal}/>}</Typography>
          <Typography variant="body1">TaxTotal: {totals && <AppPrice value={totals.taxTotal}/>}</Typography>
          <Typography variant="body2">Discount: {`- ${totals.discountTotal}`}</Typography>
          <Typography variant="subheading" color="primary">GrandTotal: {totals && <AppPrice value={totals.grandTotal}/>}</Typography>
        </Grid>
        <Grid item xs={12} container justify="center" className={classes.footer}>
          <NavLink to={`${config.WEB_PATH}search`}>
            <SprykerButton title="Back to search result" />
          </NavLink>
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
    const cartId: TCartId = getCartId(state, ownProps);
    return (
      {
        location: routerProps.location ? routerProps.location : ownProps.location,
        items: cartProps && cartProps.data ? cartProps.data.items : ownProps.items,
        totals: cartProps && cartProps.data ? cartProps.data.totals : ownProps.totals,
        cartId,
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
