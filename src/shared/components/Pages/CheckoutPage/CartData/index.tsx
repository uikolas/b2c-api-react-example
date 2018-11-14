import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import { styles } from './styles';
import { CartProductsList } from 'src/shared/components/Pages/CheckoutPage/CartProductsList';
import { ICartDataProps } from 'src/shared/components/Pages/CheckoutPage/CartData/types';


export const CartDataBase: React.SFC<ICartDataProps> = (props): JSX.Element => {
  const {classes} = props;

  return (
    <Grid container className={ classes.root }>
      <Grid item xs={ 12 }>
        CartData
        <CartProductsList/>
      </Grid>
    </Grid>
  );
};

export const CartData = withStyles(styles)(CartDataBase);

