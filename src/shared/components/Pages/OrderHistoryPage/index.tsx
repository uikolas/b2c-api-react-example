import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import { CustomerPageTitle } from '@components/Common/CustomerPageTitle';
import { EmptyOrder } from '@components/Pages/OrderDetailsPage/EmptyOrder';
import { OrderList } from './OrderList';
import { IOrderHistoryPageProps, IOrderHistoryPageState } from './types';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

@connect
export class OrderHistoryPageBase extends React.Component<IOrderHistoryPageProps, IOrderHistoryPageState> {
    public state: IOrderHistoryPageState = {};

    public componentDidMount = () => {
        if (!this.props.isLoading && this.props.isAppDataSet) {
            this.props.getOrdersCollection();
        }
    };

    public componentDidUpdate = (prevProps: IOrderHistoryPageProps) => {
        if (this.props.isRejected || this.props.isLoading || !this.props.isAppDataSet) {
            return;
        }

        if (!this.props.isFulfilled && !prevProps.isHasOrders) {
            this.props.getOrdersCollection();
        }
    };

    public render() {
        const {classes, isHasOrders, isFulfilled, orders} = this.props;

        return (
            <div>
                {isFulfilled &&
                    <div className={classes.root}>
                        <Grid container justify="center">
                            <Grid item xs={12}>
                                <CustomerPageTitle
                                    title={<FormattedMessage id={'orders.history.title'} />}
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            {isHasOrders
                                ? <Grid item xs={12}>
                                    <OrderList orders={orders} />
                                </Grid>
                                : <EmptyOrder intro={<FormattedMessage id={'no.order.message'} />} />
                            }
                        </Grid>
                    </div>
                }
            </div>
        );
    }
}

export const OrderHistoryPage = withStyles(styles)(OrderHistoryPageBase);
export default OrderHistoryPage;
