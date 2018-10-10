import * as React from "react";
import {RouteProps} from "react-router";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {reduxify} from '../../../lib/redux-helper';
import {AppMain} from '../../Common/AppMain';
import {styles} from './styles';
import {
  getRouterHistoryBack,
  getRouterLocation,
  getRouterMatchParam,
  TRouterMatchParam
} from "../../../selectors/Common/router";
import {emptyOrderText} from "../../../constants/messages/orders";
import {isUserAuthenticated} from "../../../reducers/Pages/Login";
import {getAppCurrency, isAppInitiated, TAppCurrency} from "../../../reducers/Common/Init";
import {
  getOrderDetailsFromStore,
  isOrderDetailsFulfilled,
  isOrderDetailsInitiated,
  isOrderDetailsLoading,
  isOrderDetailsPresent,
  isOrderDetailsStateRejected,
} from "../../../reducers/Pages/OrderDetails";
import {getOrderDetailsAction} from "../../../actions/Pages/Order";
import {IOrderDetailsParsed, TOrderId} from "../../../interfaces/order/index";
import {OrderDetailsGeneralInfo} from "./OrderDetailsGeneralInfo/index";
import {OrderProductList} from "./OrderProductsList/index";
import {OrderDetailsContext} from './context';
import {emptyValueErrorText} from "../../../constants/messages/errors";


export const pageTitle = "Orders History";

interface OrderDetailsPageProps extends WithStyles<typeof styles>, RouteProps {
  isLoading: boolean;
  isRejected: boolean;
  isFulfilled: boolean;
  isAppDataSet: boolean;
  isUserLoggedIn: boolean;
  isInitiated: boolean;
  isOrderExist: boolean;
  getOrderData: Function;
  orderIdParam: TRouterMatchParam;
  order: IOrderDetailsParsed;
  routerGoBack: Function;
  currency: TAppCurrency;
}

interface OrderDetailsPageState {

}

export class OrderDetailsPageBase extends React.Component<OrderDetailsPageProps, OrderDetailsPageState> {

  public state: OrderDetailsPageState = {

  };

  public componentDidMount = () => {
    const requestOrderCondition = (
      !this.props.isOrderExist
      ||(this.props.isOrderExist && this.props.orderIdParam !== this.props.order.id)
    );
    console.log('componentDidMount: requestOrderCondition', requestOrderCondition);
    if (requestOrderCondition) {
      const result = this.initRequestData();
      console.log('componentDidMount: initRequestData: result: ', result);
    }
  }

  public componentDidUpdate = (prevProps: any, prevState: any) => {
    const requestOrderCondition = (!this.props.isLoading && !this.props.isOrderExist);
    console.log('componentDidUpdate: requestCondition: ', requestOrderCondition);
    if (requestOrderCondition) {
      const result = this.initRequestData();
      console.log('componentDidUpdate: initRequestData: result: ', result);
    }
  }

  public selectItemHandler = (event: any): any => {
    console.log('selectItemHandler: event: ', event);
    const value = event.currentTarget.value;
    if (!value) {
      throw new Error(emptyValueErrorText);
    }
  }

  private initRequestData = () => {
    const requestCondition = (
      this.props.isAppDataSet
      && this.props.orderIdParam
    );

    console.log('initRequestData: common requestCondition', requestCondition);

    if (requestCondition) {
      this.props.getOrderData(this.props.orderIdParam);
      return true;
    }
    return false;
  }

  public render(): JSX.Element {
    console.info('props: ', this.props);
    console.info('state: ', this.state);
    const {classes, isOrderExist, isFulfilled, routerGoBack, currency, order} = this.props;

    return (
      <AppMain>
        { (isFulfilled === false)
          ? null
          : (
            <OrderDetailsContext.Provider
              value={{
                selectItemHandler: this.selectItemHandler,
                currency,
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
                  {isOrderExist
                    ? <React.Fragment>
                      <Grid item xs={12} sm={3}>

                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <OrderDetailsGeneralInfo
                          orderId={order.id}
                          date={order.dateCreated}
                          btnBackHandler={routerGoBack}
                        />
                        <OrderProductList items={order.items} />
                      </Grid>
                    </React.Fragment>
                    : <Typography variant="title" color="inherit" gutterBottom={true}>
                      {emptyOrderText}
                    </Typography>
                  }

                </Grid>
              </div>
            </OrderDetailsContext.Provider>

          )
        }
      </AppMain>
    );
  }
}

export const OrderDetailsPage = withStyles(styles)(OrderDetailsPageBase);

export const ConnectedOrderDetailsPage = reduxify(
  (state: any, ownProps: any) => {
    const location = getRouterLocation(state, ownProps);
    const isLoading = isOrderDetailsLoading(state, ownProps);
    const isRejected = isOrderDetailsStateRejected(state, ownProps);
    const isFulfilled = isOrderDetailsFulfilled(state, ownProps);
    const isInitiated = isOrderDetailsInitiated(state, ownProps);
    const isAppDataSet = isAppInitiated(state, ownProps);
    const isUserLoggedIn = isUserAuthenticated(state, ownProps);
    const isOrderExist = isOrderDetailsPresent(state, ownProps);
    const order = getOrderDetailsFromStore(state, ownProps);
    const orderIdParam = getRouterMatchParam(state, ownProps, 'orderId');
    const routerGoBack = getRouterHistoryBack(state, ownProps);
    const currency = getAppCurrency(state, ownProps);

    return ({
      location,
      isLoading,
      isRejected,
      isFulfilled,
      isAppDataSet,
      isUserLoggedIn,
      isInitiated,
      isOrderExist,
      orderIdParam,
      order,
      routerGoBack,
      currency,
    });
  },
  (dispatch: Function) => ({
    getOrderData: (orderId: TOrderId) => dispatch(getOrderDetailsAction(orderId)),
  })
)(OrderDetailsPage);
