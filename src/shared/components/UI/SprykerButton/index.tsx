import * as React from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

import {styles} from './styles';

interface SprykerButtonProps extends WithStyles<typeof styles> {
  title: string;
  extraClasses?: string;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

export const SprykerButtonBase: React.SFC<SprykerButtonProps> = (props): JSX.Element => {
  const { classes, extraClasses = '', onClick, title} = props;

  return (
    <Button
      variant="contained"
      component="button"
      className={`${classes.button} ${extraClasses}`}
      onClick={
        onClick
          ? onClick
          : null
      }
    >
      {title}
    </Button>
  );
};

export const SprykerButton = withStyles(styles)(SprykerButtonBase);

