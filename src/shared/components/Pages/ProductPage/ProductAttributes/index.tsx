import * as React from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import {IProductAttributes} from '../../../../interfaces/product';

import {styles} from './styles';

interface ProductAttributesProps extends WithStyles<typeof styles> {
  attributes: IProductAttributes;
}

export const ProductAttributesBase: React.SFC<ProductAttributesProps> = (props): JSX.Element => {
  const { classes, attributes} = props;

  if (!attributes) {
    return null;
  }

  return (
    <Grid container justify="center" className={classes.root}>
      { Object.entries(attributes).map((data: any) => {
          return (
            <Grid key={data[0]} item xs={12} sm={6} className={classes.element}>
              <Typography variant="title" color="inherit" gutterBottom={true}>
                {`${data[0]}: `}
                <Typography variant="subheading" className={classes.value} component="span">
                  {data[1]}
                </Typography>
              </Typography>
            </Grid>
          );
        })
      }
    </Grid>
  );
};

export const ProductAttributes = withStyles(styles)(ProductAttributesBase);
