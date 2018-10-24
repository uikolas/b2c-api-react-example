import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { CartProps as Props } from './types';
import { styles } from './styles';

const badgeVal: number = 0;

export const CartComponent: React.SFC<Props> = ({classes}) => (
  <div>
    <IconButton aria-label="Cart">
      <Badge
        badgeContent={2}
        classes={{
          colorPrimary: classes.badge,
          badge: badgeVal === 0 && classes.hideBadge,
        }}
        color="primary"
      >
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  </div>
);

export const Cart = withStyles(styles)(CartComponent);
