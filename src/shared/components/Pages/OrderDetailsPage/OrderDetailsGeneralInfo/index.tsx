import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowBack from '@material-ui/icons/ArrowBack';

import { styles } from './styles';
import { TOrderDate, TOrderId } from 'src/shared/interfaces/order';
import { SprykerButton } from '../../../UI/SprykerButton';
import { AppDate } from '../../../Common/AppDate';


interface OrderDetailsGeneralInfoProps extends WithStyles<typeof styles> {
  orderId: TOrderId;
  date: TOrderDate;
  btnBackHandler: Function;
}

export const sectionTitle = 'Order Details';
export const orderIdTitle = 'Order Id: ';
export const orderDateTitle = 'Order Date: ';
export const btnBackTitle = 'Back';

export const OrderDetailsGeneralInfoBase: React.SFC<OrderDetailsGeneralInfoProps> = (props): JSX.Element => {
  const {classes, btnBackHandler, orderId, date} = props;

  return (
    <React.Fragment>
      <Grid container justify="space-between" className={ classes.section }>
        <Grid item xs={ 12 } sm={ 8 }>
          <Typography variant="title" color="inherit" gutterBottom={ true }>
            { sectionTitle }
          </Typography>
        </Grid>
        <Grid item xs={ 12 } sm={ 4 } className={ classes.btnBackOuter }>
          <SprykerButton
            title={ btnBackTitle }
            onClick={ btnBackHandler }
            IconType={ ArrowBack }
          />
        </Grid>
      </Grid>

      <Grid container justify="flex-start" className={ classes.section }>
        <Grid item xs={ 12 }>

          <Typography variant="subheading" component="div">
            { orderIdTitle }
            <Typography variant="title" color="inherit" gutterBottom={ true } className={ classes.value }>
              { orderId }
            </Typography>
          </Typography>

          <Typography variant="subheading" component="div">
            { orderDateTitle }
            <Typography variant="title" color="inherit" gutterBottom={ true } className={ classes.value }>
              <AppDate value={ date }/>
            </Typography>
          </Typography>

        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export const OrderDetailsGeneralInfo = withStyles(styles)(OrderDetailsGeneralInfoBase);

