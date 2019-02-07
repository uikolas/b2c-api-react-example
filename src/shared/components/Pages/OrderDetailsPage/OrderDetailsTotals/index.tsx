import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import { TotalItem } from './TotalItem';
import { IOrderDetailsTotalsProps } from './types';
import { IOrderDetailsExpenseItem } from '@interfaces/order';
import { styles } from './styles';

export const OrderDetailsTotalsBase: React.SFC<IOrderDetailsTotalsProps> = props => {
    const {
        classes,
        expenses,
        totals: {
            canceledTotal,
            expenseTotal,
            discountTotal,
            taxTotal,
            subtotal,
            grandTotal
        }
    } = props;

    return (
        <Grid container justify="flex-end" className={classes.root}>
            <Grid item xs={12} sm={7} md={4}>
                <TotalItem
                    value={subtotal}
                    title={<FormattedMessage id={'word.subtotal.title'} />}
                />
                {(!expenses || expenses.length) &&
                    expenses.map((item: IOrderDetailsExpenseItem) => (
                        <TotalItem
                            key={item.name}
                            value={item.sumPrice}
                            title={<FormattedMessage id={'order.detail.shipment.title'} />}
                        />
                    ))
                }
                {(expenses.length > 1) &&
                    <TotalItem
                        value={expenseTotal}
                        title={<FormattedMessage id={'order.detail.shipment.total.title'} />}
                    />
                }
                <TotalItem
                    value={canceledTotal}
                    title={<FormattedMessage id={'order.detail.canceled.title'} />}
                />
                <TotalItem
                    value={taxTotal}
                    title={<FormattedMessage id={'word.tax.title'} />}
                />
                <TotalItem
                    value={discountTotal}
                    title={<FormattedMessage id={'word.discount.title'} />}
                    valueSign="-"
                />
                <TotalItem
                    value={grandTotal}
                    title={<FormattedMessage id={'grand.total.title'} />}
                    extraClassName={classes.bold}
                />
            </Grid>
        </Grid>
    );
};

export const OrderDetailsTotals = withStyles(styles)(OrderDetailsTotalsBase);
