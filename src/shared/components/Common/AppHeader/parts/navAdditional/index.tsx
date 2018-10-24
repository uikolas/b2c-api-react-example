import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import { Lang } from '../lang';
import { User } from '../user';
import { Cart } from '../cart';
import { AddNavProps as Props } from './types';
import { styles } from './styles';

export const AddNavComponent: React.SFC<Props> = ({classes}) => (
  <div className={ classes.addNavContainer }>
    <div className={ classes.addNavItem }><Lang /></div>
    <div className={ classes.addNavItem }><User /></div>
    <div className={ classes.addNavItem }><Cart /></div>
  </div>
);

export const AddNav = withStyles(styles)(AddNavComponent);
