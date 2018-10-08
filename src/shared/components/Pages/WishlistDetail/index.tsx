import * as React from "react";
import {FormattedDate} from 'react-intl';
import {RouteProps} from "react-router";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CartIcon from '@material-ui/icons/AddShoppingCart';

import { push } from 'react-router-redux';

import {reduxify} from '../../../lib/redux-helper';

import {getWishlistsAction, addWishlistAction, deleteWishlistAction, updateWishlistAction} from '../../../actions/Pages/Wishlist';

import {AppMain} from '../../Common/AppMain';

import {IWishlist, IWishlistItem} from "../../../interfaces/wishlist";
import config from '../../../config';

import {getAppCurrency, TAppCurrency} from "../../../reducers/Common/Init";
import {WishlistState} from "../../../reducers/Pages/Wishlist";
import {styles} from './styles';

interface WishlistPageProps extends WithStyles<typeof styles> {
  dispatch: Function;
  wishlist: IWishlist;
  products: Array<IWishlistItem>;
  isLoading: boolean,
}


interface WishlistPageState {
  name: string;
  updatedName: string,
  updatedList: string,
}

export const pageTitle = 'Search results for ';

export class WishlistDetailBase extends React.Component<WishlistPageProps, WishlistPageState> {

  public state: WishlistPageState = {
    name: '',
    updatedName: '',
    updatedList: '',
  }

  public handleChangeName = (event: any) => {
    this.setState({
      name: event.target.value,
    });
  }

  public handleChangeUpdatedName = (event: any) => {
    this.setState({
      updatedName: event.target.value,
    });
  }

  public addWishlist = () => {
    this.props.dispatch(addWishlistAction(this.state.name));
    this.setState({name: ''});
  }

  public handleUpdateWishlist = (e: any) => {
    this.props.dispatch(updateWishlistAction(this.state.updatedList, this.state.updatedName));
    this.setState({updatedList: '', updatedName: ''})
  }

  public handleDeleteWishlist = (wishlistId: string) => (e: any) => {
    this.props.dispatch(deleteWishlistAction(wishlistId));
  }

  private setUpdatedWishlist = (id: string, name: string) => (e: any) => {
    this.setState({updatedList: id, updatedName: name});
  }

  public render() {
    const { classes, wishlist, products, isLoading } = this.props;

    const rows: any[] = products.map((item: IWishlistItem) => {
      const prices: any = {default: '', original: ''};

      item.prices.forEach((price: any) => {
        console.info(price);
        if (price.priceTypeName.toLowerCase() === 'default') {
          price.default = price.grossAmount / 100 + '';
        } else if (price.priceTypeName.toLowerCase() === 'original') {
          price.original = price.grossAmount / 100 + '';
        }
      });

      return (
        <TableRow
          hover
          key={item.sku}
        >
          <TableCell component="th" scope="row">
            <img src={item.image} height={52} />
          </TableCell>
          <TableCell className={classes.vertical}>
            <span>{item.name}</span>
            <span>{item.sku}</span>
            {
              item.attributes.map((attr: any) => <span>{`${attr.keys()[0]}: ${attr.values()[0]}`}</span>)
            }
          </TableCell>
          <TableCell className={classes.vertical}>
            <span>{prices.original}</span>
            <span>{prices.default}</span>
            <span>500</span>
          </TableCell>
          <TableCell>
            {item.availability ? 'Available' : 'Not available'}
          </TableCell>
          <TableCell numeric>
            <IconButton
              color="primary"
              onClick={this.setUpdatedWishlist(item.sku, item.name)}
              disabled={isLoading}
            >
              <CartIcon />
            </IconButton>
          </TableCell>
          <TableCell numeric>
            <IconButton
              color="primary"
              onClick={this.handleDeleteWishlist(item.sku)}
              disabled={isLoading}
            >
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      );
    });

    return (
      <AppMain>
        <Grid container>

          <Grid item xs={12} container justify="center">
            <Typography
              variant="headline"
              children={wishlist ? `Wishlist ${wishlist.name}` : ''}
            />
          </Grid>

          <Grid item xs={12} container justify="center">
            <Paper elevation={4} className={classes.paperContainer}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell className={classes.headerCell}>Product</TableCell>
                    <TableCell className={classes.headerCell}>Price</TableCell>
                    <TableCell className={classes.headerCell}>Availability</TableCell>
                    <TableCell numeric></TableCell>
                    <TableCell numeric></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows}
                </TableBody>
              </Table>
            </Paper>
          </Grid>

        </Grid>
      </AppMain>
    );
  }
}

export const WishlistDetailPage = withStyles(styles)(WishlistDetailBase);

export const ConnectedWishlistDetailPage = reduxify(
  (state: any, ownProps: any) => {
    const routerProps: RouteProps = state.routing ? state.routing : {};
    const wishlistProps: WishlistState = state.pageWishlist ? state.pageWishlist : null;
    const currency: TAppCurrency = getAppCurrency(state, ownProps);
    return (
      {
        location: routerProps.location ? routerProps.location : ownProps.location,
        wishlist: wishlistProps && wishlistProps.data ? wishlistProps.data.currentWishlist : ownProps.wishlist,
        products: wishlistProps && wishlistProps.data ? wishlistProps.data.currentItems : ownProps.products,
        isLoading: wishlistProps ? wishlistProps.pending : ownProps.isLoading,
        currency,
      }
    );
  }
)(WishlistDetailPage);
