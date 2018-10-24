import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import CatalogSearch from '../CatalogSearch';
import { Logo } from './parts/logo';
import { MainNav } from './parts/navMain';
import { AddNav } from './parts/navAdditional';
import { AppHeaderProps as Props } from './types';
import { styles } from './styles';

export const AppHeaderComponent: React.SFC<Props> = ({classes}) => (
  <div className={ classes.header }>
    <div className={ classes.headerTop }>
      <div className={ classes.headerContainer }>
        <Logo/>

        <div className={ classes.headerSearchContainer }>
          <CatalogSearch/>
        </div>
      </div>
    </div>
    <div className={ classes.headerBottom }>
      <div className={ classes.headerContainer }>
        <MainNav/>

        <AddNav />
      </div>
    </div>
  </div>
);

export const AppHeader = withStyles(styles)(AppHeaderComponent);
