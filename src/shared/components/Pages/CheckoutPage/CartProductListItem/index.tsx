import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import { styles } from './styles';
import {ICartProductListItemProps} from "src/shared/components/Pages/CheckoutPage/CartProductListItem/types";


export const CartProductListItemBase: React.SFC<ICartProductListItemProps> = (props): JSX.Element => {
  const {classes}  = props;

  return (
    <Grid container className={ classes.root }>
      <Grid item xs={ 12 }>
        CartProductListItem
      </Grid>
    </Grid>
  );
};

export const CartProductListItem = withStyles(styles)(CartProductListItemBase);

