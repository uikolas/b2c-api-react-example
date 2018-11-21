import * as React from 'react';
import { NavLink } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid/Grid';
import Button from '@material-ui/core/Button/Button';
import Typography from '@material-ui/core/Typography/Typography';
import { pathCheckoutPage } from 'src/shared/routes/contentRoutes';
import { styles } from '../styles';
import { OrderSummaryProps as Props } from './types';
import { CartTotal } from 'src/shared/components/Common/CartTotal';

export const OrderSummaryComponent: React.SFC<Props> = (
  {classes, handleChangeVouchercode, voucherCode, totals},
) => (
  <Grid item xs={ 12 } md={ 4 }>
    <Typography
      variant="display1"
      noWrap
      align="left"
      color="primary"
    >
      { 'Order summary' }
    </Typography>

    <CartTotal extraClass={classes.cartTotalIndent} totals={totals} />

    <NavLink
      to={ pathCheckoutPage }
      className={ classes.fullWidth }
      style={{ textDecoration: 'none' }}
    >
      <Button
        variant="contained"
        color="primary"
        fullWidth
        className={ classes.btnWrapper }
      >
        continue to checkout
      </Button>
    </NavLink>
  </Grid>
);

export const OrderSummary = withStyles(styles)(OrderSummaryComponent);
