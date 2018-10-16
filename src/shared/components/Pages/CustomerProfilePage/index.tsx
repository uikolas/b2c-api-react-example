import * as React from "react";
import {RouteProps} from "react-router";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {reduxify} from '../../../lib/redux-helper';
import {styles} from './styles';
import {getRouterHistoryPush, getRouterLocation} from "../../../selectors/Common/router";
import {getOrdersCollectionAction} from "../../../actions/Pages/Order";
import {
  getOrdersCollectionFromStore,
  isOrderHistoryFulfilled,
  isOrderHistoryInitiated,
  isOrderHistoryItems,
  isOrderHistoryLoading,
  isOrderHistoryStateRejected
} from "../../../reducers/Pages/OrderHistory";
import {isAppInitiated} from "../../../reducers/Common/Init";
import {isUserAuthenticated} from "../../../reducers/Pages/Login";
import {TOrderCollection} from "../../../interfaces/order/index";
import {noOrderText} from "../../../constants/messages/orders";
import {OrderList} from "./OrderList/index";
import {OrderHistoryContext} from './context';
import {pathCustomerPage} from "../../../routes/contentRoutes";
import {emptyValueErrorText} from "../../../constants/messages/errors";

export const pageTitle = "Orders History";

interface OrderHistoryPageProps extends WithStyles<typeof styles>, RouteProps {
  getOrdersCollection: Function;
  isLoading: boolean;
  isRejected: boolean;
  isFulfilled: boolean;
  isAppDataSet: boolean;
  isUserLoggedIn: boolean;
  isInitiated: boolean;
  isHasOrders: boolean;
  orders: TOrderCollection;
  routerPush: Function;
}

interface OrderHistoryPageState {

}

export class OrderHistoryPageBase extends React.Component<OrderHistoryPageProps, OrderHistoryPageState> {

  public state: OrderHistoryPageState = {

  };

  public componentDidMount = () => {

  }

  public componentDidUpdate = (prevProps: any, prevState: any) => {

  }


  private initRequestData = () => {
    if (!this.props.isInitiated && this.props.isAppDataSet) {
      this.props.getOrdersCollection();
      return true;
    }
    return false;
  }

  public render(): JSX.Element {
    console.info('props: ', this.props);
    console.info('state: ', this.state);
    const {classes, isHasOrders, isFulfilled, orders} = this.props;

    return (
      <div>
        { (isFulfilled === false)
          ? null
          : (
            <OrderHistoryContext.Provider
              value={{
                viewClickHandler: this.viewClickHandler,
              }}
            >

                <div className={classes.root} >
                  <Grid container justify="center" >
                    <Grid item xs={12}>
                      <Typography align="center" variant="headline" gutterBottom={true}>
                        {pageTitle}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container justify="center" >
                    {isHasOrders
                      ? <Grid item xs={12}>
                          <OrderList items={orders} />
                        </Grid>
                      : <Typography variant="title" color="inherit" gutterBottom={true}>
                        {noOrderText}
                      </Typography>
                    }

                  </Grid>
                </div>
            </OrderHistoryContext.Provider>
          )
        }
      </div>
    );
  }
}

export const OrderHistoryPage = withStyles(styles)(OrderHistoryPageBase);

export const ConnectedOrderHistoryPage = reduxify(
  (state: any, ownProps: any) => {
    const location = getRouterLocation(state, ownProps);
    const isLoading: boolean = isOrderHistoryLoading(state, ownProps);
    const isRejected: boolean = isOrderHistoryStateRejected(state, ownProps);
    const isFulfilled = isOrderHistoryFulfilled(state, ownProps);
    const isInitiated = isOrderHistoryInitiated(state, ownProps);
    const isAppDataSet: boolean = isAppInitiated(state, ownProps);
    const isUserLoggedIn = isUserAuthenticated(state, ownProps);
    const isHasOrders = isOrderHistoryItems(state, ownProps);
    const orders = getOrdersCollectionFromStore(state, ownProps);
    const routerPush = getRouterHistoryPush(state, ownProps);

    return ({
      location,
      isLoading,
      isRejected,
      isFulfilled,
      isAppDataSet,
      isUserLoggedIn,
      isInitiated,
      isHasOrders,
      orders,
      routerPush,
    });
  },
  (dispatch: Function) => ({
    getOrdersCollection: () => dispatch(getOrdersCollectionAction()),
  })
)(OrderHistoryPage);
