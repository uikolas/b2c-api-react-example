import * as React from 'react';
import Divider from '@material-ui/core/Divider';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import { AppPrice } from 'src/shared/components/Common/AppPrice';
import { ICartTotals } from 'src/shared/interfaces/cart';
import { styles } from './styles';

interface CartTotalProps extends WithStyles<typeof styles> {
  totals: ICartTotals;
}

export const CartTotalBase: React.SFC<CartTotalProps> = (props) => {
  const { classes, totals } = props;

  return (
    <div className={ classes.fullWidth }>
      <Divider className={ classes.fullWidth } />

      <div className={classes.totalMsg}>
        <div className={classes.currency}>Subtotal</div>
        <div>{ totals && <AppPrice value={ totals.subtotal } extraClassName={classes.currency} /> }</div>
      </div>
      <div className={classes.totalMsg}>
        <div className={classes.currency}>Tax</div>
        <div>{ totals && <AppPrice value={ totals.taxTotal } extraClassName={classes.currency} /> }</div>
      </div>
      <div className={`${classes.totalMsg} ${classes.marginBottom}`}>
        <div className={classes.currency}>Discount</div>
        <div>
          { totals && totals.discountTotal > 0 && <span>- </span> }
          { totals && <AppPrice value={ totals.discountTotal } extraClassName={classes.currency} /> }
        </div>
      </div>

      <Divider className={ classes.fullWidth } />

      <div className={`${classes.totalMsg}`}>
        <div className={classes.grandTotal}>
          Grand Total
        </div>
        <div>{ totals && <AppPrice value={ totals.grandTotal } extraClassName={classes.grandTotal} /> }</div>
      </div>

      <Divider className={ classes.fullWidth } />
    </div>
  );
};

export const CartTotal = withStyles(styles)(CartTotalBase);
