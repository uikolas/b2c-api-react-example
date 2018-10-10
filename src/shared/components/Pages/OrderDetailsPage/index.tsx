import * as React from "react";
import {RouteProps} from "react-router";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {reduxify} from '../../../lib/redux-helper';
import {AppMain} from '../../Common/AppMain';
import {styles} from './styles';
import {
  getRouterLocation,
  getRouterMatchParam,
  TRouterMatchParam
} from "../../../selectors/Common/router";
import {emptyOrderText} from "../../../constants/messages/orders";
import {isUserAuthenticated} from "../../../reducers/Pages/Login";
import {isAppInitiated} from "../../../reducers/Common/Init";
import {
  isOrderDetailsFulfilled,
  isOrderDetailsInitiated,
  isOrderDetailsLoading,
  isOrderDetailsPresent,
  isOrderDetailsStateRejected,
} from "../../../reducers/Pages/OrderDetails";
import {getOrderDetailsAction} from "../../../actions/Pages/Order";
import {TOrderId} from "../../../interfaces/order/index";


export const pageTitle = "Order Details";

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
}

interface OrderDetailsPageState {

}

export class OrderDetailsPageBase extends React.Component<OrderDetailsPageProps, OrderDetailsPageState> {

  public state: OrderDetailsPageState = {

  };

  public componentDidMount = () => {
    this.initRequestData();
  }

  public componentDidUpdate = (prevProps: any, prevState: any) => {
    this.initRequestData();
  }

  private initRequestData = () => {
    if (!this.props.isInitiated && this.props.isAppDataSet) {
      if (this.props.orderIdParam) {
        this.props.getOrderData(this.props.orderIdParam);
        return true;
      }
    }
    return false;
  }

  public render(): JSX.Element {
    console.info('props: ', this.props);
    console.info('state: ', this.state);
    const {classes, isOrderExist, isFulfilled} = this.props;

    return (
      <AppMain>
        { (isFulfilled === false)
          ? null
          : (
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

                    </Grid>
                  </React.Fragment>
                  : <Typography variant="title" color="inherit" gutterBottom={true}>
                    {emptyOrderText}
                  </Typography>
                }

              </Grid>
            </div>
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
    // const orders = getOrdersCollectionFromStore(state, ownProps);
    const orderIdParam = getRouterMatchParam(state, ownProps, 'orderId');

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
    });
  },
  (dispatch: Function) => ({
    getOrderData: (orderId: TOrderId) => dispatch(getOrderDetailsAction(orderId)),
  })
)(OrderDetailsPage);
