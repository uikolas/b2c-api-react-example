import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

import { styles } from './styles';
import {ISprykerButtonProps} from './types';


export const SprykerButtonBase: React.SFC<ISprykerButtonProps> = (props): JSX.Element => {
  const {
    classes,
    extraClasses = '',
    onClick,
    title,
    IconType,
    iconComponent,
    disabled,
    value,
    btnType,
  } = props;

  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      disabled={ !!disabled }
      className={ `${classes.button} ${extraClasses}` }
      value={ value }
      onClick={onClick ? onClick : null}
      type={ btnType ? btnType : 'button' }
    >
      { title }
      { IconType ? <IconType className={ classes.icon }/> : null }
      { iconComponent ? iconComponent : null }
    </Button>
  );
};

export const SprykerButton = withStyles(styles)(SprykerButtonBase);

