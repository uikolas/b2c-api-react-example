import * as React from "react";
import {FormattedDate} from 'react-intl';
import {RouteProps} from "react-router";
import {NavLink} from "react-router-dom";
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
import SaveIcon from '@material-ui/icons/Save';

import { push } from 'react-router-redux';

import {reduxify} from '../../../lib/redux-helper';
import {
  getWishlistsAction,
  addWishlistAction,
  deleteWishlistAction,
  updateWishlistAction,
  getDetailWishlistAction,
} from '../../../actions/Pages/Wishlist';
import {IWishlist} from "../../../interfaces/wishlist";
import {WishlistState} from "../../../reducers/Pages/Wishlist";
import {styles} from './styles';
import {pathCustomerPage} from "../../../routes/contentRoutes";

interface WishlistPageProps extends WithStyles<typeof styles> {
  dispatch: Function;
  wishlists: IWishlist[];
  isLoading: boolean;
  isInitial: boolean;
}


interface WishlistPageState {
  name: string;
  updatedName: string;
  updatedList: string;
}

export const pageTitle = 'Search results for ';

export class WishListBase extends React.Component<WishlistPageProps, WishlistPageState> {

  public state: WishlistPageState = {
    name: '',
    updatedName: '',
    updatedList: '',
  }

  public componentDidMount() {
    if (!this.props.isInitial) {
      this.props.dispatch(getWishlistsAction());
    }
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

  public setCurrentWishlist = (wishlistId: string) =>  (e: any) => {
    this.props.dispatch(getDetailWishlistAction(wishlistId));
  }

  public render() {
    const { classes, wishlists, isLoading, isInitial } = this.props;

    if (!wishlists.length && isLoading) {
      return null;
    } else if (!wishlists.length && !isLoading && isInitial) {
      return (
        <Grid container>
          <Grid item xs={12} container justify="center">
            <Typography
              variant="headline"
              children="You haven`t yet wishlists."
              paragraph
            />
          </Grid>
        </Grid>
      );
    }

    const rows: any[] = wishlists.map((item: any) => (
      <TableRow
        hover
        key={item.id}
      >
        <TableCell component="th" scope="row">
          {this.state.updatedList && this.state.updatedList === item.id
            ? (
              <form noValidate autoComplete="off" className={classes.updateCell}>
                <TextField
                  value={this.state.updatedName}
                  onChange={this.handleChangeUpdatedName}
                />
                <IconButton
                  color="primary"
                  onClick={this.handleUpdateWishlist}
                  disabled={isLoading}
                >
                  <SaveIcon />
                </IconButton>
              </form>
            )
            : <NavLink
                to={`${pathCustomerPage}/wishlist/${item.name}`}
                onClick={this.setCurrentWishlist(item.id)}
              >
                {item.name}
              </NavLink>
          }
        </TableCell>
        <TableCell>{item.numberOfItems}</TableCell>
        <TableCell>
          <FormattedDate
            value={new Date(item.createdAt)}
            year='numeric'
            month='short'
            day='2-digit'
          />
        </TableCell>
        <TableCell padding="checkbox">
          <IconButton
            color="primary"
            onClick={this.setUpdatedWishlist(item.id, item.name)}
            disabled={isLoading}
          >
            <EditIcon />
          </IconButton>
        </TableCell>
        <TableCell padding="checkbox">
          <IconButton
            color="primary"
            onClick={this.handleDeleteWishlist(item.id)}
            disabled={isLoading}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    ));

    return (
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
    );
  }
}

export const WishlistPage = withStyles(styles)(WishListBase);

export const ConnectedWishlistPage = reduxify(
  (state: any, ownProps: any) => {
    const routerProps: RouteProps = state.routing ? state.routing : {};
    const wishlistProps: WishlistState = state.pageWishlist ? state.pageWishlist : null;
    return (
      {
        location: routerProps.location ? routerProps.location : ownProps.location,
        wishlists: wishlistProps && wishlistProps.data ? wishlistProps.data.wishlists : ownProps.wishlists,
        isInitial: wishlistProps && wishlistProps.data ? wishlistProps.data.isInitial : ownProps.isInitial,
        isLoading: wishlistProps ? wishlistProps.pending : ownProps.isLoading,
      }
    );
  }
)(WishlistPage);
