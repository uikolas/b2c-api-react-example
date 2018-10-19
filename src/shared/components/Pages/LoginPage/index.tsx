import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import { reduxify } from '../../../lib/redux-helper';
import { ILoginState } from '../../../reducers/Pages/Login';
import { customerRegisterAction, sendLoginAction } from '../../../actions/Pages/Login';
import { RouteProps } from 'react-router';

import { AppMain } from '../../Common/AppMain';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

import { styles } from './styles';

interface LoginPageProps extends WithStyles<typeof styles>, RouteProps {
  dispatch?: Function;
  customer?: any;
  isAuth?: boolean;
  refreshToken?: string;
  handleSubmitRegisterForm: Function;
  handleSubmitLoginForm: Function;
}

interface LoginPageState {

}

export class LoginPageBase extends React.Component<LoginPageProps, LoginPageState> {
  public state: LoginPageState = {};

  public render() {
    const {classes} = this.props;

    return (
      <AppMain>
        <Grid item xs={ 12 } sm={ 6 }
              direction="column"
              container
              justify="center"
              alignItems="center">
          <LoginForm handleSubmit={ this.props.handleSubmitLoginForm }
          />
        </Grid>
        <div className={ classes.divider } id="divider"></div>
        <Grid item xs={ 12 } sm={ 6 }
              direction="column"
              container
              justify="center"
              alignItems="center">
          <RegisterForm handleSubmit={ this.props.handleSubmitRegisterForm }/>
        </Grid>
      </AppMain>
    );
  }
}

const LoginPage = withStyles(styles)(LoginPageBase);

export const ConnectedLogin = reduxify(
  (state: any, ownProps: any) => {
    const routerProps: RouteProps = state.routing ? state.routing : {};
    const pagesLoginProps: ILoginState = state.pagesLogin ? state.pagesLogin : null;
    return (
      {
        location: routerProps.location ? routerProps.location : ownProps.location,
        customer: pagesLoginProps && pagesLoginProps.data ? pagesLoginProps.data.customer : ownProps.customer,
        isAuth: pagesLoginProps && pagesLoginProps.data ? pagesLoginProps.data.isAuth : ownProps.isAuth,
        refreshToken: pagesLoginProps && pagesLoginProps.data ? pagesLoginProps.data.refreshToken : ownProps.isAuth,
      }
    );
  },
  (dispatch: Function, ownProps: any) => {
    return {
      dispatch,
      handleSubmitRegisterForm: (data: any): void => dispatch(customerRegisterAction(data)),
      handleSubmitLoginForm: (data: any): void => dispatch(sendLoginAction(data)),
    };
  },
)(LoginPage);
