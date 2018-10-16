import * as React from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {styles} from './styles';
import {IOrderDetailsItem, TOrderProducts} from "../../../../interfaces/order/index";
import {OrderProductListItem} from "../OrderProductListItem/index";

interface OrderProductListProps extends WithStyles<typeof styles> {
  items: TOrderProducts;
}

export const productSkuTitle = "SKU";
export const productNameTitle = "Product name";
export const productPriceTitle = "Price";
export const productQuantityTitle = "Quantity";
export const productTotalTitle = "Item total";

export const OrderProductListBase: React.SFC<OrderProductListProps> = (props): JSX.Element => {
  const { classes, items } = props;

  return (
    <div className={classes.root}>

      <Paper className={classes.tableOuter}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>{productSkuTitle}</TableCell>
              <TableCell>{productNameTitle}</TableCell>
              <TableCell>{productPriceTitle}</TableCell>
              <TableCell>{productQuantityTitle}</TableCell>
              <TableCell>{productTotalTitle}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map( (item: IOrderDetailsItem)  => (
              <OrderProductListItem
                key={item.sku}
                sku={item.sku}
                name={item.name}
                quantity={item.quantity}
                sumPrice={item.sumPrice}
                sumPriceToPayAggregation={item.sumPriceToPayAggregation}
              />
            ))}
          </TableBody>
        </Table>
      </Paper>

    </div>

  );
};

export const OrderProductList = withStyles(styles)(OrderProductListBase);
