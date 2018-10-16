import * as React from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {reduxify} from '../../../lib/redux-helper';
import {ILoginState} from '../../../reducers/Pages/Login';
import {sendLoginAction, customerRegisterAction} from '../../../actions/Pages/Login';
import {RouteProps} from "react-router";

import {AppMain} from '../../Common/AppMain';

import {styles} from './styles';

interface ForgotPasswordPageProps extends WithStyles<typeof styles>, RouteProps {
  dispatch?: Function;
  customer?: any;
  isAuth?: boolean;
  refreshToken?: string;
  handleSubmitRegisterForm: Function;
  handleSubmitLoginForm: Function;
}

interface ForgotPasswordPageState {
  email: string;
}

export class ForgotPasswordPageBase extends React.Component<ForgotPasswordPageProps, ForgotPasswordPageState> {
  public state: ForgotPasswordPageState = {
    email: ''
  };

  public handleChange = (e: any) => {
    this.setState({email: e.target.value});
  }

  public render() {
    const { classes } = this.props;

    return (
      <AppMain>
        <Grid
          item xs={12}
          container
          justify="center"
        >
          <Paper className={classes.root}>
            <Typography variant="headline" paragraph>Recover my password</Typography>
            <div>Enter the e-mail address associated with your account.</div>
            <form noValidate autoComplete="off">
              <TextField
                required
                inputProps={{type: 'email'}}
                label="Email Address"
                className={classes.textField}
                value={this.state.email}
                placeholder="Email Address"
                onChange={this.handleChange}
              />
              <Button variant="contained" color="primary" className={classes.button}>
                Submit
              </Button>
            </form>
          </Paper>
        </Grid>
      </AppMain>
    );
  }
}

const ForgotPassword = withStyles(styles)(ForgotPasswordPageBase);

export const ForgotPasswordPage = reduxify(
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
  }
)(ForgotPassword);
