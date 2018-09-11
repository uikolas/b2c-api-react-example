import * as React from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {styles} from '../styles/formStyles/index';

interface RegisterFormProps extends WithStyles<typeof styles> {
  handleSubmit: Function;
}

interface RegisterFormState {
  salutation: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  acceptedTerms: boolean;
}

type Salutation = {
  value: string,
  label: string,
};

class RegisterFormBase extends React.Component<RegisterFormProps, RegisterFormState> {

  public state = {
    salutation: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    acceptedTerms: false,
  };

  private salutations: Array<Salutation> = [
    {
      value: 'mr',
      label: 'Mr.',
    },
    {
      value: 'mrs',
      label: 'Mrs.',
    },
  ];

  public handleChangeSalutation = (event: any): void => {
    if(!event.target.value) {
      return;
    }

    this.setState({
      salutation: event.target.value,
    });
  }

  public handleChangeAgreement = (event: any): void => {
    this.setState({
      acceptedTerms: !this.state.acceptedTerms,
    });
  }

  public handleChange = (name: string) => (event: any) => {
    this.setState({
      ...this.state, [name]: event.target.value
    });
  }

  public handleSubmitForm = (e: any) => {
    e.preventDefault();

    this.props.handleSubmit(this.state);
  }

  public render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Typography variant="title" color="inherit" noWrap>
          Register
        </Typography>
        <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmitForm}>

          <TextField
            required
            id="register-salutation"
            select
            label="Salutation"
            name="salutation"
            className={classes.textField}
            value={this.state.salutation}
            onChange={this.handleChangeSalutation}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          >
            {this.salutations.map((option: Salutation) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            required
            id="register-first-name"
            label="First Name"
            name="firstName"
            type="text"
            value={this.state.firstName}
            className={classes.textField}
            margin="normal"
            fullWidth
            onChange={this.handleChange('firstName')}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              className: classes.input,
            }}
          />

          <TextField
            required
            id="register-last-name"
            label="Last Name"
            name="lastame"
            type="text"
            value={this.state.lastName}
            onChange={this.handleChange('lastName')}
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
            id="register-email"
            label="Email"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange('email')}
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

          <Grid container
                direction="row"
                justify="space-between"
                alignItems="center"
                spacing={16}
          >

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="register-password"
                label="Password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange('password')}
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="register-confirm-password"
                label="Confirm password"
                name="confirmPassword"
                type="password"
                value={this.state.passwordConfirmation}
                onChange={this.handleChange('passwordConfirmation')}
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
            </Grid>

          </Grid>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.acceptedTerms}
                onChange={this.handleChangeAgreement}
                name="acceptedTerms"
              />
            }
            label="I agree with ..."
          />


          <Button type="submit" variant="contained" className={classes.button}>
            Register
          </Button>

        </form>
      </React.Fragment>
    );
  }
}

export const RegisterForm = withStyles(styles)(RegisterFormBase);

