import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { styles } from './styles';
import {TOrderProducts} from "src/shared/interfaces/order/index";


interface CartProductsListProps extends WithStyles<typeof styles> {
  items: TOrderProducts;
}


export const CartProductsListBase: React.SFC<CartProductsListProps> = (props): JSX.Element => {
  const {classes, items}  = props;

  return (
    <Grid container className={ classes.root }>
      <Grid item xs={ 12 }>
        CartProductsList
      </Grid>
    </Grid>
  );
};

export const CartProductsList = withStyles(styles)(CartProductsListBase);

