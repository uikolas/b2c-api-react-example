import * as React from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

import {styles} from './styles';

interface SprykerButtonProps extends WithStyles<typeof styles> {
  title: string;
  extraClasses?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  IconType?: any;
  iconComponent?: any;
}

export const SprykerButtonBase: React.SFC<SprykerButtonProps> = (props): JSX.Element => {
  const {
    classes,
    extraClasses = '',
    onClick,
    title,
    IconType,
    iconComponent,
    disabled,
  } = props;

  return (
    <Button
      variant="contained"
      component="button"
      disabled={!!disabled}
      className={`${classes.button} ${extraClasses}`}
      onClick={
        onClick
          ? onClick
          : null
      }
    >
      {title}
      {IconType ? <IconType className={classes.icon}/> : null}
      {iconComponent ? iconComponent : null}
    </Button>
  );
};

export const SprykerButton = withStyles(styles)(SprykerButtonBase);

