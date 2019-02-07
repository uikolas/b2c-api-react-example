import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { formatDateToString } from 'src/shared/helpers/common/dates';
import { appFixedDimensions } from 'src/shared/theme/properties/new/appFixedDimensions';
import { pathOrderDetailsPageBase } from 'src/shared/routes/contentRoutes';

import { AppPrice } from 'src/shared/components/Common/AppPrice';
import { AppTable } from 'src/shared/components/Common/AppTable';

import { IOrderItem } from 'src/shared/interfaces/order';
import { IOrderListProps } from 'src/shared/components/Pages/OrderHistoryPage/OrderList/types';
import { ICellInfo, ITableRow } from 'src/shared/components/Common/AppTable/types';

import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export const OrderListBase: React.SFC<IOrderListProps> = (props): JSX.Element => {
    const {classes, orders} = props;

    const headerCellPart = 'header-';
    const rowPart = 'order-';

    const headerCells: ICellInfo[] = [
        {id: `${headerCellPart}1`, content: <FormattedMessage id={ 'order.id.title' } />},
        {id: `${headerCellPart}2`, content: <FormattedMessage id={ 'orders.date.title' } />},
        {id: `${headerCellPart}3`, content: <FormattedMessage id={ 'orders.total.title' } />},
        {id: `${headerCellPart}4`, content: ''},
    ];

    const bodyRows: ITableRow[] = orders.map((item: IOrderItem) => ({
        id: `${rowPart}${item.id}`,
        cells: [
            {id: `id-${item.id}`, content: `#${item.id}`},
            {id: `date-${item.id}`, content: formatDateToString(new Date(item.dateCreated))},
            {
                id: `price-${item.id}`,
                content: <AppPrice
                    value={item.totals.grandTotal}
                    specificCurrency={item.currency}
                    extraClassName={classes.price}
                    isStylesInherited={true}
                />
            },
            {
                id: `actions-${item.id}`,
                content: <NavLink
                    to={`${pathOrderDetailsPageBase}/${item.id}`}
                    className={classes.orderBtn}
                >
                    <FormattedMessage id={ 'orders.view.order.title' } />
                </NavLink>
            },
        ],
    }));

    return (
        <div className={classes.root}>
            <AppTable
                headerCells={headerCells}
                bodyRows={bodyRows}
                isResponsive={true}
                width={appFixedDimensions.customerSubPageWidth}
            />
        </div>
    );
};

export const OrderList = withStyles(styles)(OrderListBase);
