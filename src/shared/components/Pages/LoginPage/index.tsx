import * as React from 'react';
import { RouteProps, withRouter } from 'react-router';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import { NavLink } from 'react-router-dom';

import { reduxify } from 'src/shared/lib/redux-helper';
import { ILoginState } from 'src/shared/reducers/Pages/Login';
import { customerRegisterAction, loginCustomerAction } from 'src/shared/actions/Pages/Login';
import { ICustomerLoginData } from 'src/shared/interfaces/customer';
import { pathForgotPassword, pathHomePage } from 'src/shared/routes/contentRoutes';
import { WithRouter } from 'src/shared/interfaces/commoon/react';

import { AppMain } from '../../Common/AppMain';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

import { styles } from './styles';

interface LoginPageProps extends WithStyles<typeof styles>, RouteProps, WithRouter {
  dispatch?: Function;
  customer?: any;
  isAuth?: boolean;
  refreshToken?: string;
  handleSubmitRegisterForm: Function;
  handleSubmitLoginForm: Function;
}

interface LoginPageState {

}

@(withRouter as any)
export class LoginPageBase extends React.Component<LoginPageProps, LoginPageState> {
  public state: LoginPageState = {};

  public componentDidUpdate() {
    if (this.props.isAuth) {
      this.props.history.push(pathHomePage);
    }
  }

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
          <div className={ classes.link }>
            <NavLink to={ pathForgotPassword }>
              Forgot Password
            </NavLink>
          </div>
        </Grid>
        <div className={ classes.divider } id="divider"/>
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
        customer: pagesLoginProps && pagesLoginProps.data ? pagesLoginProps.data.customerRef : ownProps.customer,
        isAuth: pagesLoginProps && pagesLoginProps.data ? pagesLoginProps.data.isAuth : ownProps.isAuth,
        refreshToken: pagesLoginProps && pagesLoginProps.data ? pagesLoginProps.data.refreshToken : ownProps.isAuth,
      }
    );
  },
  (dispatch: Function, ownProps: any) => {
    return {
      dispatch,
      handleSubmitRegisterForm: (data: any): void => dispatch(customerRegisterAction(data)),
      handleSubmitLoginForm: (payload: ICustomerLoginData): void => dispatch(loginCustomerAction(payload)),
    };
  },
)(LoginPage);

export default ConnectedLogin;
