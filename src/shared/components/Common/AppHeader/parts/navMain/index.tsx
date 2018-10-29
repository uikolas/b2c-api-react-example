import * as React from 'react';
import { NavLink } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

import { MainNavProps as Props } from './types';
import { styles } from './styles';
import { connect } from './connect';
import { pathSearchPage } from 'src/shared/routes/contentRoutes';

@connect
export class MainNavComponent extends React.PureComponent<Props> {
  public render() {
    const { classes, categoriesTree } = this.props;
    return (
      <nav className={classes.mainNav}>
        {categoriesTree.map(category => (
          <NavLink key={category.nodeId} className={classes.mainNavLink} to={`${pathSearchPage}/${category.nodeId}`}>
            {category.name}
          </NavLink>
        ))}
        <NavLink key="sale" className={classes.mainNavLink} to={`${pathSearchPage}/outlet`}>
          Sale %
        </NavLink>
        <NavLink key="new" className={classes.mainNavLink} to={`${pathSearchPage}/new`}>
          New
        </NavLink>
      </nav>
    );
  }
}

export const MainNav = withStyles(styles)(MainNavComponent);
