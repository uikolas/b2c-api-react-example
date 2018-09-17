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
  const { classes, images, abstract_name: productName = 'No name', price = 0, currency } = props;
  const priceToShow = getFormattedPrice(price, currency);

  return (
    <Card className={classes.card} raised={true}>
      <CardActionArea>
        { images && images[0].external_url_small
          ? <CardMedia
            component="img"
            className={classes.media}
            image={images[0].external_url_small}
            title={productName}
          />
          : null
        }
        <CardContent>
          <Typography gutterBottom variant="title" data-type="productName">
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
