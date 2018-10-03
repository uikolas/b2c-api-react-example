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
import {ICartState, ICartItem} from '../../../reducers/Common/Cart';

import {cartDeleteItemAction} from '../../../actions/Common/Cart';

import {styles} from './styles';
import {ICartTotals, TCartId, CartItem} from "../../../interfaces/cart";


interface CartPageProps extends WithStyles<typeof styles> {
  dispatch: Function;
  location: string,
  items: Array[any],
  totals: ICartTotals,
  cartId: TCartId,
}

interface CartPageState {
  anchorEl: HTMLElement | null;
  currentItem: any;
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

  public openMenu = (item: any) => (e: any) => {
    this.setState({ anchorEl: e.currentTarget, currentItem: item });
  }

  public closeMenu = () => {
    this.setState({ anchorEl: null, currentItem: null });
  }

  public setItemQty = (e: any) => {
    console.info(e.target.value, this.state.currentItem.quantity);
    this.closeMenu();
  }

  public render() {
    const {classes, } = this.props;

    const quantities: number[] = [];

    for (let i = 0; i < 11; i++) {
      quantities.push(i);
    }

    // export interface ICartItem {
    //   sku: TProductSKU;
    //   name: TProductName;
    //   quantity: TProductQuantity;
    //   price: TProductPrice;
    // }

    const items = [
      {sku: 1, name: 'Sony', price: 50, quantity: 3, img: '//images.icecat.biz/img/norm/high/24602396-8292.jpg'},
      {sku: 2, name: 'Sony Player', price: 120, quantity: 1, img: '//images.icecat.biz/img/gallery/17360369_3328.jpg'},
      {sku: 3, name: 'Samsung', price: 80, quantity: 2, img: '//images.icecat.biz/img/norm/high/24699831-1991.jpg'}
    ];

    const rows = items.map((item: any) => (
      <TableRow
        hover
        key={item.sku}
      >
        <TableCell component="th" scope="row">{item.name}</TableCell>
        <TableCell>
          <img src={item.img} height={60} />
        </TableCell>
        <TableCell>{item.price}</TableCell>
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
          item xs={10}
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
          item xs={2}
          container
        >

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
    );
  }
}

export const CartPage = withStyles(styles)(CartPageBase);

export const ConnectedCartPage = reduxify(
  (state: any, ownProps: any) => {
    const routerProps: RouteProps = state.routing ? state.routing : {};
    const cartProps: ICartState = state.cart ? state.cart : null;
    return (
      {
        location: routerProps.location ? routerProps.location : ownProps.location,
        items: cartProps && cartProps.data ? cartProps.data.items : ownProps.items,
        totals: cartProps && cartProps.data ? cartProps.data.totals : ownProps.totals,
        cartId: cartProps && cartProps.data ? cartProps.data.id : ownProps.id,
      }
    );
  }
)(CartPage);
