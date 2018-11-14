import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

import { AppPrice } from 'src/shared/components/Common/AppPrice';

import { ProductItemProps as Props } from './types';
import { styles } from './styles';


export const ProductItemComponent: React.SFC<Props> = ({classes, productData, deleteItem}) => (
  <div className={ classes.productItem }>
    <div className={ classes.image }>
      <div>
        <img src={ productData.image } alt={ productData.name }/>
      </div>
    </div>
    <div className={ classes.rowsContainer }>
      <div className={ classes.topRow }>
        <div className={ classes.name }>
          { productData.name }
        </div>
        <div className={ classes.price }>
          <AppPrice value={ productData.calculations.sumPrice }/>
        </div>
      </div>
      <div className={ classes.bottomRow }>
        <div className={ classes.quantity }>
        <span>
          Quantity: { productData.quantity }
        </span>
        </div>
        <div>
          <Button className={ classes.btnRemove } onClick={ () => deleteItem(productData.sku) }>
            Remove
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export const ProductItem = withStyles(styles)(ProductItemComponent);
