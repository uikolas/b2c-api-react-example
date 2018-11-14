import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import { ProductAvailability } from '../ProductAvailability';

import { styles } from './styles';
import {
  TPriceTypeDefaultGross,
  TPriceTypeOriginalGross,
  TProductName,
  TProductSKU,
} from 'src/shared/interfaces/product';

interface ProductGeneralInfoProps extends WithStyles<typeof styles> {
  name: TProductName;
  sku: TProductSKU;
  price: TPriceTypeOriginalGross;
  oldPrice: TPriceTypeDefaultGross;
  availability: string;
}

// export const priceTitle = 'Price: ';
// export const oldPriceTitle = 'Old price: ';

export const ProductGeneralInfoBase: React.SFC<ProductGeneralInfoProps> = (props): JSX.Element => {
  const {classes, name = 'No name', price = 'No price', oldPrice, availability} = props;

  return (
    <div className={ classes.root }>
      <Typography variant="title" color="inherit" gutterBottom={ true }>
        { name }
      </Typography>
      <div className={ classes.productInfo }>
        <div className={ classes.priceBlock }>
          <Typography variant="subheading" color="inherit" gutterBottom={ true } className={ classes.price }>
            { price }
          </Typography>
          { oldPrice
            ? (
              <Typography variant="subheading" gutterBottom={ true } className={ classes.oldPrice }>
                { oldPrice }
              </Typography>
            )
            : null
          }
        </div>
        <ProductAvailability availability={ availability }/>
      </div>
    </div>

  );
};

export const ProductGeneralInfo = withStyles(styles)(ProductGeneralInfoBase);

