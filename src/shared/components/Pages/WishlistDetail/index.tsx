import * as React from 'react';
import { RouteProps } from 'react-router';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CartIcon from '@material-ui/icons/AddShoppingCart';

import { push } from 'react-router-redux';
import { reduxify } from 'src/shared/lib/redux-helper';
import { deleteItemAction } from 'src/shared/actions/Pages/Wishlist';
import { addItemToCartAction } from 'src/shared/actions/Common/Cart';
import { AppPrice } from 'src/shared/components/Common/AppPrice';
import { IWishlist, IWishlistItem } from 'src/shared/interfaces/wishlist';
import { TCartId } from 'src/shared/interfaces/cart';
import { priceTypeNameDefault, priceTypeNameOriginal } from 'src/shared/interfaces/product';
import { getAppCurrency, TAppCurrency } from 'src/shared/reducers/Common/Init';
import { WishlistState } from 'src/shared/reducers/Pages/Wishlist';
import { getCartId, getTotalItemsQuantity, isCartLoading } from 'src/shared/reducers/Common/Cart';
import { createCartItemAddToCart } from 'src/shared/helpers/cart';
import { styles } from './styles';
import { pathProductPageBase } from 'src/shared/routes/contentRoutes';

interface WishlistPageProps extends WithStyles<typeof styles> {
  dispatch: Function;
  wishlist: IWishlist;
  products: Array<IWishlistItem>;
  isLoading: boolean;
  currency: TAppCurrency;
  cartLoading: boolean;
  cartId: TCartId;
  cartItemsLength: number;
  changeLocation: Function;
}


interface WishlistPageState {
  movedItem: string;
}

export const pageTitle = 'Search results for ';

export class WishlistDetailBase extends React.Component<WishlistPageProps, WishlistPageState> {

  public state: WishlistPageState = {
    movedItem: '',
  };

  public componentDidUpdate(prevProps: WishlistPageProps, prevState: WishlistPageState) {
    if (prevState.movedItem && this.props.cartItemsLength > prevProps.cartItemsLength) {
      this.props.dispatch(deleteItemAction(this.props.wishlist.id, prevState.movedItem));
      this.setState({movedItem: ''});
    }
  }

  public renderProduct = (sku: string, name: string) => (e: any) => {
    // this.props.dispatch(getProductDataAction(sku.split('_')[0]));
    // this.props.dispatch(push(`${config.WEB_PATH}product/${name}`));
    this.props.changeLocation(`${pathProductPageBase}/${sku.split('_')[0]}`);
  };

  public handleDeleteItem = (sku: string) => (e: any) => {
    this.props.dispatch(deleteItemAction(this.props.wishlist.id, sku));
  };

  public moveToCart = (sku: string) => (e: any) => {
    this.setState({movedItem: sku});
    this.props.dispatch(addItemToCartAction(
      createCartItemAddToCart(sku, 1),
      this.props.cartId,
    ));
  };

  public moveAllProductsToCart = (e: any) => {
    const availableProducts: string[] = [];
    this.props.products.forEach((product: IWishlistItem) => {
      if (product.availability) {
        availableProducts.push(product.sku);
      }
    });

    // this.props.dispatch(multiItemsCartAction(this.props.cartId, this.props.payloadForCreateCart, availableProducts));
  };

