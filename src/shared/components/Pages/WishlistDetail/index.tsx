import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
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

import { AppPrice } from 'src/shared/components/Common/AppPrice';
import { IWishlistItem } from 'src/shared/interfaces/wishlist';
import { priceTypeNameDefault, priceTypeNameOriginal } from 'src/shared/interfaces/product';
import { createCartItemAddToCart } from 'src/shared/helpers/cart';
import { pathProductPageBase } from 'src/shared/routes/contentRoutes';
import { styles } from './styles';
import { WishlistPageProps as Props, WishlistPageState as State } from './types';
import { connect } from './connect';

export const pageTitle = 'Search results for ';

@connect
export class WishlistDetailBase extends React.Component<Props, State> {
  public state: State = {
    movedItem: '',
  };

  public componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevState.movedItem && this.props.cartItemsLength > prevProps.cartItemsLength) {
      this.props.deleteItemAction(this.props.wishlist.id, prevState.movedItem);
      this.setState({movedItem: ''});
    }
  }

  public renderProduct = (sku: string, name: string) => (e: any) => {
    // this.props.dispatch(getProductDataAction(sku.split('_')[0]));
    // this.props.dispatch(push(`${config.WEB_PATH}product/${name}`));
    this.props.changeLocation(`${pathProductPageBase}/${sku.split('_')[0]}`);
  };

  public handleDeleteItem = (sku: string) => (e: any) => {
    this.props.deleteItemAction(this.props.wishlist.id, sku);
  };

  public moveToCart = (sku: string) => (e: any) => {
    this.setState({movedItem: sku});
    this.props.addItemToCartAction(
      createCartItemAddToCart(sku, 1),
      this.props.cartId,
    );
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
              { item.attributes.map((attr: any, idx: number) => (
                <span className={ classes.attributes } key={ `attr-${item.sku}-${idx}` }>
                  { `${Object.keys(attr)[0].split('_').join(' ')}: ${Object.values(attr)[0]}` }
                </span>
              )) }
            </div>
          </TableCell>
          <TableCell>
            <div className={ classes.vertical }>
              <AppPrice value={ prices.original } currency={ currency } priceType={ priceTypeNameOriginal }/>
              <AppPrice value={ prices.default } currency={ currency } priceType={ priceTypeNameDefault }/>
            </div>
          </TableCell>
          <TableCell padding="dense">{ item.availability ? 'Available' : 'Not available' }</TableCell>
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
                  <TableCell/>
                  <TableCell className={ classes.headerCell }>Product</TableCell>
                  <TableCell className={ classes.headerCell }>Price</TableCell>
                  <TableCell className={ classes.headerCell }>Availability</TableCell>
                  <TableCell/>
                  <TableCell/>
                </TableRow>
              </TableHead>
              <TableBody>{ rows }</TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export const ConnectedWishlistDetailPage = withStyles(styles)(WishlistDetailBase);

export default ConnectedWishlistDetailPage;
