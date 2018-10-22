import * as React from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {reduxify} from '../../../../lib/redux-helper';
import {resetPasswordAction} from '../../../../actions/Pages/Login';
import {RouteProps} from "react-router";

import {AppMain} from '../../../Common/AppMain';

import {formStyles} from '../styles';

interface ResetPasswordPageProps extends WithStyles<typeof formStyles>, RouteProps {
  dispatch?: Function;
  sendResetRequest: Function;
}

interface ResetPasswordPageState {
  password: string;
  confirmPassword: string;
  submitted: boolean;
}

export class ResetPasswordPageBase extends React.Component<ResetPasswordPageProps, ResetPasswordPageState> {
  public state: ResetPasswordPageState = {
    password: '',
    confirmPassword: '',
    submitted: false,
  };

  public handleChange =  (event: any) => {
    const { name, value }: any = event.target;
    this.setState({
      ...this.state, [name]: value
    });
  }

  public submitRequest = (e: any) => {
    this.setState({submitted: true});
    if (this.state.password !== this.state.confirmPassword) {
      return;
    }

    const payload = {
      restorePasswordKey: '',
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };

    this.props.sendResetRequest(payload);
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
          <Paper className={classes.forgot}>
            <Typography variant="headline" paragraph>Reset password</Typography>
            <div>Enter new password and confirm it.</div>
            <form noValidate autoComplete="off">

                <TextField
                  required
                  type="password"
                  label="Password"
                  name="password"
                  value={this.state.password}
                  placeholder="Password"
                  margin="normal"
                  onChange={this.handleChange}
                  className={classes.textField}
                />
                <TextField
                  required
                  type="password"
                  error={this.state.submitted && this.state.password !== this.state.confirmPassword}
                  label="Confirm Password"
                  name="confirmPassword"
                  value={this.state.confirmPassword}
                  placeholder="Confirm Password"
                  margin="normal"
                  onChange={this.handleChange}
                  className={classes.textField}
                />

            </form>
            <Button
              variant="contained"
              color="primary"
              onClick={this.submitRequest}
            >
              Submit
            </Button>
          </Paper>
        </Grid>
      </AppMain>
    );
  }
}

const ResetPassword = withStyles(formStyles)(ResetPasswordPageBase);

export const ResetPasswordPage = reduxify(
  (state: any, ownProps: any) => {
    const routerProps: RouteProps = state.routing ? state.routing : {};
    return (
      {
        location: routerProps.location ? routerProps.location : ownProps.location,
      }
    );
  },
  (dispatch: Function, ownProps: any) => {
    return {
      dispatch,
      sendResetRequest: (payload: any) => dispatch(resetPasswordAction(payload)),
    };
  }
)(ResetPassword);
