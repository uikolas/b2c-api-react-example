import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { OrderDetailsGeneralInfo } from './OrderDetailsGeneralInfo';
import { OrderProductList } from './OrderProductsList';
import { OrderDetailsTotals } from './OrderDetailsTotals';
import { OrderAddresses } from '@components/Pages/OrderDetailsPage/OrderAddresses';
import { EmptyOrder } from '@components/Pages/OrderDetailsPage/EmptyOrder';
import { IOrderDetailsPageProps as Props, IOrderDetailsPageState as State } from './types';
import { styles } from './styles';

@connect
class OrderDetailsPageBase extends React.Component<Props, State> {
    public state: State = {
        selectedItems: {},
        selectedItemsData: null,
    };

    public componentDidMount = () => {
        if (!this.props.isOrderExist || (this.props.isOrderExist && this.props.orderIdParam !== this.props.order.id)) {
            this.initRequestData();
        }
    };

    public componentDidUpdate = () => {
        if (!this.props.isRejected && !this.props.isOrderExist) {
            this.initRequestData();
        }
    };

    private initRequestData = () => {
        if (this.props.isLoading) {
            return;
        }
        if (this.props.isAppDataSet && this.props.orderIdParam) {
            this.props.getOrderData(this.props.orderIdParam as string);

            return true;
        }

        return false;
    };

    public render() {
        const {classes, isOrderExist, isFulfilled, currency, order} = this.props;

        return (
            <div className={classes.root}>
                {isFulfilled &&
                    <Grid container>
                        {isOrderExist
                            ? <Grid item xs={12}>
                                <OrderDetailsGeneralInfo
                                    orderId={order.id}
                                    date={order.dateCreated}
                                    priceMode={order.priceMode}
                                />
                                <OrderProductList items={order.items}/>
                                <OrderDetailsTotals
                                    expenses={order.expenses}
                                    totals={order.totals}
                                />
                                <OrderAddresses
                                    billingAddress={order.billingAddress}
                                    shippingAddress={order.shippingAddress}
                                    billingBlockTitle={<FormattedMessage id={ 'billing.address.title' } />}
                                    shippingBlockTitle={<FormattedMessage id={ 'shipping.address.title' } />}
                                />
                            </Grid>
                            : <EmptyOrder intro={<FormattedMessage id={ 'no.order.message' } />}/>
                        }
                    </Grid>
                }
            </div>
        );
    }
}

export const OrderDetailsContainer = withStyles(styles)(OrderDetailsPageBase);
