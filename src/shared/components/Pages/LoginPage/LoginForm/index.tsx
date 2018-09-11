import * as React from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {styles} from '../styles/formStyles/index';

interface LoginFormProps extends WithStyles<typeof styles> {
  handleSubmit(event: React.SyntheticEvent): void;
}

const LoginFormBase: React.SFC<LoginFormProps> = (props) => {
  console.log('LoginFormBase props', props);
  const { classes } = props;
  return (
    <React.Fragment>
      <Typography variant="title" color="inherit" noWrap>
        Login
      </Typography>
      <form className={classes.container} noValidate autoComplete="off" onSubmit={props.handleSubmit}>
        <TextField
          required
          id="login-email"
          label="Email"
          name="email"
          type="email"
          defaultValue=""
          className={classes.textField}
          margin="normal"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            className: classes.input,
          }}
        />

        <TextField
          required
          id="login-password"
          label="Password"
          name="password"
          type="password"
          defaultValue=""
          className={classes.textField}
          margin="normal"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            className: classes.input,
          }}
        />

        <Button variant="contained" className={classes.button}>
          Login
        </Button>

      </form>
    </React.Fragment>
  );
};

export const LoginForm = withStyles(styles)(LoginFormBase);

