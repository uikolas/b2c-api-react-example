import * as React from 'react';
import { Route, RouteProps, Switch } from 'react-router';
import { Location } from 'history';
import { NavLink } from 'react-router-dom';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
// import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { ClickEvent } from 'src/shared/interfaces/commoon/react';
import {
  pathAddressFormPage,
  pathCustomerAddressesPage,
  pathCustomerPage,
  pathCustomerProfilePage,
  pathOrderDetailsPage,
  pathOrderHistoryPage,
  pathWishListPage,
  pathWishListsPage,
} from 'src/shared/routes/contentRoutes';
import { getRouterLocation } from 'src/shared/selectors/Common/router';
import { reduxify } from '../../../lib/redux-helper';
import { AppMain } from '../../Common/AppMain';
import { LoadableWishListPage } from '../WishListPage/loadable';
import { LoadableWishlistDetail } from '../WishlistDetail/loadable';
import { LoadableCustomerAddressPage } from '../CustomerAddressesPage/loadable';
import { AddressFormPage } from '../CustomerAddressesPage/AddressForm';
import { LoadableConnectedOrderDetailsPage } from '../OrderDetailsPage/loadable';
import { LoadableConnectedOrderHistoryPage } from '../OrderHistoryPage/loadable';
import { LoadableCustomerProfilePage } from '../CustomerProfilePage/loadable';
import { styles } from './styles';

interface CustomerPageProps extends WithStyles<typeof styles> {
  location: Location;
}

interface CustomerPageState {

}

export class CustomerPageBase extends React.Component<CustomerPageProps, CustomerPageState> {

  public state: CustomerPageState = {};

  public handleMenuItemClick = (option: string) => (e: ClickEvent) => {
    this.setState({selectedMenu: option});
  };

  public render() {
    const {classes, location} = this.props;

    return (
      <AppMain>
        <Grid container justify="space-between" className={classes.customerContainer}>
          <Grid item xs={ 12 } sm={ 3 } container direction="column">
            <Paper>
              <MenuList>
                <MenuItem
                  selected={ location.pathname === pathCustomerProfilePage }
                >
                  <NavLink to={ pathCustomerProfilePage } className={ classes.link }>
                    Profile
                  </NavLink>
                </MenuItem>
                <MenuItem
                  selected={ location.pathname === pathCustomerAddressesPage }
                >
                  <NavLink to={ pathCustomerAddressesPage } className={ classes.link }>
                    Addresses
                  </NavLink>
                </MenuItem>
                <MenuItem
                  selected={ location.pathname.includes(pathOrderHistoryPage) }
                >
                  <NavLink to={ pathOrderHistoryPage } className={ classes.link }>
                    Orders history
                  </NavLink>
                </MenuItem>
                <MenuItem
                  selected={ location.pathname.includes(pathWishListsPage) }
                >
                  <NavLink to={ pathWishListsPage } className={ classes.link }>
                    Wishlist
                  </NavLink>
                </MenuItem>
              </MenuList>
            </Paper>
          </Grid>
          <Grid item xs={ 12 } sm={ 7 }>
            <Switch>
              <Route path={ pathCustomerPage } exact component={ LoadableCustomerProfilePage }/>
              <Route path={ pathCustomerAddressesPage } exact component={ LoadableCustomerAddressPage }/>
              <Route path={ pathAddressFormPage } component={ AddressFormPage }/>
              <Route path={ pathWishListsPage } component={ LoadableWishListPage }/>
              <Route path={ pathWishListPage } component={ LoadableWishlistDetail }/>
              <Route path={ pathOrderHistoryPage } exact component={ LoadableConnectedOrderHistoryPage }/>
              <Route path={ pathOrderDetailsPage } component={ LoadableConnectedOrderDetailsPage }/>
              <Route path={ pathCustomerProfilePage } component={ LoadableCustomerProfilePage }/>
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
  },
)(CustomerPage);

export default ConnectedCustomerPage;
