import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowBack from '@material-ui/icons/ArrowBack';

import { styles } from './styles';
import {IOrderDetailsGeneralInfoProps} from "./types";
import { SprykerButton } from '../../../UI/SprykerButton';
import { AppDate } from '../../../Common/AppDate';
import {
  OrderDetailDateTitle,
  OrderDetailOrderIdTitle,
  OrderDetailPageTitle,
  OrderDetailPriceModeTitle,
} from "src/shared/constants/orders";
import {BackBtnTitle} from "src/shared/constants/buttons";
import {CustomerPageTitle} from "src/shared/components/Common/CustomerPageTitle/index";
import {formatDateToString} from "src/shared/helpers/common/dates";


export const OrderDetailsGeneralInfoBase: React.SFC<IOrderDetailsGeneralInfoProps> = (props): JSX.Element => {
  const {classes, btnBackHandler, orderId, date, priceMode} = props;
  const dateToShow = formatDateToString(new Date(date));
  const timeToShow = 'time';

  return (
    <React.Fragment>
      <Grid container justify="space-between" className={classes.section}>
        <Grid item xs={12} sm={8}>
          <CustomerPageTitle title={`${OrderDetailPageTitle}${orderId}`} />
          <Typography component="p">
            {`${OrderDetailDateTitle} ${dateToShow}, ${timeToShow}`}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.btnBackOuter}>
          <SprykerButton
            title={BackBtnTitle}
            onClick={btnBackHandler}
            IconType={ArrowBack}
          />
        </Grid>
      </Grid>

      <Grid container justify="flex-start" className={classes.section}>
        <Grid item xs={12}>

          <Typography variant="subheading" component="div">
            {OrderDetailOrderIdTitle}
            <Typography variant="title" color="inherit" gutterBottom={true} className={classes.value}>
              {orderId}
            </Typography>
          </Typography>

          <Typography variant="subheading" component="div">
            {OrderDetailDateTitle}
            <Typography variant="title" color="inherit" gutterBottom={ true } className={classes.value}>
              <AppDate value={date}/>
            </Typography>
          </Typography>

          {priceMode
            ? (<Typography variant="subheading" component="div">
              {OrderDetailPriceModeTitle}
              <Typography variant="title" color="inherit" gutterBottom={ true } className={classes.value}>
                {priceMode}
              </Typography>
            </Typography>)
            : null
          }

        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export const OrderDetailsGeneralInfo = withStyles(styles)(OrderDetailsGeneralInfoBase);

