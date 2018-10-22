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
import {CustomerAddressPage} from '../CustomerAddressesPage';
import {AddressFormPage} from '../CustomerAddressesPage/AddressForm';
import {ConnectedOrderDetailsPage} from "../OrderDetailsPage/reduxified";
import {ConnectedOrderHistoryPage} from "../OrderHistoryPage/reduxified";
import {
  pathCustomerPage,
  pathOrderDetailsPage,
  pathOrderHistoryPage,
  pathCustomerAddressesPage,
  pathAddressFormPage,
  pathCustomerProfilePage,
  pathWishListPage,
  pathWishListsPage,
} from '../../../routes/contentRoutes';
import {ConnectedCustomerProfilePage} from "../CustomerProfilePage/index";
import {getRouterLocation} from "../../../selectors/Common/router";


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
          <Grid item xs={3} container direction="column" justify="flex-start" className={classes.pageMenu}>
            <Paper>
              <MenuList>
                <MenuItem
                  selected={location.pathname === pathCustomerProfilePage}
                >
                  <NavLink to={pathCustomerProfilePage} className={classes.link}>
                    Profile
                  </NavLink>
                </MenuItem>
                <MenuItem
                  selected={location.pathname === pathCustomerAddressesPage}
                >
                  <NavLink to={pathCustomerAddressesPage} className={classes.link}>
                    Addresses
                  </NavLink>
                </MenuItem>
                <MenuItem
                  selected={location.pathname.includes(pathOrderHistoryPage)}
                >
                  <NavLink to={pathOrderHistoryPage} className={classes.link}>
                    Orders history
                  </NavLink>
                </MenuItem>
                <MenuItem
                  selected={location.pathname.includes(pathWishListsPage)}
                >
                  <NavLink to={pathWishListsPage} className={classes.link}>
                    Wishlist
                  </NavLink>
                </MenuItem>
              </MenuList>
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Switch>
              <Route path={pathCustomerPage} exact component={ConnectedCustomerProfilePage} />
              <Route path={pathCustomerAddressesPage} exact component={CustomerAddressPage} />
              <Route path={pathAddressFormPage} component={AddressFormPage} />
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
    const location = getRouterLocation(state, ownProps);
    const routerProps: RouteProps = state.routing ? state.routing : {};

    return (
      {
        location,
      }
    );
  }
)(CustomerPage);
