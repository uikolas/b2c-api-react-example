import * as React from 'react';
import { NavLink } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import DoneIcon from '@material-ui/icons/Done';
import { styles } from '../styles';
import { CustomerPageTitle } from 'src/shared/components/Common/CustomerPageTitle';
import { OrderSuccessProps } from './types';
import { OrderCreatedSuccess, OrderThank, OrderId } from 'src/shared/translation';
import { pathOrderDetailsPageBase } from 'src/shared/routes/contentRoutes';
import { FormattedMessage } from 'react-intl';

export const OrderSuccessBase: React.SFC<OrderSuccessProps> = ({ classes, order }) => {
    return (
        <div className={ classes.success }>
            <CustomerPageTitle title={ <FormattedMessage id={ 'word.success.title' } /> } />
            <div className={ classes.thank }>
                <FormattedMessage id={ 'order.success.thank.message' } />
                <NavLink to={ `${pathOrderDetailsPageBase}/${order}` } className={ classes.link }>
                    here.
                </NavLink>
            </div>
            <div className={ `${classes.thank} ${classes.order}` }>
                <FormattedMessage id={ 'order.id.title' } />: <span>{ order }</span>
            </div>
            <div className={ classes.doneIcon }>
                <DoneIcon />
            </div>
        </div>
    );
};

export const OrderSuccess = withStyles(styles)(OrderSuccessBase);
