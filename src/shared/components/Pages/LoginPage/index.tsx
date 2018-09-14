import * as React from "react";
import {Location} from 'history';
import { toast } from 'react-toastify';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';

import {reduxify} from '../../../lib/redux-helper';
import {ILoginState} from '../../../reducers/Pages/Login';
import {sendLoginAction, customerRegisterAction} from '../../../actions/Pages/Login';
import {RouteProps} from "react-router";

import {AppMain} from '../../Common/AppMain';
import {LoginForm} from './LoginForm';
import {RegisterForm} from './RegisterForm';

import {styles} from './styles/page';

interface LoginPageProps extends WithStyles<typeof styles> {
  dispatch?: Function;
  location?: Location;
  customer?: any;
  isAuth?: boolean;
  isLoading?: boolean;
  handleSubmitRegisterForm: Function;
  handleSubmitLoginForm: Function;
}

interface LoginPageState {

}

class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
  public state: LoginPageState = {

  };

  public render() {
    const { classes, isLoading } = this.props;

    return (
      <React.Fragment>
        <AppMain isLoading={isLoading}>
          <Grid item xs={12} sm={6}
                direction="column"
                container
                justify="center"
                alignItems="center">
            <LoginForm handleSubmit={this.props.handleSubmitLoginForm}
          />
          </Grid>
          <div className={classes.divider}></div>
          <Grid item xs={12} sm={6}
                direction="column"
                container
                justify="center"
                alignItems="center">
            <RegisterForm handleSubmit={this.props.handleSubmitRegisterForm} />
          </Grid>
        </AppMain>
      </React.Fragment>
    );
  }
}

const DecoratedClass = withStyles(styles)(LoginPage);

export const ConnectedLogin = reduxify(
  (state: any, ownProps: any) => {
    const routerProps: RouteProps = state.routing ? state.routing : {};
    const pagesLoginProps: ILoginState = state.pagesLogin ? state.pagesLogin : null;
    return (
      {
        location: routerProps.location ? routerProps.location : ownProps.location,
        customer: pagesLoginProps && pagesLoginProps.data.customer ? pagesLoginProps.data.customer : ownProps.customer,
        isAuth: pagesLoginProps && pagesLoginProps.data.isAuth ? pagesLoginProps.data.isAuth : ownProps.isAuth,
        isLoading: pagesLoginProps && pagesLoginProps.pending ? pagesLoginProps.pending : ownProps.pending,
      }
    );
  },
  (dispatch: Function, ownProps: any) => {
    return {
      dispatch,
      handleSubmitRegisterForm: (data: any): void => dispatch(customerRegisterAction(data)),
      handleSubmitLoginForm: (data: any): void => dispatch(sendLoginAction(data)),
    };
  }
)(DecoratedClass);