  public render() {
    const {classes, wishlist, products, isLoading, cartLoading, currency} = this.props;

    if (!products.length && isLoading) {
      return null;
    } else {
      if (!products.length && !isLoading) {
        return (
          <Grid container>
            <Grid item xs={ 12 } container justify="center">
              <Typography
                variant="headline"
                children={ wishlist ? `Wishlist ${wishlist.name}` : '' }
                paragraph
              />
            </Grid>
            <Grid item xs={ 12 } container justify="center">
              <Typography
                variant="title"
                children={ wishlist ? 'Currently there are no items in your wishlist.' : '' }
              />
            </Grid>
          </Grid>
        );
      }
    }

    const rows: any[] = products.map((item: IWishlistItem) => {
      const prices: any = {default: '', original: ''};

      item.prices.forEach((price: any) => {
        if (price.priceTypeName.toLowerCase() === 'default') {
          prices.default = price.grossAmount / 100 + '';
        } else {
          if (price.priceTypeName.toLowerCase() === 'original') {
            prices.original = price.grossAmount / 100 + '';
          }
        }
      });

      return (
        <TableRow
          hover
          key={ item.sku }
        >
          <TableCell component="th" scope="row">
            <img src={ item.image } height={ 52 }/>
          </TableCell>
          <TableCell>
            <div className={ classes.vertical }>
              <span className={ classes.name } onClick={ this.renderProduct(item.sku, item.name) }>
                { item.name }
              </span>
              <span>{ item.sku }</span>
              {
                item.attributes.map((attr: any, idx: number) => (
                  <span className={ classes.attributes } key={ `attr-${item.sku}-${idx}` }>
                    { `${Object.keys(attr)[0].split('_').join(' ')}: ${Object.values(attr)[0]}` }
                  </span>
                ))
              }
            </div>
          </TableCell>
          <TableCell>
            <div className={ classes.vertical }>
              <AppPrice value={ prices.original } currency={ currency } priceType={ priceTypeNameOriginal }/>
              <AppPrice value={ prices.default } currency={ currency } priceType={ priceTypeNameDefault }/>
            </div>
          </TableCell>
          <TableCell padding="dense">
            { item.availability ? 'Available' : 'Not available' }
          </TableCell>
          <TableCell padding="checkbox">
            <IconButton
              color="primary"
              onClick={ this.moveToCart(item.sku) }
              disabled={ !item.availability || isLoading || cartLoading }
            >
              <CartIcon/>
            </IconButton>
          </TableCell>
          <TableCell padding="none">
            <IconButton
              color="primary"
              onClick={ this.handleDeleteItem(item.sku) }
              disabled={ isLoading || cartLoading }
            >
              <DeleteIcon/>
            </IconButton>
          </TableCell>
        </TableRow>
      );
    });

    return (
      <Grid container>

        <Grid item xs={ 12 } container justify="space-around">
          <Typography
            variant="headline"
            children={ wishlist ? `Wishlist ${wishlist.name}` : '' }
          />
          <Button
            color="primary"
            variant="contained"
            onClick={ this.moveAllProductsToCart }
            disabled={ isLoading || cartLoading }
          >
            Add all available products to cart
          </Button>
        </Grid>

        <Grid item xs={ 12 } container justify="center">
          <Paper elevation={ 4 } className={ classes.paperContainer }>
            <Table>
              <TableHead>
                <TableRow key="table-header">
                  <TableCell></TableCell>
                  <TableCell className={ classes.headerCell }>Product</TableCell>
                  <TableCell className={ classes.headerCell }>Price</TableCell>
                  <TableCell className={ classes.headerCell }>Availability</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { rows }
              </TableBody>
            </Table>
          </Paper>
        </Grid>

      </Grid>
    );
  }
}

export const WishlistDetailPage = withStyles(styles)(WishlistDetailBase);

export const ConnectedWishlistDetailPage = reduxify(
  (state: any, ownProps: any) => {
    const routerProps: RouteProps = state.routing ? state.routing : {};
    const wishlistProps: WishlistState = state.pageWishlist ? state.pageWishlist : null;
    const currency: TAppCurrency = getAppCurrency(state, ownProps);
    const cartId: TCartId = getCartId(state, ownProps);
    const cartItemsLength: number = getTotalItemsQuantity(state, ownProps);
    const cartLoading: boolean = isCartLoading(state, ownProps);
    return (
      {
        location: routerProps.location ? routerProps.location : ownProps.location,
        wishlist: wishlistProps && wishlistProps.data ? wishlistProps.data.currentWishlist : ownProps.wishlist,
        products: wishlistProps && wishlistProps.data ? wishlistProps.data.currentItems : ownProps.products,
        isLoading: wishlistProps ? wishlistProps.pending : ownProps.isLoading,
        currency,
        cartId,
        cartItemsLength,
        cartLoading,
      }
    );
  },
  (dispatch: Function) => ({
    dispatch,
    changeLocation: (location: string) => dispatch(push(location)),
  })
)(WishlistDetailPage);
