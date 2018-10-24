import * as React from 'react';
import { NavLink } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

import { MainNavProps as Props } from './types';
import { navLinks } from './navLinks';
import { styles } from './styles';

export const MainNavComponent: React.SFC<Props> = ({classes}) => (
  <nav className={ classes.mainNav }>
    { navLinks.map(link => (
      <NavLink key={ link.name + link.path } className={ classes.mainNavLink } to={ link.path }>
        { link.name }
      </NavLink>
    )) }
  </nav>
);

export const MainNav = withStyles(styles)(MainNavComponent);
