import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { styles } from './styles';
import { CartImage } from 'src/shared/components/Common/CartImage';
import { AppPrice } from 'src/shared/components/Common/AppPrice';
import { CartTotal } from 'src/shared/components/Common/CartTotal';
import { CartDataProps, CartDataState } from './types';
import { ICartItem } from 'src/shared/interfaces/cart';
import { priceTypeNameOriginal } from 'src/shared/interfaces/product';


export class CartDataBase extends React.Component<CartDataProps, CartDataState> {
  private containerRef: React.RefObject<HTMLDivElement> = React.createRef();
  private designImgWidth: number = 0.33;

  public state: CartDataState = {
    heightListItem: 100,
  };

  public componentDidMount() {
    window.addEventListener('resize', this.setListItemHeight);
    this.setListItemHeight();
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.setListItemHeight);
  }

  private setListItemHeight = () => {
    if (this.containerRef && this.containerRef.current) {
      this.setState({heightListItem: this.containerRef.current.offsetWidth * this.designImgWidth});
    }
  };

  public render() {
    const { classes, products, totals }  = this.props;

    const rows = products.map((item: ICartItem) => (
      <ListItem
        key={ item.sku }
        disableGutters
        divider
        className={ classes.listItem }
      >
        <CartImage
          image={ item.image }
          size={this.state.heightListItem}
        />
        <div className={classes.itemWrapper}>
          <div className={classes.itemName}>{ item.name }</div>
          <AppPrice value={ item.calculations.sumPriceToPayAggregation } extraClassName={classes.priceAndQtyInfo} />
          {
            item.calculations.sumPriceToPayAggregation !== item.calculations.sumGrossPrice
              ? <AppPrice
                value={ item.calculations.sumGrossPrice }
                extraClassName={`${classes.priceAndQtyInfo} ${classes.smallFont}`}
                priceType={priceTypeNameOriginal}
              />
              : null
          }
          <div className={`${classes.priceAndQtyInfo} ${classes.marginTopQty}`}>
            {`Quantity: ${item.quantity}`}
          </div>
        </div>
      </ListItem>
    ));

    return (
      <div className={ classes.root } ref={this.containerRef}>
        <Typography
          component="h3"
          noWrap
          align="left"
          color="primary"
          className={classes.title}
        >
          Cart
        </Typography>
        <Divider className={ classes.titleDivider} />
        <List>
          { rows }
        </List>

        <Typography
          component="h3"
          noWrap
          align="left"
          color="primary"
          className={`${classes.title} ${classes.summaryTitle}`}
        >
          Order summary
        </Typography>

        <CartTotal totals={totals} />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          className={ classes.btnWrapper }
        >
          place order
        </Button>
      </div>
    );
  }
}

export const CartData = withStyles(styles)(CartDataBase);
