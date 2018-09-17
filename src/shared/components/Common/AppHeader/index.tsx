import * as React from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { NavLink } from 'react-router-dom';

import {AppLogo} from '../AppLogo';
import CatalogSearch from '../CatalogSearch';
import {styles} from './styles';

import {reduxify} from '../../../lib/redux-helper';
import {ILoginState} from '../../../reducers/Pages/Login';
import {RouteProps} from "react-router";
import {SearchState} from '../../../reducers/Pages/Search';
import {IProductCard} from '../../../interfaces/productCard';

interface AppHeaderProps extends WithStyles<typeof styles> {
  customer?: any;
  isAuth?: boolean;
  isLoading: boolean;
  suggestions?: Array<IProductCard>;
  searchTerm?: string;
}

export const AppHeaderBase: React.SFC<AppHeaderProps> = (props) => {
  const { classes } = props;

  return (
    <AppBar position="absolute" color="default" className={classes.appBar}>
      <Toolbar>
        <Grid container direction="row">

          <Grid item sm={3}
                direction="row"
                container
                justify="flex-start"
                alignItems="center">
            <AppLogo />
          </Grid>

          <Grid item sm={5}>
            <CatalogSearch />
          </Grid>
          <Grid item sm={4}
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
          >
            <NavLink to="/login">
              <Button
                variant="contained"
                component="button"
                className={classes.button}
              >
                Register/Login
              </Button>
            </NavLink>

            <NavLink to="/cart">
              <Button variant="contained" component="button" className={classes.button}>
                Cart
              </Button>
            </NavLink>
          </Grid>

        </Grid>

      </Toolbar>
    </AppBar>
  );
};

const DecoratedHeader = withStyles(styles)(AppHeaderBase);

export const AppHeader = reduxify(
  (state: any, ownProps: any) => {
    const routerProps: RouteProps = state.routing ? state.routing : {};
    const pagesLoginProps: ILoginState = state.pagesLogin ? state.pagesLogin : null;
    const searchProps: SearchState = state.pageSearch ? state.pageSearch : null;
    return (
      {
        location: routerProps.location ? routerProps.location : ownProps.location,
        customer: pagesLoginProps && pagesLoginProps.data.customer ? pagesLoginProps.data.customer : ownProps.customer,
        isAuth: pagesLoginProps && pagesLoginProps.data.isAuth ? pagesLoginProps.data.isAuth : ownProps.isAuth,
        isLoading: pagesLoginProps && pagesLoginProps.pending ? pagesLoginProps.pending : ownProps.pending,
        suggestions: searchProps && searchProps.data.suggestions ? searchProps.data.suggestions : ownProps.suggestions,
        searchTerm: searchProps && searchProps.data.searchTerm ? searchProps.data.searchTerm : ownProps.searchTerm,
      }
    );
  }
)(DecoratedHeader);
