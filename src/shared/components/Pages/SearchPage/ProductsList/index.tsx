import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import { styles } from './styles';
import {IProductCard, IProductLabel, TProductCurrency} from "src/shared/interfaces/product/index";
import {sprykerTheme} from "src/shared/theme/sprykerTheme";
import {ProductCard} from "src/shared/components/Common/ProductCard/index";
import {AppPageHeadline} from "src/shared/components/Common/AppPageHeadline/index";
import {
  IAvailableLabelsCollection,
  IProductsLabeledCollection
} from "src/shared/interfaces/searchPageData/index";
import {getProductLabel} from "src/shared/helpers/product/label";


interface ProductsListProps extends WithStyles<typeof styles> {
  products: Array<IProductCard>;
  selectProductHandler: Function;
  currency: TProductCurrency;
  isLoading: boolean;
  productsLabeled: IProductsLabeledCollection | null;
  availableLabels: IAvailableLabelsCollection | null;
}

const emptyTitle = 'Nothing to show.';
const loadingTitle = 'Waiting for results';

export const ProductsListBase: React.SFC<ProductsListProps> = (props) => {
  const {
    classes,
    products,
    selectProductHandler,
    currency,
    isLoading,
    productsLabeled,
    availableLabels,
  } = props;

  const isProductsExist = (Array.isArray(products) && products.length);

  return (
    <Grid container spacing={sprykerTheme.appFixedDimensions.gridSpacing} className={classes.root} >
      { isProductsExist
        ? products.map((product: IProductCard) => {
            let label: IProductLabel | null = null;
            if (productsLabeled) {
              const labelsIdArr = productsLabeled[product.abstract_sku] || productsLabeled[product.abstractSku] || null;
              label = getProductLabel(labelsIdArr, availableLabels);
            }

            return (
              <Grid item xs={12} sm={6} md={4} key={product.abstract_sku || product.abstractSku} >
                <ProductCard
                  currency={ currency }
                  images={ product.images }
                  price={ product.price }
                  prices={ product.prices }
                  name={ product.abstract_name || product.abstractName }
                  sku={ product.abstract_sku || product.abstractSku }
                  onSelectProduct={selectProductHandler}
                  label={label}
                />
              </Grid>
            );
        })
        : <Grid item xs >
            <AppPageHeadline title={isLoading ? loadingTitle : emptyTitle} />
          </Grid>
      }
    </Grid>
  );
};

export const ProductsList = withStyles(styles)(ProductsListBase);
