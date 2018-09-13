import * as React from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {getFormattedPrice} from '../../../services/priceFormatter';
import {IProductCard} from '../../../interfaces/productCard';
import {styles} from './styles';

interface ProductCardProps extends WithStyles<typeof styles>, IProductCard {
  currency: string;
}

export const ProductCardBase: React.SFC<ProductCardProps> = (props) => {
  const { classes, images, abstract_name: productName, price, currency } = props;

  // If there are more than one price, the "original price" should be shown as strikethrough price START
 /* const originalPrice = prices.filter((item: IProductCardPrice) => (item.priceTypeName === 'ORIGINAL'));
  let priceToParse;
  if(originalPrice.length) {
    priceToParse = originalPrice[0].grossAmount;
  } else {
    priceToParse = price;
  }
  const priceToShow = getFormattedPrice(priceToParse, currency);*/
  // FINISH
  const priceToShow = getFormattedPrice(price, currency);

  return (
    <Card className={classes.card} raised={true}>
      <CardActionArea>
        <CardMedia
          component="img"
          className={classes.media}
          image={images[0].external_url_small}
          title={productName}
        />
        <CardContent>
          <Typography gutterBottom variant="title" className="productName">
            {productName}
          </Typography>
          <Typography gutterBottom variant="subheading" color="primary" data-type="priceToShow">
            {priceToShow}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="secondary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export const ProductCard = withStyles(styles)(ProductCardBase);
