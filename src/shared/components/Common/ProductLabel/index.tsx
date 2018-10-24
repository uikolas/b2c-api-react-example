import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import {IProductLabel} from '../../../interfaces/product';
import { styles } from './styles';

interface ProductLabelProps extends WithStyles<typeof styles> {
  label: IProductLabel;
}

export const ProductLabelBase: React.SFC<ProductLabelProps> = (props) => {
  const {classes, label} = props;
  if (!label) {
    return null;
  }
  const labelData: {[key: string]: any} = {
    'sale': {
      className: classes.saleLabel,
    },
    'new': {
      className: classes.newLabel,
    },
  };
  const labelClassName: string = labelData[label.type].className;

  return (
    <div className={`${classes.label} ${labelClassName}`}>
      <Typography
        component="span"
        className={classes.labelText}
      >
        {label.text}
      </Typography>
    </div>
  );
};

export const ProductLabel = withStyles(styles)(ProductLabelBase);
