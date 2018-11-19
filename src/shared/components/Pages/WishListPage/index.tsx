import * as React from 'react';
import { FormattedDate } from 'react-intl';
import { NavLink } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
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

import { pathCustomerPage } from 'src/shared/routes/contentRoutes';
import { styles } from './styles';
import { connect } from './connect';
import { WishlistPageProps as Props, WishlistPageState as State } from './types';

export const pageTitle = 'Search results for ';

@connect
export class WishListBase extends React.Component<Props, State> {

  public state: State = {
    name: '',
    updatedName: '',
    updatedList: '',
  };

  public componentDidMount() {
    if (!this.props.isInitial) {
      this.props.getWishlistsAction();
    }
  }

  public handleChangeName = (event: any) => {
    this.setState({
      name: event.target.value,
    });
  };

  public handleChangeUpdatedName = (event: any) => {
    this.setState({
      updatedName: event.target.value,
    });
  };

  public addWishlist = (e: any) => {
    e.preventDefault();

    if (!this.state.name.trim()) {
      return;
    }
    this.props.addWishlistAction(this.state.name);
    this.setState({name: ''});
  };

  public handleUpdateWishlist = (e: any) => {
    this.props.updateWishlistAction(this.state.updatedList, this.state.updatedName);
    this.setState({updatedList: '', updatedName: ''});
  };

  public handleDeleteWishlist = (wishlistId: string) => (e: any) => {
    this.props.deleteWishlistAction(wishlistId);
  };

  private setUpdatedWishlist = (id: string, name: string) => (e: any) => {
    this.setState({updatedList: id, updatedName: name});
  };

  public setCurrentWishlist = (wishlistId: string) => (e: any) => {
    this.props.getDetailWishlistAction(wishlistId);
  };

  public render() {
    const {classes, wishlists, isLoading, isInitial} = this.props;

    if (!wishlists.length && isLoading) {
      return null;
    }

    const rows: any[] = wishlists.map((item: any) => (
      <TableRow
        hover
        key={ item.id }
      >
        <TableCell component="th" scope="row">
          { this.state.updatedList && this.state.updatedList === item.id
            ? (
              <form noValidate autoComplete="off" className={ classes.updateCell }>
                <TextField
                  value={ this.state.updatedName }
                  onChange={ this.handleChangeUpdatedName }
                />
                <IconButton
                  color="primary"
                  onClick={ this.handleUpdateWishlist }
                  disabled={ isLoading }
                >
                  <SaveIcon/>
                </IconButton>
              </form>
            )
            : <NavLink
              to={ `${pathCustomerPage}/wishlist/${item.name}` }
              onClick={ this.setCurrentWishlist(item.id) }
            >
              { item.name }
            </NavLink>
          }
        </TableCell>
        <TableCell>{ item.numberOfItems }</TableCell>
        <TableCell>
          <FormattedDate
            value={ new Date(item.createdAt) }
            year='numeric'
            month='short'
            day='2-digit'
          />
        </TableCell>
        <TableCell padding="checkbox">
          <IconButton
            color="primary"
            onClick={ this.setUpdatedWishlist(item.id, item.name) }
            disabled={ isLoading }
          >
            <EditIcon/>
          </IconButton>
        </TableCell>
        <TableCell padding="checkbox">
          <IconButton
            color="primary"
            onClick={ this.handleDeleteWishlist(item.id) }
            disabled={ isLoading }
          >
            <DeleteIcon/>
          </IconButton>
        </TableCell>
      </TableRow>
    ));

    return (
      <Grid container>

        <Grid item xs={ 12 } container justify="center">
          <Typography
            variant="headline"
            children="Manage wishlists"
          />
        </Grid>

        <Grid item xs={ 12 } container justify="center">
          <Paper elevation={ 4 } className={ classes.paperContainer }>
            <form noValidate autoComplete="off" onSubmit={ this.addWishlist }>
              <TextField
                className={ classes.newList }
                value={ this.state.name }
                onChange={ this.handleChangeName }
              />
              <Button type="submit" variant="contained" color="primary">
                Add new wishlist
              </Button>
            </form>
            <Divider/>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={ classes.headerCell }>Name</TableCell>
                  <TableCell className={ classes.headerCell }># of items</TableCell>
                  <TableCell className={ classes.headerCell }>Date of creation</TableCell>
                  <TableCell numeric />
                  <TableCell numeric />
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

export const ConnectedWishlistPage = withStyles(styles)(WishListBase);

export default ConnectedWishlistPage;
