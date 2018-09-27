import * as React from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';

import {styles} from './styles';
import {TProductQuantity} from "../../../interfaces/product/index";

interface ShoppingCartProps extends WithStyles<typeof styles> {
 totalProductsQuantity: TProductQuantity;
}

export const ShoppingCartBase: React.SFC<ShoppingCartProps> = ({totalProductsQuantity, classes}) => {

  const shoppingCart = (
    <ShoppingCartIcon className={classes.icon} />
  );

  const shoppingCartWithQuantity = (
    <Badge
      badgeContent={totalProductsQuantity}
      color="primary"
      classes={{ badge: classes.badge }}
    >
      {shoppingCart}
    </Badge>
  );

  return (
    totalProductsQuantity ? shoppingCartWithQuantity : shoppingCart
  );
};

export const ShoppingCart = withStyles(styles)(ShoppingCartBase);
