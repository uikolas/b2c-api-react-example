import * as React from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { NavLink } from 'react-router-dom';

import {AppLogo} from '../AppLogo';
import CatalogSearch from '../CatalogSearch';
import {styles} from './styles';
import config from '../../../config';
import {reduxify} from '../../../lib/redux-helper';
import {ILoginState} from '../../../reducers/Pages/Login';
import {RouteProps} from "react-router";
import {SearchState} from '../../../reducers/Pages/Search';
import {IProductCard} from '../../../interfaces/product';
import {SprykerButton} from '../../UI/SprykerButton';
import {logout} from '../../../actions/Pages/Login';

interface AppHeaderProps extends WithStyles<typeof styles>, RouteProps {
  dispatch?: Function;
  customer?: any;
  isAuth?: boolean;
  isLoading: boolean;
  suggestions?: Array<IProductCard>;
  searchTerm?: string;
}

export const AppHeaderBase: React.SFC<AppHeaderProps> = (props) => {
  const { classes, location, isAuth, dispatch } = props;

  const handleLogout = () => {
    dispatch(logout());
  };

  const shoppingCart = (
    <Badge badgeContent={0} color="primary" classes={{ badge: classes.badge }}>
      <ShoppingCartIcon className={classes.icon} />
    </Badge>
  );

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
            { location.pathname === config.WEB_PATH || location.pathname === `${config.WEB_PATH}login`
              ? <CatalogSearch />
              : null
            }
          </Grid>
          <Grid item sm={4}
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
          >
            <NavLink to={isAuth ? `${config.WEB_PATH}`: `${config.WEB_PATH}login`}>
              <SprykerButton
                title={isAuth ? 'Logout' : 'Register/Login'}
                onClick={isAuth ? handleLogout : null}
              />
            </NavLink>

            <NavLink to={`${config.WEB_PATH}cart`}>
              <SprykerButton
                title="Cart"
                iconComponent={shoppingCart}
              />
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
