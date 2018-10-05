import * as React from "react";
import {Location} from 'history';
import { toast } from 'react-toastify';
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
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { push } from 'react-router-redux';

import {reduxify} from '../../../lib/redux-helper';

import {getWishlistsAction, addWishlistAction, deleteWishlistAction, updateWishlistAction} from '../../../actions/Pages/Wishlist';

import {AppMain} from '../../Common/AppMain';

import {IWishlist} from "../../../interfaces/wishlist";
import config from '../../../config';

import {getAppCurrency, TAppCurrency} from "../../../reducers/Common/Init";
import {WishlistState} from "../../../reducers/Pages/Wishlist";
import {styles} from './styles';

type IQuery = {
  q?: string,
  currency: TAppCurrency,
  sort?: string,
  [key: string]: string | number,
};

interface WishlistPageProps extends WithStyles<typeof styles> {
  dispatch: Function;
  wishlists: IWishlist[];
}


interface WishlistPageState {
  name: string;
}

export const pageTitle = 'Search results for ';

export class WishListBase extends React.Component<WishlistPageProps, WishlistPageState> {

  public state: WishlistPageState = {
    name: '',
  }

  public componentDidMount() {
    this.props.dispatch(getWishlistsAction());
  }

  public handleChangeName = (event: any) => {
    this.setState({
      name: event.target.value,
    });
  }

  public addWishlist = () => {
    this.props.dispatch(addWishlistAction(this.state.name));
  }

  public handleUpdateWishlist = (wishlistId: string) => (e: any) => {
    this.props.dispatch(updateWishlistAction(wishlistId, 'LALALA'));
  }

  public handleDeleteWishlist = (wishlistId: string) => (e: any) => {
    this.props.dispatch(deleteWishlistAction(wishlistId));
  }

  public render() {
    const { classes, wishlists } = this.props;

    const rows: any[] = wishlists.map((item: any) => (
      <TableRow
        hover
        key={item.id}
      >
        <TableCell component="th" scope="row">{item.name}</TableCell>
        <TableCell>{item.numberOfItems}</TableCell>
        <TableCell>{item.createdAt}</TableCell>
        <TableCell numeric>
          <IconButton
            onClick={this.handleUpdateWishlist(item.id)}
          >
            <EditIcon className={classes.icons} />
          </IconButton>
        </TableCell>
        <TableCell numeric>
          <IconButton
            onClick={this.handleDeleteWishlist(item.id)}
          >
            <DeleteIcon className={classes.icons} />
          </IconButton>
        </TableCell>
      </TableRow>
    ));

    return (
      <AppMain>
        <Grid container>

          <Grid item xs={12} container justify="center">
            <Typography
              variant="headline"
              children="Manage wishlists"
            />
          </Grid>

          <Grid item xs={12} container justify="center">
            <Paper elevation={4} className={classes.paperContainer}>
              <form noValidate autoComplete="off">
                <TextField
                  className={classes.newList}
                  value={this.state.name}
                  onChange={this.handleChangeName}
                />
                <Button variant="contained" color="primary" onClick={this.addWishlist}>
                  Add new wishlist
                </Button>
              </form>
              <Divider />
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.headerCell}>Name</TableCell>
                    <TableCell className={classes.headerCell}># of items</TableCell>
                    <TableCell className={classes.headerCell}>Date of creation</TableCell>
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

export const WishlistPage = withStyles(styles)(WishListBase);

export const ConnectedWishlistPage = reduxify(
  (state: any, ownProps: any) => {
    const routerProps: RouteProps = state.routing ? state.routing : {};
    const wishlistProps: WishlistState = state.pageWishlist ? state.pageWishlist : null;
    const currency: TAppCurrency = getAppCurrency(state, ownProps);
    return (
      {
        location: routerProps.location ? routerProps.location : ownProps.location,
        wishlists: wishlistProps && wishlistProps.data ? wishlistProps.data.wishlists : ownProps.wishlists,
        currency,
      }
    );
  }
)(WishlistPage);
