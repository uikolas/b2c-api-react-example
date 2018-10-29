import * as React from 'react';
import { NavLink } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

import { MainNavProps as Props } from './types';
import { styles } from './styles';
import { connect } from './connect';
import { navLinks } from './navLinks';
import { pathSearchPage } from 'src/shared/routes/contentRoutes';

@connect
export class MainNavComponent extends React.PureComponent<Props> {
  public render() {
    const { classes, categoriesTree } = this.props;
    return (
      <nav className={classes.mainNav}>
        {navLinks.map(category => (
          <NavLink key={ category.name + category.path } className={ classes.mainNavLink } to={ category.path }>
            {category.name}
          </NavLink>
        ))}
      </nav>
    );
  }
}

export const MainNav = withStyles(styles)(MainNavComponent);
