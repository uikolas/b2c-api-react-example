import * as React from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { NavLink } from 'react-router-dom';

import {AppLogo} from '../AppLogo';
import CatalogSearch from '../CatalogSearch';
import {styles} from './styles';
import config from '../../../config';
import {reduxify} from '../../../lib/redux-helper';
import {ILoginState} from '../../../reducers/Pages/Login';
import {RouteProps} from "react-router";
import {SearchState} from '../../../reducers/Pages/Search';
import {getTotalProductsQuantity} from '../../../reducers/Common/Cart';
import {IProductCard, TProductQuantity} from '../../../interfaces/product';
import {SprykerButton} from '../../UI/SprykerButton';
import {logout} from '../../../actions/Pages/Login';
import {ShoppingCart} from '../ShoppingCart';
import {SprykerNotification} from '../../UI/SprykerNotification';

interface AppHeaderProps extends WithStyles<typeof styles>, RouteProps {
  dispatch?: Function;
  customer?: any;
  isAuth?: boolean;
  isLoading: boolean;
  suggestions?: Array<IProductCard>;
  searchTerm?: string;
  totalProductsQuantity: TProductQuantity;
}

interface AppHeaderState {
  isCartNotificationOpen: boolean;
}

export class AppHeaderBase extends React.Component<AppHeaderProps, AppHeaderState> {

  public state: AppHeaderState = {
    isCartNotificationOpen: false,
  };

  public componentDidUpdate = (prevProps: AppHeaderProps, prevState: AppHeaderState) => {
    if (this.props.totalProductsQuantity > prevProps.totalProductsQuantity) {
      this.handleOpenCartNotification();
    }
  }

  public handleLogout = () => {
    this.props.dispatch(logout());
  }

  public handleCloseCartNotification = (event?: any, reason?: string): void => {
    this.setState({ isCartNotificationOpen: false });
  }

  public handleOpenCartNotification = (event?: any): void => {
    this.setState({ isCartNotificationOpen: true });
  }

  public render(): JSX.Element {
    const { classes, location, isAuth, totalProductsQuantity } = this.props;

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
                  onClick={isAuth ? this.handleLogout : null}
                />
              </NavLink>

              <NavLink to={`${config.WEB_PATH}cart`}>
                <SprykerButton
                  title="Cart"
                  iconComponent={<ShoppingCart totalProductsQuantity={totalProductsQuantity} />}
                />
              </NavLink>
              <SprykerNotification
                message="Your product was added to your cart"
                extraClasses={classes.cartNotification}
                isOpen={this.state.isCartNotificationOpen}
                onClickClose={this.handleCloseCartNotification}
                onClickOpen={this.handleOpenCartNotification}
                vertical="top"
                horizontal="right"
              />
            </Grid>

          </Grid>

        </Toolbar>
      </AppBar>
    );
  }
}

const DecoratedHeader = withStyles(styles)(AppHeaderBase);

export const AppHeader = reduxify(
  (state: any, ownProps: any) => {
    const routerProps: RouteProps = state.routing ? state.routing : {};
    const pagesLoginProps: ILoginState = state.pagesLogin ? state.pagesLogin : null;
    const searchProps: SearchState = state.pageSearch ? state.pageSearch : null;
    const totalProductsQuantity: TProductQuantity = getTotalProductsQuantity(state, ownProps);
    return (
      {
        location: routerProps.location ? routerProps.location : ownProps.location,
        customer: pagesLoginProps && pagesLoginProps.data.customer ? pagesLoginProps.data.customer : ownProps.customer,
        isAuth: pagesLoginProps && pagesLoginProps.data.isAuth ? pagesLoginProps.data.isAuth : ownProps.isAuth,
        isLoading: pagesLoginProps && pagesLoginProps.pending ? pagesLoginProps.pending : ownProps.pending,
        suggestions: searchProps && searchProps.data.suggestions ? searchProps.data.suggestions : ownProps.suggestions,
        searchTerm: searchProps && searchProps.data.searchTerm ? searchProps.data.searchTerm : ownProps.searchTerm,
        totalProductsQuantity,
      }
    );
  }
)(DecoratedHeader);
