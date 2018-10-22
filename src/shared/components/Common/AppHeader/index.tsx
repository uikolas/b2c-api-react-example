import * as React from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/PersonOutline';
import { NavLink } from 'react-router-dom';

import {AppLogo} from '../AppLogo';
import CatalogSearch from '../CatalogSearch';
import {styles} from './styles';
import {reduxify} from '../../../lib/redux-helper';
import {isUserAuthenticated} from '../../../reducers/Pages/Login';
import {RouteProps} from "react-router";
import {getSearchTerm, getSuggestions} from '../../../reducers/Pages/Search';
import {
  getTotalItemsQuantity,
  getTotalProductsQuantity,
} from '../../../reducers/Common/Cart';
import {IProductCard, TProductQuantity} from '../../../interfaces/product';
import {SprykerButton} from '../../UI/SprykerButton';
import {logout} from '../../../actions/Pages/Login';
import {ShoppingCart} from '../ShoppingCart';
import {SprykerNotification} from '../../UI/SprykerNotification';
import {Preloader} from "../Preloader";
import {pathCartPage, pathHomePage, pathLoginPage, pathCustomerPage} from "../../../routes/contentRoutes";

interface AppHeaderProps extends WithStyles<typeof styles>, RouteProps {
  dispatch?: Function;
  isUserLoggedIn?: boolean;
  isLoading: boolean;
  suggestions?: Array<IProductCard>;
  searchTerm?: string;
  cartItemsQuantity: TProductQuantity;
  cartProductsQuantity: TProductQuantity;
}

interface AppHeaderState {
  isCartNotificationOpen: boolean;
}

export class AppHeaderBase extends React.Component<AppHeaderProps, AppHeaderState> {

  public state: AppHeaderState = {
    isCartNotificationOpen: false,
  };

  public componentDidUpdate (prevProps: AppHeaderProps, prevState: AppHeaderState) {
    if (this.props.cartProductsQuantity > prevProps.cartProductsQuantity) {
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
    const { classes, location, isUserLoggedIn, cartItemsQuantity, cartProductsQuantity, isLoading } = this.props;

    return (
      <AppBar position="fixed" color="default" className={classes.appBar}>
        <Toolbar>
          <Grid container direction="row">

            <Grid item sm={3}
                  direction="row"
                  container
                  justify="flex-start"
                  alignItems="center">
              <AppLogo />
            </Grid>

            <Grid item sm={4} container alignItems="center">
              { location.pathname === pathHomePage
                ? null
                : <CatalogSearch />
              }
            </Grid>
            <Grid item sm={5}
                  container
                  direction="row"
                  justify="flex-end"
                  alignItems="center"
            >
              { isUserLoggedIn
                ? (
                  <NavLink to={`${pathCustomerPage}/wishlists`}>
                    <SprykerButton
                      title="Wishlist"
                    />
                  </NavLink>)
                : null
              }
              <NavLink to={isUserLoggedIn ? pathHomePage : pathLoginPage}>
                <SprykerButton
                  title={isUserLoggedIn ? 'Logout' : 'Register/Login'}
                  onClick={isUserLoggedIn ? this.handleLogout : null}
                />
              </NavLink>

              <NavLink to={pathCartPage}>
                <SprykerButton
                  title="Cart"
                  iconComponent={(
                    <ShoppingCart
                      cartItemsQuantity={cartItemsQuantity}
                      cartProductsQuantity={cartProductsQuantity}
                    />
                  )}
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
              { /* TODO: Add fetching data on click !!!*/ }
              {isUserLoggedIn
                ?  <NavLink to={pathCustomerPage}>
                    <Button variant="fab" className={classes.customerBtn}>
                      <PersonIcon />
                    </Button>
                  </NavLink>
                : null
              }

            </Grid>

          </Grid>

        </Toolbar>
        {isLoading ? <Preloader extraClasses={classes.preloader}/> : null}
      </AppBar>
    );
  }
}

const DecoratedHeader = withStyles(styles)(AppHeaderBase);

export const AppHeader = reduxify(
  (state: any, ownProps: any) => {
    const routerProps: RouteProps = state.routing ? state.routing : {};
    const cartItemsQuantity: TProductQuantity = getTotalItemsQuantity(state, ownProps);
    const cartProductsQuantity: TProductQuantity = getTotalProductsQuantity(state, ownProps);
    const isUserLoggedIn = isUserAuthenticated(state, ownProps);
    const searchTerm = getSearchTerm(state, ownProps);
    const suggestions = getSuggestions(state, ownProps);

    return ({
        location: routerProps.location ? routerProps.location : ownProps.location,
        suggestions,
        searchTerm,
        cartItemsQuantity,
        cartProductsQuantity,
        isUserLoggedIn,
    });
  }
)(DecoratedHeader);
