import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { appFixedDimensions } from 'src/shared/theme/properties/new/appFixedDimensions';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography/Typography';
import { AppPrice } from '@components/Common/AppPrice';
import { AppTable } from '@components/Common/AppTable';
import { IOrderProductListProps } from './types';
import { IOrderDetailsItem } from '@interfaces/order';
import { ICellInfo, ITableRow } from '@components/Common/AppTable/types';
import { styles } from './styles';

export const OrderProductListBase: React.SFC<IOrderProductListProps> = props => {
    const {classes, items} = props;

    const headerCellPart = 'header-';
    const rowPart = 'order-';
    const headerCells: ICellInfo[] = [
        {id: `${headerCellPart}1`, content: <FormattedMessage id={'word.items.title'} />},
        {id: `${headerCellPart}2`, content: <FormattedMessage id={'word.price.title'} />},
        {id: `${headerCellPart}3`, content: <FormattedMessage id={'word.quantity.title'} />},
        {
            id: `${headerCellPart}4`,
            content: <FormattedMessage id={'word.total.title'} />,
            extraClassName: classes.total
        }
    ];

    const bodyRows: ITableRow[] = items.map((item: IOrderDetailsItem) => ({
        id: `${rowPart}${item.sku}`,
        cells: [
            {
                id: `name-${item.sku}`,
                content: (
                    <Typography component="p" color="inherit">
                        {item.name}
                        <Typography component="span" className={classes.sku}>
                            <FormattedMessage id={'product.sku.title'} />{`: ${item.sku}`}
                        </Typography>
                    </Typography>
                )
            },
            {
                id: `price-${item.sku}`,
                content: <AppPrice
                    value={item.sumPrice}
                    isStylesInherited={true}
                />
            },
            {id: `quantity-${item.sku}`, content: item.quantity},
            {
                id: `total-${item.sku}`,
                content: <AppPrice
                    value={item.sumPriceToPayAggregation}
                    isStylesInherited={true}
                />,
                extraClassName: classes.total
            }
        ]
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

export const OrderProductList = withStyles(styles)(OrderProductListBase);
