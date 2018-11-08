import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { styles } from './styles';
import {TOrderProducts} from "src/shared/interfaces/order/index";


interface CartProductListItemProps extends WithStyles<typeof styles> {

}


export const CartProductListItemBase: React.SFC<CartProductListItemProps> = (props): JSX.Element => {
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

