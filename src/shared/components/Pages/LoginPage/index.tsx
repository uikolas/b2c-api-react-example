import * as React from "react";
import { toast } from 'react-toastify';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';

import {reduxify} from '../../../lib/redux-helper';
import {ILoginState} from '../../../reducers/Pages/Login';
import {sendLoginAction, customerRegisterAction} from '../../../actions/Pages/Login';
import {RouteProps} from "react-router";

import {AppMain} from '../../Common/AppMain';
import {AppHeader} from '../../Common/AppHeader';
import {LoginForm} from './LoginForm';
import {RegisterForm} from './RegisterForm';

import {styles} from './styles/page';

interface LoginPageProps extends WithStyles<typeof styles>, RouteProps {
  dispatch?: Function;
  customer?: any;
  isAuth?: boolean;
  isLoading: boolean;
}

interface LoginPageState {

}

export class LoginPageBase extends React.Component<LoginPageProps, LoginPageState> {
  public state: LoginPageState = {

  };

  public componentDidMount() {
    toast.success('Ura!!!');
  }

  public handleSubmitLoginForm = (data: any): void => {
    this.props.dispatch(sendLoginAction(data));
  }

  public handleSubmitRegisterForm = (data: any): void => {
    this.props.dispatch(customerRegisterAction(data));
  }


  public render() {
    const { classes, isLoading } = this.props;

    return (
      <React.Fragment>

        <AppHeader />
        <AppMain isLoading={isLoading}>
          <Grid item xs={12} sm={6}
                direction="column"
                container
                justify="center"
                alignItems="center">
            <LoginForm handleSubmit={this.handleSubmitLoginForm}
          />
          </Grid>
          <div className={classes.divider} id="divider" ></div>
          <Grid item xs={12} sm={6}
                direction="column"
                container
                justify="center"
                alignItems="center">
            <RegisterForm handleSubmit={this.handleSubmitRegisterForm}
          />
          </Grid>
        </AppMain>
      </React.Fragment>
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
        customer: pagesLoginProps && pagesLoginProps.data.customer ? pagesLoginProps.data.customer : ownProps.customer,
        isAuth: pagesLoginProps && pagesLoginProps.data.isAuth ? pagesLoginProps.data.isAuth : ownProps.isAuth,
        isLoading: pagesLoginProps && pagesLoginProps.pending ? pagesLoginProps.pending : ownProps.pending,
      }
    );
  }
)(LoginPage);
