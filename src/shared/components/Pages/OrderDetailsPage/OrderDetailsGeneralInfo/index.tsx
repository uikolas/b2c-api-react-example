import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import { NavLink } from 'react-router-dom';

import { styles } from './styles';
import { IOrderDetailsGeneralInfoProps } from './types';
import { CustomerPageTitle } from 'src/shared/components/Common/CustomerPageTitle/index';
import { pathOrderHistoryPage } from 'src/shared/routes/contentRoutes';
import { OrderDate } from 'src/shared/components/Pages/OrderDetailsPage/OrderDate/index';
import { OrderPriceMode } from 'src/shared/components/Pages/OrderDetailsPage/OrderPriceMode/index';
import { FormattedMessage } from 'react-intl';

export const OrderDetailsGeneralInfoBase: React.SFC<IOrderDetailsGeneralInfoProps> = (props): JSX.Element => {
    const {classes, orderId, date, priceMode, timeZone} = props;

    return (
        <Grid container justify="space-between" className={classes.titleContainer}>
            <Grid item xs={12} sm={8}>
                <CustomerPageTitle
                    title={ <FormattedMessage
                        id={ 'order.detail.number.title' }
                        values={{ number: orderId }}
                    /> }
                    intro={
                        <React.Fragment>
                            <OrderDate
                                date={date}
                                timeZone={timeZone}
                                title={<FormattedMessage id={ 'order.detail.date.title' } />}
                            />
                            <OrderPriceMode
                                title={<FormattedMessage id={ 'order.detail.price.title' } />}
                                priceMode={priceMode}
                            />
                        </React.Fragment>

                    }
                    containerExtraClasses={classes.title}
                />
            </Grid>
            <Grid item xs={12} sm={4} className={classes.linkBackOuter}>
                <NavLink
                    to={`${pathOrderHistoryPage}`}
                    className={classes.linkBack}
                >
                    <FormattedMessage id={ 'order.detail.view.all.title' } />
                </NavLink>
            </Grid>
        </Grid>
    );
};

export const OrderDetailsGeneralInfo = withStyles(styles)(OrderDetailsGeneralInfoBase);
