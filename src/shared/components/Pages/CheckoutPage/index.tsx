import * as React from 'react';
import { RouteProps } from 'react-router';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { connect } from './connect';
import { styles } from './styles';

import {AppBackdrop} from "src/shared/components/Common/AppBackdrop/index";
import {AppMain} from "src/shared/components/Common/AppMain/index";
import {CheckoutForms} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/index";
import {CartData} from "src/shared/components/Pages/CheckoutPage/CartData/index";


interface CheckoutPageProps extends WithStyles<typeof styles>, RouteProps {
  isAppDataSet: boolean;
  isUserLoggedIn: boolean;
  isLoading: boolean;
  isRejected: boolean;
  isFulfilled: boolean;
  isInitiated: boolean;
}

interface CheckoutPageState {

}

@connect
export class CheckoutPageBase extends React.Component<CheckoutPageProps, CheckoutPageState> {

  public state: CheckoutPageState = {

  };

  public componentDidMount() {
    console.info('%c ++ CheckoutPage componentDidMount ++', 'background: #3d5afe; color: #ffea00');
  }

  public componentDidUpdate = (prevProps: any, prevState: any) => {
    console.info('%c -- CheckoutPage componentDidUpdate --', 'background: #4caf50; color: #cada55');
  };

  public render(): JSX.Element {
    const {
      classes,
      isLoading,
    } = this.props;
    console.info('state: ', this.state);
    console.info('props: ', this.props);

    return (
      <AppMain>
        {isLoading ? <AppBackdrop isOpen={true} /> : null}
        <Grid container className={classes.container}>
          <Grid item xs={12} md={7}>
            <CheckoutForms />
          </Grid>
          <Grid item xs={12} md={5}>
            <CartData />
          </Grid>
        </Grid>
      </AppMain>
    );
  }
}

export const CheckoutPage = withStyles(styles)(CheckoutPageBase);

export default CheckoutPage;
