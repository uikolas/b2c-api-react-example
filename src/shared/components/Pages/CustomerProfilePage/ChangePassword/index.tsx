import * as React from "react";
import {ChangeEvent, FormEvent} from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import {pageStyles} from '../styles';
import {SprykerButton} from "../../../UI/SprykerButton/index";
import {submitBtnTitle} from "../../../../constants/buttons/index";
import {TCustomerPassword} from "../../../../interfaces/customer/index";


interface ChangePasswordProps extends WithStyles<typeof pageStyles> {
  submitHandler: (event: FormEvent<HTMLFormElement>) => void;
  inputChangeHandler: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void;
  oldPassword: TCustomerPassword;
  newPassword: TCustomerPassword;
  confirmPassword: TCustomerPassword;
}

export const sectionTitle = "Change Password";

export const ChangePasswordBase: React.SFC<ChangePasswordProps> = (props): JSX.Element => {
  const {
    classes,
    submitHandler,
    inputChangeHandler,
    oldPassword,
    newPassword,
    confirmPassword,
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
          id="changePassword"
          name="changePassword"
        >

          <Grid container justify="flex-start" className={classes.controlsGroup}>

            <Grid item xs={12} className={classes.control}>
              <TextField
                required
                id="old-password"
                label="Old Password"
                name="oldPassword"
                type="password"
                value={oldPassword}
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

              <TextField
                required
                id="new-password"
                label="New Password"
                name="newPassword"
                type="password"
                value={newPassword}
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

              <TextField
                required
                id="confirm-password"
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
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

            <Grid item xs={12} className={`${classes.btnSubmitOuter} ${classes.controlsGroup}`}>
              <SprykerButton
                title={submitBtnTitle}
                btnType={'submit'}
              />
            </Grid>

          </Grid>

        </form>
      </Grid>

    </Grid>
  );
};

export const ChangePassword = withStyles(pageStyles)(ChangePasswordBase);

