import * as React from "react";
import {FormEvent} from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import {pageStyles} from '../styles';
import {SprykerButton} from "../../../UI/SprykerButton/index";


interface AccountActionsProps extends WithStyles<typeof pageStyles> {
  submitDeleteHandler: (event: FormEvent<HTMLFormElement>) => void;
}

export const sectionTitle = "Delete Account";
export const submitDeleteBtnTitle = "Delete Account";
export const deleteAccountText = "This will delete all of the account information.";

export const AccountActionsBase: React.SFC<AccountActionsProps> = (props): JSX.Element => {
  const {
    classes,
    submitDeleteHandler,
  } = props;

  return (
    <Grid container justify="flex-start" className={classes.section}>
      <Grid item xs={12}>
        <Typography variant="title" color="inherit" gutterBottom={true} className={classes.sectionTitle}>
          {sectionTitle}
        </Typography>
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={submitDeleteHandler}
          id="deleteAccount"
          name="deleteAccount"
        >

          <Grid container justify="flex-start" alignItems="center" className={classes.controlsGroup}>

            <Grid item xs={12} sm={6} className={classes.control}>
              <Typography variant="body1" color="inherit" gutterBottom={true}>
                {deleteAccountText}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} className={`${classes.btnSubmitOuter} ${classes.controlsGroup}`}>
              <SprykerButton
                title={submitDeleteBtnTitle}
                btnType={'submit'}
              />
            </Grid>

          </Grid>

        </form>
      </Grid>
    </Grid>
  );
};

export const AccountActions = withStyles(pageStyles)(AccountActionsBase);

