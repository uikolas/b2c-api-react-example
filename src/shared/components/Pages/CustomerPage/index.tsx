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
import {CustomerAddressPage} from '../CustomerAddressesPage';
import {
  pathCustomerPage,
  pathOrderDetailsPage,
  pathOrderHistoryPage,
  pathCustomerAddressesPage,
  pathCustomerProfilePage,
  pathWishListPage,
  pathWishListsPage,
} from '../../../routes/contentRoutes';
import {ConnectedCustomerProfilePage} from "../CustomerProfilePage/index";


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
                  selected={location.pathname === pathCustomerProfilePage}
                >
                  <NavLink to={pathCustomerProfilePage}>
                    Profile
                  </NavLink>
                </MenuItem>
                <MenuItem
                  selected={location.pathname === pathCustomerAddressesPage}
                >
                  <NavLink to={pathCustomerAddressesPage}>
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
              <Route path={pathCustomerAddressesPage} component={CustomerAddressPage} />
              <Route path={pathWishListsPage} component={ConnectedWishlistPage} />
              <Route path={pathWishListPage} component={ConnectedWishlistDetailPage} />
              <Route path={pathOrderHistoryPage} exact component={ConnectedOrderHistoryPage} />
              <Route path={pathOrderDetailsPage} component={ConnectedOrderDetailsPage} />
              <Route path={pathCustomerProfilePage} component={ConnectedCustomerProfilePage} />
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
