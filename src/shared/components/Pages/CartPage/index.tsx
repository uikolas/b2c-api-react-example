import * as React from 'react';
import { NavLink } from 'react-router-dom';
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

  public state: CartPageState = {
    anchorEl: null,
    currentItem: null,
  };

  public handleDeleteItem = (sku: string) => (e: any) => {
    e.preventDefault();

    const {cartDeleteItemAction, removeItemGuestCartAction, cartId, isUserLoggedIn} = this.props;

    if (isUserLoggedIn) {
      cartDeleteItemAction(cartId, sku);
    } else {
      removeItemGuestCartAction(cartId, sku);
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
      isUserLoggedIn
    } = this.props;
    // If is selected 0, the cart item should be removed from the cart
    if (newQuantity <= 0) {
      if (isUserLoggedIn) {
        cartDeleteItemAction(cartId, this.state.currentItem.sku);
      } else {
        removeItemGuestCartAction(cartId, this.state.currentItem.sku);
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
      <TableRow
        hover
        key={ item.sku }
      >
        <TableCell component="th" scope="row">{ item.name }</TableCell>
        <TableCell>
          <img src={ item.image } height={ 60 }/>
        </TableCell>
        <TableCell><AppPrice value={ item.calculations.sumPrice }/></TableCell>
        <TableCell>
          <span>{ item.quantity }</span>
          <IconButton
            onClick={ this.openMenu(item) }
          >
            <MoreVertIcon/>
          </IconButton>
        </TableCell>
        <TableCell numeric>
          <IconButton onClick={ this.handleDeleteItem(item.sku) }>
            <DeleteIcon className={ classes.delIcon }/>
          </IconButton>
        </TableCell>
      </TableRow>
    ));

    if (!items || !items.length) {
      return (
        <AppMain>
          <Grid container>
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
          </Grid>
        </AppMain>
      );
    }

    return (
      <AppMain>
        <Grid container>
          <Grid item xs={ 12 }>
            <Typography
              variant="headline"
              noWrap
              align="center"
              className={ classes.title }
            >
              { `Cart has ${items.length} items` }
            </Typography>
          </Grid>
          <Grid item xs={ 12 }>

          </Grid>
          <Grid
            item xs={ 9 }
            container
            alignItems="center"
          >
            <Paper className={ classes.root }>
              <div className={ classes.tableWrapper }>
                <Table className={ classes.table }>
                  <TableBody>
                    { rows }
                  </TableBody>
                </Table>
              </div>
            </Paper>
          </Grid>
          <Grid
            item xs={ 3 }
            container
            direction="column"
            justify="space-evenly"
            alignItems="center"
          >
            <Typography variant="body2">SubTotal: { totals && <AppPrice value={ totals.subtotal }/> }</Typography>
            <Typography variant="body1">TaxTotal: { totals && <AppPrice value={ totals.taxTotal }/> }</Typography>
            <Typography variant="body2">Discount: { `- ${totals.discountTotal}` }</Typography>
            <Typography variant="subheading" color="primary">GrandTotal: { totals &&
            <AppPrice value={ totals.grandTotal }/> }</Typography>
          </Grid>
          <Grid item xs={ 12 } container justify="center" className={ classes.footer }>
            <NavLink to={ pathSearchPage }>
              <SprykerButton title="Back to search result"/>
            </NavLink>
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
        </Grid>
      </AppMain>
    );
  }
}

export const CartPage = withStyles(styles)(CartPageBase);

export default CartPage;
