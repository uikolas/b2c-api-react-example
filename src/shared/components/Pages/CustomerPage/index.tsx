import * as React from "react";
import {Route, Switch, RouteProps} from 'react-router';
import {Location} from 'history';
import {NavLink} from 'react-router-dom';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import {reduxify} from '../../../lib/redux-helper';


import {AppMain} from '../../Common/AppMain';

import {styles} from './styles';

import {ConnectedWishlistPage} from '../WishListPage';
import {ConnectedWishlistDetailPage} from '../WishlistDetail';
import {ConnectedOrderHistoryPage} from '../OrderHistoryPage';
import {ConnectedOrderDetailsPage} from '../OrderDetailsPage';
import {
  pathCustomerPage,
  pathOrderDetailsPage,
  pathOrderHistoryPage,
  pathUserAddressesPage,
  pathUserProfilePage,
  pathWishListPage,
  pathWishListsPage,
} from '../../../routes/contentRoutes';


interface CustomerPageProps extends WithStyles<typeof styles> {
  location: Location;
}

interface CustomerPageState {

}


export class CustomerPageBase extends React.Component<CustomerPageProps, CustomerPageState> {

  public state: CustomerPageState = {

  };

  public handleMenuItemClick = (option: string) => (e: any) => {
    this.setState({selectedMenu: option});
  }

  public render() {
    const {classes, location} = this.props;

    return (
      <AppMain>
        <Grid container>
          <Grid item xs={3} container direction="column" justify="center">
            <Paper>
              <MenuList>
                <MenuItem
                  selected={location.pathname === pathUserProfilePage}
                >
                  <NavLink to={pathUserProfilePage}>
                    Profile
                  </NavLink>
                </MenuItem>
                <MenuItem
                  selected={location.pathname === pathUserAddressesPage}
                >
                  <NavLink to={pathUserAddressesPage}>
                    Addresses
                  </NavLink>
                </MenuItem>
                <MenuItem
                  selected={location.pathname.includes(pathOrderHistoryPage)}
                >
                  <NavLink to={pathOrderHistoryPage}>
                    Orders history
                  </NavLink>
                </MenuItem>
                <MenuItem
                  selected={location.pathname.includes(pathWishListsPage)}
                >
                  <NavLink to={pathWishListsPage}>
                    Wishlist
                  </NavLink>
                </MenuItem>
              </MenuList>
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Switch>
              <Route path={pathCustomerPage} exact render={() => 'Customer'} />
              <Route path={pathWishListsPage} component={ConnectedWishlistPage} />
              <Route path={pathWishListPage} component={ConnectedWishlistDetailPage} />
              <Route path={pathOrderHistoryPage} exact component={ConnectedOrderHistoryPage} />
              <Route path={pathOrderDetailsPage} component={ConnectedOrderDetailsPage} />
              <Route path={pathUserProfilePage} render={() => 'Profile page'} />
            </Switch>
          </Grid>
        </Grid>
      </AppMain>
    );
  }
}

export const CustomerPage = withStyles(styles)(CustomerPageBase);

export const ConnectedCustomerPage = reduxify(
  (state: any, ownProps: any) => {
    const routerProps: RouteProps = state.routing ? state.routing : {};

    return (
      {
        location: routerProps.location ? routerProps.location : ownProps.location,
      }
    );
  }
)(CustomerPage);
