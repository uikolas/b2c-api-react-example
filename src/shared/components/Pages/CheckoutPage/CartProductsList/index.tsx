import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import { styles } from './styles';
import { ICartProductsListProps } from 'src/shared/components/Pages/CheckoutPage/CartProductsList/types';


export const CartProductsListBase: React.SFC<ICartProductsListProps> = (props): JSX.Element => {
  const {classes, items} = props;

  return (
    <Grid container className={ classes.root }>
      <Grid item xs={ 12 }>
        CartProductsList
      </Grid>
    </Grid>
  );
};

export const CartProductsList = withStyles(styles)(CartProductsListBase);

