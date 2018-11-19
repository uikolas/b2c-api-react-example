import * as React from 'react';
import { FormattedDate } from 'react-intl';
import { RouteProps } from 'react-router';
import { NavLink } from 'react-router-dom';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import {AppPageTitle} from "../../Common/AppPageTitle";
import {AppTable} from "../../Common/AppTable";

import { reduxify } from 'src/shared/lib/redux-helper';
import {
  addWishlistAction,
  deleteWishlistAction,
  getDetailWishlistAction,
  getWishlistsAction,
  updateWishlistAction,
} from 'src/shared/actions/Pages/Wishlist';
import { IWishlist } from 'src/shared/interfaces/wishlist';
import { WishlistState } from 'src/shared/reducers/Pages/Wishlist';
import { styles } from './styles';
import { pathCustomerPage } from 'src/shared/routes/contentRoutes';

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
  };

  public componentDidMount() {
    if (!this.props.isInitial) {
      this.props.dispatch(getWishlistsAction());
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
    this.props.dispatch(addWishlistAction(this.state.name));
    this.setState({name: ''});
  };

  public handleUpdateWishlist = (e: any) => {
    this.props.dispatch(updateWishlistAction(this.state.updatedList, this.state.updatedName));
    this.setState({updatedList: '', updatedName: ''});
  };

  public handleDeleteWishlist = (wishlistId: string) => (e: any) => {
    this.props.dispatch(deleteWishlistAction(wishlistId));
  };

  private setUpdatedWishlist = (id: string, name: string) => (e: any) => {
    this.setState({updatedList: id, updatedName: name});
  };

  public setCurrentWishlist = (wishlistId: string) => (e: any) => {
    this.props.dispatch(getDetailWishlistAction(wishlistId));
  };

  public render() {
    const {classes, wishlists, isLoading, isInitial} = this.props;
    const tableAction = isLoading ? classes.tableActionDisabled : classes.tableAction;

    if (!wishlists.length && isLoading) {
      return null;
    }

    const headerCells: any[] = [
      {
        content: 'Name'
      },
      {
        content: 'Items'
      },
      {
        content: 'Created'
      },
      {
        content: ''
      },
      {
        content: ''
      }
    ];

    const bodyRows: any[] = wishlists.map((item: any) => (
      {
        id: item.id,
        cells: [
          {
            content: (
              this.state.updatedList && this.state.updatedList === item.id
                ?  (
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
                :
                <NavLink
                  className={classes.link}
                  to={ `${pathCustomerPage}/wishlist/${item.name}` }
                  onClick={ this.setCurrentWishlist(item.id) }
                >
                  { item.name }
                </NavLink>
            )
          },
          {
            content: (
              item.numberOfItems
            )
          },
          {
            content: (
              <FormattedDate
                value={ new Date(item.createdAt) }
                year='numeric'
                month='short'
                day='2-digit'
              />
            )
          },
          {
            content: (
              <Typography component="span" className={tableAction} onClick={ this.setUpdatedWishlist(item.id, item.name) }>
                Edit
              </Typography>
            )
          },
          {
            content: (
              <Typography component="span" className={tableAction} onClick={ this.handleDeleteWishlist(item.id) }>
                Delete
              </Typography>
            )
          }
        ]
      }
    ));

    return (
      <Grid container>

        <Grid item xs={ 12 }>
          <AppPageTitle
            classes={{ root: classes.appPageTitleRoot, pageHeader: classes.appPageTitleRootPageHeader }}
            title="Wishlist"
          />
        </Grid>

        <Grid item xs={ 12 }>
          <form noValidate autoComplete="off" onSubmit={ this.addWishlist } className={classes.form}>
            <Typography paragraph className={classes.titleForm}>
                Add New Wishlist
            </Typography>

            <Paper elevation={ 0 } className={classes.formItem}>
              <TextField
                className={classes.textFieldForm}
                placeholder="Wishlist Name"
                value={ this.state.name }
                variant={'outlined'}
                onChange={ this.handleChangeName }
                inputProps = {{
                    className: classes.input
                }}
              />

              <Button type="submit" variant="contained" color="primary" className={classes.formSubmit}>
                  Add
              </Button>
            </Paper>
          </form>

          {
            bodyRows.length ?
              <AppTable
                headerCells = {headerCells}
                bodyRows = {bodyRows}
              /> :
              <Paper elevation={ 0 }>
                <Divider />

                <Typography paragraph className={classes.noItems}>
                  You do not have any lists yet, create one above to get started.
                </Typography>

              </Paper>
          }

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
  },
)(WishlistPage);
