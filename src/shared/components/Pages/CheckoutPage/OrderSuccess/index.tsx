import * as React from 'react';
import {NavLink} from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from '../styles';
import { CustomerPageTitle } from 'src/shared/components/Common/CustomerPageTitle';
import { OrderSuccessProps } from './types';
import { OrderCreatedSuccess, OrderThank, OrderId } from 'src/shared/constants/orders';
import { pathCustomerPage, pathOrderDetailsPageBase } from "src/shared/routes/contentRoutes";

export const OrderSuccessBase: React.SFC<OrderSuccessProps> = ({classes, order}) => {
  return (
    <React.Fragment>
      <CustomerPageTitle title={OrderCreatedSuccess}/>
      <div className={classes.thank}>
        <span>{OrderThank}</span>
        <NavLink to={ `${pathOrderDetailsPageBase}/${order}` } className={ classes.link }>
          here.
        </NavLink>
      </div>
      <div className={`${classes.thank} ${classes.order}`}>
        <span>{OrderId}</span>
        <span>{order}</span>
      </div>
    </React.Fragment>
  );
}

export const OrderSuccess = withStyles(styles)(OrderSuccessBase);
