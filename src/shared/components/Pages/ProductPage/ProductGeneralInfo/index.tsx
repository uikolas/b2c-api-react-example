import * as React from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import {styles} from './styles';

interface ProductGeneralInfoProps extends WithStyles<typeof styles> {
  name: string;
  sku: string | number;
  price: string;
}

export const ProductGeneralInfoBase: React.SFC<ProductGeneralInfoProps> = (props): JSX.Element => {
  const { classes, name = "No name", sku = "No SKU", price = "No price" } = props;

  return (
    <div className={classes.root}>
      <Typography variant="title" color="inherit" gutterBottom={true}>
        {name}
      </Typography>
      <Typography variant="subheading" color="inherit" gutterBottom={true}>
        {sku}
      </Typography>
      <Typography variant="subheading" color="inherit" gutterBottom={true}>
        {price}
      </Typography>
    </div>

  );
};

export const ProductGeneralInfo = withStyles(styles)(ProductGeneralInfoBase);

