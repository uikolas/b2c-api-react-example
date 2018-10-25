import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

import { pathCartPage, pathHomePage } from 'src/shared/routes/contentRoutes';

import { CartDropProps as Props } from '../types';
import { styles } from '../styles';
import { connect } from './connect';

@connect
export class CartDropComponent extends React.PureComponent<Props> {
  public render() {
    const {classes} = this.props;

    return (
      <div className={ classes.cartDrop }>
        <p className={ classes.title }><strong>Cart</strong></p>

        <ul className={ classes.cartDropProductsList }>
          <li>
            <NavLink to={ pathHomePage }>Product</NavLink>
          </li>
        </ul>

        <div className={ classes.cartTotal }>
          <span>Total</span>
          <span>767.42</span>
        </div>

        <div className={ classes.cartBtns }>
          <Button
            variant="outlined" color="primary"
            component={ ({innerRef, ...props}) => <Link { ...props } to={ pathCartPage }/> }
          >
            Cart
          </Button>
          <Button
            variant="contained"
            color="primary"
            component={ ({innerRef, ...props}) => <Link { ...props } to={ pathCartPage }/> }
          >
            Checkout
          </Button>
        </div>
      </div>
    );
  }
}

export const CartDrop = withStyles(styles)(CartDropComponent);
