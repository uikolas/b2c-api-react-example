import * as React from "react";
import {RouteProps} from "react-router";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {reduxify} from '../../../lib/redux-helper';
import {styles} from './styles';
import {isAppInitiated} from "../../../reducers/Common/Init";
import {isUserAuthenticated} from "../../../reducers/Pages/Login";
import {getRouterLocation} from "../../../selectors/Common/router";

export const pageTitle = "Profile";

interface CustomerProfilePageProps extends WithStyles<typeof styles>, RouteProps {
  isLoading: boolean;
  isRejected: boolean;
  isFulfilled: boolean;
  isAppDataSet: boolean;
  isUserLoggedIn: boolean;
}

interface CustomerProfilePageState {

}

export class CustomerProfilePageBase extends React.Component<CustomerProfilePageProps, CustomerProfilePageState> {

  public state: CustomerProfilePageState = {

  };

  public componentDidMount = () => {
    console.log("%c ---- componentDidMount ----", 'background: #4caf50; color: #bada55');
  }

  public componentDidUpdate = (prevProps: any, prevState: any) => {
    console.log("%c ---- componentDidUpdate ----", 'background: #4cab50; color: #cada55');
  }


  private initRequestData = () => {
    console.log("%c *** initRequestData ***", 'background: #2cab50; color: #cada55');
  }

  public render(): JSX.Element {
    console.info('CustomerProfilePage props: ', this.props);
    console.info('CustomerProfilePage state: ', this.state);
    const {classes, isFulfilled} = this.props;

    return (
      <div>
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

              </Grid>
            </div>
          )
        }
      </div>
    );
  }
}

export const CustomerProfilePage = withStyles(styles)(CustomerProfilePageBase);

export const ConnectedCustomerProfilePage = reduxify(
  (state: any, ownProps: any) => {
    const location = getRouterLocation(state, ownProps);
    /*const isLoading: boolean = isOrderHistoryLoading(state, ownProps);
    const isRejected: boolean = isOrderHistoryStateRejected(state, ownProps);
    const isFulfilled = isOrderHistoryFulfilled(state, ownProps);
    */
    const isLoading: boolean = false;
    const isRejected: boolean = false;
    const isFulfilled = true;
    const isAppDataSet: boolean = isAppInitiated(state, ownProps);
    const isUserLoggedIn = isUserAuthenticated(state, ownProps);

    return ({
      location,
      isLoading,
      isRejected,
      isFulfilled,
      isAppDataSet,
      isUserLoggedIn,
    });
  },
  /*(dispatch: Function) => ({
    getOrdersCollection: () => dispatch(getOrdersCollectionAction()),
  })*/
)(CustomerProfilePage);
