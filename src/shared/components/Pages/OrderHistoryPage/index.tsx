import * as React from "react";
import {RouteProps} from "react-router";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {reduxify} from '../../../lib/redux-helper';
import {AppMain} from '../../Common/AppMain';

import {styles} from './styles';


export const pageTitle = "Orders History";

interface OrderHistoryPageProps extends WithStyles<typeof styles>, RouteProps {

}

interface OrderHistoryPageState {

}

export class OrderHistoryPageBase extends React.Component<OrderHistoryPageProps, OrderHistoryPageState> {

  public state: OrderHistoryPageState = {

  };

  public componentDidUpdate = (prevProps: any, prevState: any) => {

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
    const routerProps: RouteProps = state.routing ? state.routing : {};

    return ({
      location: routerProps.location ? routerProps.location : ownProps.location,

    });
  }
)(OrderHistoryPage);
