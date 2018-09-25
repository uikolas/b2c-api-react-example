import * as React from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import {styles} from './styles';

interface ProductAvailabilityProps extends WithStyles<typeof styles> {
  availability: string;
}

export const availabilityTitle = "";

export const ProductAvailabilityBase: React.SFC<ProductAvailabilityProps> = (props): JSX.Element => {
  const { classes, availability} = props;

  return (
    <div className={classes.root}>
      <Typography variant="title" color="inherit" gutterBottom={true}>
        {availabilityTitle ? availabilityTitle : null}
        <Typography variant="subheading" className={classes.value} component="span">
          {availability}
        </Typography>
      </Typography>
    </div>
  );
};

export const ProductAvailability = withStyles(styles)(ProductAvailabilityBase);

