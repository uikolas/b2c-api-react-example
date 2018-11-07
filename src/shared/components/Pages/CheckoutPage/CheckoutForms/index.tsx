import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { styles } from './styles';


interface CheckoutFormsProps extends WithStyles<typeof styles> {

}


export const CheckoutFormsBase: React.SFC<CheckoutFormsProps> = (props): JSX.Element => {
  const {classes}  = props;

  return (
    <Grid container className={ classes.root }>
      <Grid item xs={ 12 }>
        CheckoutFormsBase
      </Grid>
    </Grid>
  );
};

export const CheckoutForms = withStyles(styles)(CheckoutFormsBase);

