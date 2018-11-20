import * as React from 'react';
import { NavLink } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField/TextField';
import Grid from '@material-ui/core/Grid/Grid';
import Button from '@material-ui/core/Button/Button';
import Typography from '@material-ui/core/Typography/Typography';
import Divider from '@material-ui/core/Divider/Divider';
import { AppPrice } from 'src/shared/components/Common/AppPrice';
import { pathCheckoutPage } from 'src/shared/routes/contentRoutes';
import { styles } from '../styles';
import { OrderSummaryProps as Props } from './types';

export const OrderSummaryComponent: React.SFC<Props> = (
  {classes, handleChangeVouchercode, voucherCode, totals},
) => (
  <Grid item xs={ 12 } md={ 4 }>
    <Typography variant="display1" noWrap align="left" color="primary">
      { 'Order summary' }
    </Typography>
    <Divider className={ classes.calcDivider }/>

    <Grid container spacing={ 24 }>
      <Grid item xs={ 8 }>
        <form noValidate autoComplete="off" className={ `${classes.fullWidth} ${classes.btnWrapper}` }>
          <TextField
            name="voucher"
            label="Apply voucher code"
            value={ voucherCode }
            onChange={ handleChangeVouchercode }
            fullWidth
            InputLabelProps={ {shrink: true} }
            InputProps={ {
              style: {height: '44px'},
            } }
            variant="outlined"
          />
        </form>
      </Grid>
      <Grid item xs={ 4 }>
        <Button variant="outlined" color="primary" fullWidth className={ classes.btnWrapper }>apply</Button>
      </Grid>
    </Grid>

    <Divider className={ classes.fullWidth }/>

    <div className={ classes.totalMsg }>
      <div>Subtotal</div>
      <div>{ totals && <AppPrice value={ totals.subtotal } extraClassName={ classes.mainCurrency }/> }</div>
    </div>
    <div className={ classes.totalMsg }>
      <div>Tax</div>
      <div>{ totals && <AppPrice value={ totals.taxTotal } extraClassName={ classes.mainCurrency }/> }</div>
    </div>
    <div className={ classes.totalMsg } style={ {marginBottom: '24px'} }>
      <div>Discount</div>
      <div>
        { totals && <AppPrice value={ totals.discountTotal } extraClassName={ classes.mainCurrency }/> }
      </div>
    </div>

    <Divider className={ classes.fullWidth }/>

    <div className={ `${classes.totalMsg}` }>
      <div className={ classes.grandTotal }>Grand Total</div>
      <div>{ totals && <AppPrice value={ totals.grandTotal }/> }</div>
    </div>

    <Divider className={ classes.fullWidth }/>

    <NavLink to={ pathCheckoutPage } className={ classes.fullWidth } style={ {textDecoration: 'none'} }>
      <Button variant="contained" color="primary" fullWidth className={ classes.btnWrapper }>
        continue to checkout
      </Button>
    </NavLink>

    <div className={ `${classes.itemAttr} ${classes.shippingMsg}` }>
      Shipping fee will be calculated based on Shipping address
    </div>
  </Grid>
);

export const OrderSummary = withStyles(styles)(OrderSummaryComponent);
