import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Location } from 'history';
import { NavLink } from 'react-router-dom';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Divider from '@material-ui/core/Divider';
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

import { AppMain } from '../../Common/AppMain';
import { LoadableWishListPage } from '../WishListPage/loadable';
import { LoadableWishlistDetail } from '../WishlistDetail/loadable';
import { LoadableCustomerAddressPage } from '../CustomerAddressesPage/loadable';
import { AddressFormPage } from '../CustomerAddressesPage/AddressForm';
import { LoadableConnectedOrderDetailsPage } from '../OrderDetailsPage/loadable';
import { LoadableConnectedOrderHistoryPage } from '../OrderHistoryPage/loadable';
import { LoadableCustomerProfilePage } from '../CustomerProfilePage/loadable';
import { Logo } from './logo';
import { styles } from './styles';
import { connect } from './connect';

interface CustomerPageProps extends WithStyles<typeof styles> {
  location: Location;
  isUserLoggedIn: boolean;
  logout?(): void;
}

@connect
export class CustomerPageBase extends React.PureComponent<CustomerPageProps> {

  public handleLogout = (e: ClickEvent) => {
    e.preventDefault();
    this.props.logout();
  };


  public render() {
    const {classes, location} = this.props;

    return (
      <AppMain>
        <Grid container justify="space-between" className={classes.customerContainer}>
          <Grid item xs={ 12 } sm={ 3 } container direction="column">
            <Paper className={classes.rootPaper}>
              <Logo />

              <MenuList>
                <MenuItem
                  selected={ location.pathname === pathCustomerProfilePage }
                >
                  <NavLink to={ pathCustomerProfilePage } className={ classes.link }>
                    profile
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
                    Order history
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
              <Divider />

              <div
                className={ `${classes.link} ${classes.logoutLink}` }
                onClick={this.handleLogout}
              >
                log out
              </div>
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

export default CustomerPage;
