import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

interface CartImageProps extends WithStyles<typeof styles> {
  image: string;
  size: number;
}

export const CartImageBase: React.SFC<CartImageProps> = (props) => {
  const {classes, size, image} = props;
  const sizePX = `${size}px`;
  const imgSize = size * 0.82;

  return (
    <div className={ classes.imgWrapper } style={{ width: sizePX, height: sizePX }}>
      <img
        src={ image }
        style={{ maxWidth: imgSize, maxHeight: imgSize }}
      />
      <div className={ classes.actionAreaOverlay } />
    </div>
  );
};

export const CartImage = withStyles(styles)(CartImageBase);
