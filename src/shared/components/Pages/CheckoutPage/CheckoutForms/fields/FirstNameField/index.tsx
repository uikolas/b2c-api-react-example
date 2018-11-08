import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import { styles } from './styles';
import {IFirstNameFieldProps} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/fields/FirstNameField/types";


export const FirstNameFieldBase: React.SFC<IFirstNameFieldProps> = (props): JSX.Element => {
  const {classes}  = props;

  return (
    <Grid container className={ classes.root }>
      <Grid item xs={ 12 }>

      </Grid>
    </Grid>
  );
};

export const FirstNameField = withStyles(styles)(FirstNameFieldBase);

