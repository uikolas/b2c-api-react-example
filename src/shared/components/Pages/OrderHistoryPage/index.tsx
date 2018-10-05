import * as React from "react";
import {RouteProps} from "react-router";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {reduxify} from '../../../lib/redux-helper';
import {AppMain} from '../../Common/AppMain';

import {styles} from './styles';
import {getRouterLocation} from "../../../selectors/Common/location";
import {getOrdersCollectionAction} from "../../../actions/Pages/Order";
import {
  isOrderHistoryFulfilled, isOrderHistoryInitiated, isOrderHistoryLoading,
  isOrderHistoryStateRejected
} from "../../../reducers/Pages/OrderHistory";
import {isAppInitiated} from "../../../reducers/Common/Init";
import {isUserAuthenticated} from "../../../reducers/Pages/Login";


export const pageTitle = "Orders History";

interface OrderHistoryPageProps extends WithStyles<typeof styles>, RouteProps {
  getOrdersCollection: Function;
  isLoading: boolean;
  isRejected: boolean;
  isFulfilled: boolean;
  isAppDataSet: boolean;
  isUserLoggedIn: boolean;
  isInitiated: boolean;
}

interface OrderHistoryPageState {

}

export class OrderHistoryPageBase extends React.Component<OrderHistoryPageProps, OrderHistoryPageState> {

  public state: OrderHistoryPageState = {

  };

  public componentDidMount = () => {
    // this.props.getOrdersCollection();
  }

  public componentDidUpdate = (prevProps: any, prevState: any) => {
    if (
      /*!this.props.isInitiated
      && this.props.isAppDataSet*/
      !this.props.isInitiated
    ) {
      this.props.getOrdersCollection();
    }
  }

  public render(): JSX.Element {
    console.info('props: ', this.props);
    console.info('state: ', this.state);
    const {classes} = this.props;

    return (
      <AppMain>
        { (!this.props)
          ? null
          : (
            <div className={classes.root} >
              <Grid container justify="center" >
                <Grid item xs={12}>
                  <Typography variant="title" color="inherit" gutterBottom={true}>
                    {pageTitle}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container justify="center" >
                <Grid item xs={12} sm={6}>

                </Grid>
                <Grid item xs={12} sm={6}>

                </Grid>
              </Grid>
            </div>
          )
        }
      </AppMain>
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

    return ({
      location,
      isLoading,
      isRejected,
      isFulfilled,
      isAppDataSet,
      isUserLoggedIn,
      isInitiated,
    });
  },
  (dispatch: Function) => ({
    getOrdersCollection: (sku: string) => dispatch(getOrdersCollectionAction()),
  })
)(OrderHistoryPage);
