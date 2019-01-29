import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import { styles } from './styles';
import { IOrderDetailsTotalsProps } from './types';
import { IOrderDetailsExpenseItem } from 'src/shared/interfaces/order';
import { TotalItem } from 'src/shared/components/Pages/OrderDetailsPage/TotalItem/index';
import { FormattedMessage } from 'react-intl';

export const OrderDetailsTotalsBase: React.SFC<IOrderDetailsTotalsProps> = (props): JSX.Element => {
    const {
        classes,
        expenses,
        currency,
        totals: {
            canceledTotal,
            expenseTotal,
            discountTotal,
            taxTotal,
            subtotal,
            grandTotal,
        }
    } = props;

    return (
        <Grid container justify="flex-end" className={ classes.root }>
            <Grid item xs={ 12 } sm={ 7 } md={ 4 }>
                <TotalItem value={ subtotal } title={ <FormattedMessage id={ 'word.subtotal.title' } /> } />
                { (!expenses || !expenses.length)
                    ? null
                    : expenses.map((item: IOrderDetailsExpenseItem) => {
                        return (
                            <TotalItem
                                key={ item.name }
                                value={ item.sumPrice }
                                title={ <FormattedMessage id={ 'order.detail.shipment.title' } /> }
                            />
                        );
                    })
                }
                { expenses.length > 1
                    ? <TotalItem
                        value={ expenseTotal }
                        title={ <FormattedMessage id={ 'order.detail.shipment.total.title' } /> }
                    />
                    : null
                }
                <TotalItem
                    value={ canceledTotal }
                    title={ <FormattedMessage id={ 'order.detail.canceled.title' } /> }
                />
                <TotalItem
                    value={ taxTotal }
                    title={ <FormattedMessage id={ 'word.tax.title' } /> }
                />
                <TotalItem
                    value={ discountTotal }
                    title={ <FormattedMessage id={ 'word.discount.title' } /> }
                    valueSign="-"
                />
                <TotalItem
                    value={ grandTotal }
                    title={ <FormattedMessage id={ 'grand.total.title' } /> }
                    extraClassName={ classes.bold }
                />
            </Grid>
        </Grid>
    );
};

export const OrderDetailsTotals = withStyles(styles)(OrderDetailsTotalsBase);
