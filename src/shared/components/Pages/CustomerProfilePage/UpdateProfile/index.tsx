import * as React from "react";
import {ChangeEvent, FormEvent} from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import {styles} from './styles';
import {SprykerButton} from "../../../UI/SprykerButton/index";
import {submitBtnTitle} from "../../../../constants/buttons/index";
import {
  TCustomerFirstName,
  TCustomerLastName,
  TCustomerSalutation,
  TSalutationVariant
} from "../../../../interfaces/customer/index";
import {salutationVariants} from "../../../../constants/customer/index";


interface UpdateProfileProps extends WithStyles<typeof styles> {
  submitHandler: (event: FormEvent<HTMLFormElement>) => void;
  inputChangeHandler: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void;
  changeSalutationHandler: (event: React.ChangeEvent<HTMLInputElement>)=> void;
  firstName: TCustomerFirstName;
  lastName: TCustomerLastName;
  salutation: TCustomerSalutation;
  email: TCustomerSalutation;
}

export const sectionTitle = "Update Profile";

export const UpdateProfileBase: React.SFC<UpdateProfileProps> = (props): JSX.Element => {
  const {
    classes,
    submitHandler,
    inputChangeHandler,
    changeSalutationHandler,
    firstName,
    lastName,
    salutation,
    email,
  } = props;

  return (
    <Grid container justify="flex-start" className={classes.section}>
      <Grid item xs={12}>
        <Typography variant="title" color="inherit" gutterBottom={true}>
          {sectionTitle}
        </Typography>
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={submitHandler}
          id="updateProfile"
          name="updateProfile"
        >

          <Grid container justify="flex-start" className={classes.controlsGroup}>
            <Grid item xs={12} sm={2} className={classes.control}>
              <TextField
              required
              id="update-salutation"
              select
              label="Salutation"
              name="salutation"
              className={classes.textField}
              value={salutation}
              onChange={changeSalutationHandler}
              fullWidth
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
              InputLabelProps={{
                shrink: true,
                className: classes.label,
              }}
            >
              {salutationVariants.map((option: TSalutationVariant) => (
                <MenuItem
                  key={option.value}
                  value={option.value}

                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            </Grid>

            <Grid item xs={12} sm={5} className={classes.control}>
              <TextField
              required
              id="update-first-name"
              label="First Name"
              name="firstName"
              type="text"
              value={firstName}
              className={classes.textField}
              margin="normal"
              onChange={inputChangeHandler}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                className: classes.input,
              }}
            />
            </Grid>

            <Grid item xs={12} sm={5} className={classes.control}>
              <TextField
              required
              id="update-last-name"
              label="Last Name"
              name="lastName"
              type="text"
              value={lastName}
              onChange={inputChangeHandler}
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

          <Grid container justify="flex-start" className={classes.controlsGroup}>
            <Grid item xs={12} sm={12} className={classes.control}>
              <TextField
                required
                id="update-email"
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={inputChangeHandler}
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

        </form>
      </Grid>
      <Grid item xs={12} className={classes.btnSubmitOuter}>
        <SprykerButton
          title={submitBtnTitle}
          onClick={submitHandler}
        />
      </Grid>
    </Grid>
  );
};

export const UpdateProfile = withStyles(styles)(UpdateProfileBase);

