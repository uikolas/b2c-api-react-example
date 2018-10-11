import * as React from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import {styles} from './styles';
import {
  TPriceTypeDefaultGross, TPriceTypeOriginalGross, TProductName,
  TProductSKU
} from "../../../../interfaces/product/index";

interface ProductGeneralInfoProps extends WithStyles<typeof styles> {
  name: TProductName;
  sku: TProductSKU;
  price: TPriceTypeOriginalGross;
  oldPrice: TPriceTypeDefaultGross;
}

export const skuTitle = "SKU: ";
export const priceTitle = "Price: ";
export const oldPriceTitle = "Old price: ";

export const ProductGeneralInfoBase: React.SFC<ProductGeneralInfoProps> = (props): JSX.Element => {
  const { classes, name = "No name", sku = "No SKU", price = "No price", oldPrice } = props;
  console.log('oldPrice', oldPrice);
  return (
    <div className={classes.root}>
      <Typography variant="title" color="inherit" gutterBottom={true}>
        {name}
      </Typography>
      <Typography variant="subheading" color="inherit" gutterBottom={true}>
        {skuTitle}{sku}
      </Typography>
      {oldPrice
        ? (
          <Typography variant="subheading" gutterBottom={true}>
            {oldPriceTitle}{oldPrice}
          </Typography>
        )
        : null
      }
      <Typography variant="subheading" color="inherit" gutterBottom={true}>
        {priceTitle}{price}
      </Typography>
    </div>

  );
};

export const ProductGeneralInfo = withStyles(styles)(ProductGeneralInfoBase);

