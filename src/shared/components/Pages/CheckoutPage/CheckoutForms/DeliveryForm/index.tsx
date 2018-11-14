import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';


import { styles } from './styles';
import { IDeliveryFormProps } from 'src/shared/components/Pages/CheckoutPage/CheckoutForms/DeliveryForm/types';

export const DeliveryFormBase: React.SFC<IDeliveryFormProps> = (props): JSX.Element => {
  const {classes} = props;

  return (
    <Grid container className={ classes.root }>
      <Grid item xs={ 12 }>
        CheckoutFormsBase
      </Grid>
    </Grid>
  );
};

export const DeliveryForm = withStyles(styles)(DeliveryFormBase);

