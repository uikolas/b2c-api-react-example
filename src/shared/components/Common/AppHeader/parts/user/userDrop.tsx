import * as React from 'react';
import { withRouter } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

import {
  pathCustomerAddressesPage,
  pathCustomerProfilePage,
  pathHomePage,
  pathLoginPage,
  pathOrderHistoryPage,
  pathWishListsPage,
} from 'src/shared/routes/contentRoutes';

import { UserDropProps as Props } from './types';
import { connect } from './connect';
import { styles } from './styles';
import { ClickEvent } from 'src/shared/interfaces/commoon/react';

@connect
@(withRouter as any)
export class UserDropComponent extends React.PureComponent<Props> {

  public customerLogout = (e: ClickEvent) => {
    e.preventDefault();
    this.props.logout();
  };

  public render() {
    const {classes, isUserLoggedIn} = this.props;
    const loggedInUser = (
      <div className={ classes.userDrop }>
        <p className={ classes.title }><strong>Your Account</strong></p>
        <ul className={ classes.userDropNav }>
          <li>
            <NavLink to={ pathCustomerProfilePage }>Profile</NavLink>
          </li>
          <li>
            <NavLink to={ pathCustomerAddressesPage }>Addresses</NavLink>
          </li>
          <li>
            <NavLink to={ pathOrderHistoryPage }>Order History</NavLink>
          </li>
          <li>
            <NavLink to={ pathWishListsPage }>Wishlist</NavLink>
          </li>
        </ul>
        <div className={ classes.userBtns }>
          <Button
            variant="contained"
            color="primary"
            component={ ({innerRef, ...props}) => <Link { ...props } to={ pathHomePage }/> }
            onClick={ this.customerLogout }
          >
            Log Out
          </Button>
        </div>
      </div>
    );
    const notLoggedInUser = (
      <div className={ classes.userDrop }>
        <p className={ classes.title }><strong>Your Account</strong></p>
        <div className={ classes.userBtns }>
          <Button
            variant="outlined" color="primary"
            component={ ({innerRef, ...props}) => <Link { ...props } to={ pathLoginPage }/> }
          >
            Register
          </Button>
          <Button
            variant="contained"
            color="primary"
            component={ ({innerRef, ...props}) => <Link { ...props } to={ pathLoginPage }/> }
          >
            Log In
          </Button>
        </div>
      </div>
    );

    return isUserLoggedIn ? loggedInUser : notLoggedInUser;
  }
}

export const UserDrop = withStyles(styles)(UserDropComponent);
