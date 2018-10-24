import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

import {
  pathCustomerPage,
  pathCustomerProfilePage,
  pathHomePage,
  pathLoginPage,
  pathOrderHistoryPage,
} from 'src/shared/routes/contentRoutes';

import { UserDropProps as Props } from './types';
import { styles } from './styles';

export const UserDropComponent: React.SFC<Props> = ({classes, isUserLoggedIn, logout}) => (
  <div className={ classes.userDrop }>
    <p className={ classes.title }><strong>Your Account</strong></p>
    <ul className={ classes.userDropNav }>
      <li>
        <NavLink to={ pathCustomerProfilePage }>Account Details</NavLink>
      </li>
      <li>
        <NavLink to={ pathOrderHistoryPage }>Order History</NavLink>
      </li>
      <li>
        <NavLink to={ pathCustomerProfilePage }>Profile</NavLink>
      </li>
    </ul>
    <div className={ classes.userBtns }>
      { isUserLoggedIn ? (
        <>
          <Button
            variant="outlined"
            color="primary"
            component={ ({innerRef, ...props}) => <Link { ...props } to={ `${pathCustomerPage}/wishlists` } /> }
          >
            Wishlist
          </Button>
          <Button
            variant="contained"
            color="primary"
            component={ ({innerRef, ...props}) => <Link { ...props } to={ pathHomePage }/> }
            onClick={ logout }
          >
            Log Out
          </Button>
        </>
      ) : (
        <>
          <Button variant="outlined" color="primary"
                  component={ ({innerRef, ...props}) => <Link { ...props } to={ pathLoginPage }/> }>
            Register
          </Button>
          <Button
            variant="contained"
            color="primary"
            component={ ({innerRef, ...props}) => <Link { ...props } to={ pathLoginPage }/> }
          >
            Log In
          </Button>
        </>
      ) }
    </div>
  </div>
);

export const UserDrop = withStyles(styles)(UserDropComponent);
