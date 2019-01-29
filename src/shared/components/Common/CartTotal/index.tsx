import * as React from 'react';
import Divider from '@material-ui/core/Divider';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { AppPrice } from 'src/shared/components/Common/AppPrice';
import { ICartTotals } from 'src/shared/interfaces/cart';
import { styles } from './styles';
import { FormattedMessage } from 'react-intl';

interface CartTotalProps extends WithStyles<typeof styles> {
    totals: ICartTotals;
    title: string;
    extraClass?: string;
}

export const CartTotalBase: React.SFC<CartTotalProps> = props => {
    const {classes, totals, title, extraClass} = props;

    return (
        <div className={`${classes.fullWidth} ${extraClass ? extraClass : null}`}>
            <Divider className={classes.fullWidth}/>

            <div className={
                `${classes.totalMsg} ${((totals && totals.discountTotal) || (totals && totals.taxTotal))
                    ? null
                    : classes.marginBottom}`
            }>
                <div className={classes.currency}>
                    <FormattedMessage id={'word.subtotal.title'} />
                </div>
                <div>{totals && <AppPrice value={totals.subtotal} extraClassName={classes.currency} /> }</div>
            </div>
            { totals
                ? (
                    <div
                        className={
                            `${classes.totalMsg} ${(totals && totals.discountTotal) ? null : classes.marginBottom}`
                        }>
                        <div className={ classes.currency }>
                            <FormattedMessage id={ 'word.tax.title' } />
                        </div>
                        <div>{ totals &&
                        <AppPrice value={ totals.taxTotal | 0 } extraClassName={ classes.currency } /> }</div>
                    </div>
                ) : null
            }
            { totals && totals.discountTotal
                ? (
                    <div className={ `${classes.totalMsg} ${classes.marginBottom}` }>
                        <div className={ classes.currency }>
                            <FormattedMessage id={ 'word.discount.title' } />
                        </div>
                        <div>
                            <span>- </span>
                            <AppPrice value={ totals.discountTotal } extraClassName={ classes.currency } />
                        </div>
                    </div>
                ) : null
            }

            <Divider className={classes.fullWidth}/>

            <div className={`${classes.totalMsg}`}>
                <div className={classes.grandTotal}>
                    {title}
                </div>
                <div>{totals && <AppPrice value={totals.grandTotal} extraClassName={classes.grandTotal}/>}</div>
            </div>

            <Divider className={classes.fullWidth}/>
        </div>
    );
};

export const CartTotal = withStyles(styles)(CartTotalBase);
