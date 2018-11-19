import * as React from "react";
import {RouteProps} from "react-router";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Divider from "@material-ui/core/Divider/Divider";
import MenuList from '@material-ui/core/MenuList';
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {AppPageTitle} from "../../Common/AppPageTitle";
import {AppTable} from "../../Common/AppTable";

import { push } from 'react-router-redux';
import {reduxify} from 'src/shared/lib/redux-helper';
import {deleteItemAction} from 'src/shared/actions/Pages/Wishlist';
import {addItemToCartAction} from 'src/shared/actions/Common/Cart';
import {AppPrice} from 'src/shared/components/Common/AppPrice';
import {IWishlist, IWishlistItem} from "src/shared/interfaces/wishlist";
import {TCartId} from 'src/shared/interfaces/cart';
import {priceTypeNameOriginal, priceTypeNameDefault} from 'src/shared/interfaces/product';
import {getAppCurrency, TAppCurrency} from "src/shared/reducers/Common/Init";
import {WishlistState} from "src/shared/reducers/Pages/Wishlist";
import {getCartId, getTotalItemsQuantity, isCartStateLoading} from "src/shared/reducers/Common/Cart";
import {createCartItemAddToCart} from "src/shared/helpers/cart";
import {styles} from './styles';
import {pathCustomerProfilePage, pathProductPageBase, pathWishListsPage} from 'src/shared/routes/contentRoutes';
import {NavLink} from "react-router-dom";

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

  public componentDidUpdate(prevProps: WishlistPageProps, prevState: WishlistPageState ) {
    if (prevState.movedItem && this.props.cartItemsLength > prevProps.cartItemsLength) {
      this.props.dispatch(deleteItemAction(this.props.wishlist.id, prevState.movedItem));
      this.setState({movedItem: ''});
    }
  }

  public renderProduct = (sku: string, name: string) => (e: any) => {
    // this.props.dispatch(getProductDataAction(sku.split('_')[0]));
    // this.props.dispatch(push(`${config.WEB_PATH}product/${name}`));
    this.props.changeLocation(`${pathProductPageBase}/${sku.split('_')[0]}`);
  }

  public handleDeleteItem = (sku: string) => (e: any) => {
    this.props.dispatch(deleteItemAction(this.props.wishlist.id, sku));
  }

  public moveToCart = (sku: string) => (e: any) => {
    this.setState({movedItem: sku});
    this.props.dispatch(addItemToCartAction(
      createCartItemAddToCart(sku, 1),
      this.props.cartId,
    ));
  }

  public moveAllProductsToCart = (e: any) => {
    const availableProducts: string[] = [];
    this.props.products.forEach((product: IWishlistItem) => {
      if (product.availability) {
        availableProducts.push(product.sku);
      }
    });

    // this.props.dispatch(multiItemsCartAction(this.props.cartId, this.props.payloadForCreateCart, availableProducts));
  }

  public wishlistMenu = () => {
    const {classes, wishlist} = this.props;

    return (
      <MenuList className={classes.menu}>
        <MenuItem className={classes.menuItem}>
          <NavLink to={ pathWishListsPage } className={classes.link}>
            Wishlist
          </NavLink>
        </MenuItem>
        <MenuItem className={classes.menuItem}>
          {wishlist.name}
        </MenuItem>
      </MenuList>
    )
  }

  public render() {
    const { classes, wishlist, products, isLoading, cartLoading, currency } = this.props;
    const tableAction = cartLoading ? classes.tableActionDisabled : classes.tableAction;

    if (!products.length && isLoading) {
      return null;
    }

    const headerCells: any[] = [
      {
        content: 'Product'
      },
      {
        content: 'Price'
      },
      {
        content: 'Availability'
      },
      {
        content: ''
      },
      {
        content: ''
      }
    ];

    const bodyRows: any[] = products.map((item: IWishlistItem) => {
      const prices: any = {default: '', original: ''};

      item.prices.forEach((price: any) => {
        if (price.priceTypeName.toLowerCase() === 'default') {
          prices.default = price.grossAmount / 100 + '';
        } else if (price.priceTypeName.toLowerCase() === 'original') {
          prices.original = price.grossAmount / 100 + '';
        }
      });

      return {
        id: item.sku,
        cells: [
          {
            content: (
              <div className={classes.product}>
                <span className={classes.wrapProductImage}>
                  <img src={item.image} height={56} width={56} />
                </span>
                <div className={classes.productDescription}>
                  <span className={classes.tableAction} onClick={this.renderProduct(item.sku, item.name)}>
                    {item.name}
                  </span>
                  <span className={classes.attributes}>SKU: {item.sku}</span>
                  {
                    item.attributes.map((attr: any, idx: number) => (
                      <span className={classes.attributes} key={`attr-${item.sku}-${idx}`}>
                      {`${Object.keys(attr)[0].split('_').join(' ')}: ${Object.values(attr)[0]}`}
                    </span>
                    ))
                  }
                </div>
              </div>
            )
          },
          {
            content: (
              <div className={classes.vertical}>
                <AppPrice value={prices.original} extraClassName={classes.price}  currency={currency} priceType={priceTypeNameOriginal} />
                <AppPrice value={prices.default} extraClassName={classes.price}  currency={currency} priceType={priceTypeNameDefault} />
              </div>
            )
          },
          {
            content: (
              <span className={item.availability ? classes.available : classes.noAvailable}>
                {item.availability ? 'Available' : 'Not available'}
              </span>
            )
          },
          {
            content: (
              <Typography component="span" className={tableAction} onClick={this.moveToCart(item.sku)}>
                Add to Cart
              </Typography>
            )
          },
          {
            content: (
              <Typography component="span" className={tableAction} onClick={this.handleDeleteItem(item.sku)}>
                Remove
              </Typography>
            )
          },
        ]
      }
    });

    return (
      <Grid container>

        <Grid item xs={ 12 }>
          <AppPageTitle
            classes={{ root: classes.appPageTitleRoot, pageHeader: classes.appPageTitleRootPageHeader }}
            title="Wishlist"
          />
        </Grid>

        <Grid item xs={ 12 }>
          {this.wishlistMenu()}

          {
            bodyRows.length ?
              <Paper elevation={ 0 }>
                <AppTable
                  isRowHover = {true}
                  classes = {{bodyCell: classes.bodyCell}}
                  headerCells = {headerCells}
                  bodyRows = {bodyRows}
                />

                <Button
                  className={classes.addAllBtn}
                  color="primary"
                  variant="contained"
                  onClick={this.moveAllProductsToCart}
                  disabled={isLoading || cartLoading}
                >
                  Add all available products to cart
                </Button>

              </Paper> :
              <Paper elevation={ 0 }>
                <Divider />

                <Typography paragraph className={classes.noItems}>
                  Currently no items in your wishlist.
                </Typography>

              </Paper>
          }

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
    const cartLoading: boolean = isCartStateLoading(state, ownProps);
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
