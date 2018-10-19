import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { formStyles } from '../styles';

interface LoginFormProps extends WithStyles<typeof formStyles> {
  handleSubmit: Function;
}

interface LoginFormState {
  username: string;
  password: string;
  isSubmitting: boolean;
  isSubmitted: boolean;
}

export class LoginFormBase extends React.Component<LoginFormProps, LoginFormState> {

  public state = {
    username: '',
    password: '',
    isSubmitting: false,
    isSubmitted: false,
  };

  public handleSubmit = (event: any): void => {
    event.preventDefault();
    if (!this.state.username || !this.state.password) {
      return null;
    }
    const payload = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.handleSubmit(payload);
  };

  public handleChange = (name: string) => (event: any) => {
    this.setState({
      ...this.state, [name]: event.target.value,
    });
  };

  public render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
        <Typography variant="title" color="inherit" noWrap>
          Login
        </Typography>
        <form className={ classes.container } noValidate autoComplete="off" onSubmit={ this.handleSubmit }
              id="LoginForm">
          <TextField
            required
            id="login-email"
            label="Email"
            name="username"
            onChange={ this.handleChange('username') }
            type="email"
            defaultValue=""
            className={ classes.textField }
            margin="normal"
            fullWidth
            InputLabelProps={ {
              shrink: true,
            } }
            InputProps={ {
              className: classes.input,
            } }
          />

          <TextField
            required
            id="login-password"
            label="Password"
            name="password"
            onChange={ this.handleChange('password') }
            type="password"
            defaultValue=""
            className={ classes.textField }
            margin="normal"
            fullWidth
            InputLabelProps={ {
              shrink: true,
            } }
            InputProps={ {
              className: classes.input,
            } }
          />

          <Button type="submit" variant="contained" className={ classes.button }>
            Login
          </Button>

        </form>
      </React.Fragment>
    );
  }
}

export const LoginForm = withStyles(formStyles)(LoginFormBase);

