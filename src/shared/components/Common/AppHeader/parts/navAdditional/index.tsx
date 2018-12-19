import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Search from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton/IconButton';

import { merge } from 'src/shared/helpers/common';
// import { Lang } from '../lang';
import { User } from '../user';
import { Cart } from '../cart';
import { AddNavProps as Props } from './types';
import { styles } from './styles';

export const AddNavComponent: React.SFC<Props> = ({classes, showSearch, handleSearch, isSticky}) => (
  <div className={ classes.addNavContainer }>
    <div className={ merge([classes.addNavItem, showSearch ? classes.addNavSearch : '']) }>
      <IconButton onClick={ handleSearch } aria-label="Search">
        <Search/>
      </IconButton>
    </div>
    {/*<div className={ classes.addNavItem }><Lang/></div>*/}
    <div className={ classes.addNavItem }><User/></div>
    <div className={`${classes.addNavItem}`}><Cart isSticky={isSticky} showSearch={showSearch} /></div>
  </div>
);

export const AddNav = withStyles(styles)(AddNavComponent);
