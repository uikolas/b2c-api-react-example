import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { merge } from 'src/shared/helpers/common';
import CatalogSearch from '../CatalogSearch';
import { Preloader } from '../Preloader';
import { Logo } from './parts/logo';
import { MainNav } from './parts/navMain';
import { AddNav } from './parts/navAdditional';
import { AppHeaderProps as Props } from './types';
import { styles } from './styles';

export const AppHeaderComponent: React.SFC<Props> = ({classes, isLoading, isMobileNavOpened, onMobileNavToggle}) => (
  <div className={ classes.header }>
    <div className={ classes.headerTop }>
      <div className={ merge([classes.headerContainer, classes.headerTopContainer]) }>
        <div className={ classes.logoContainer }>
          <Logo/>
        </div>

        <div className={ classes.headerSearchContainer }>
          <CatalogSearch/>
        </div>
      </div>
    </div>
    <div className={ classes.headerBottom }>
      <div className={ classes.headerContainer }>
        <div
          className={ merge([classes.hamburger, isMobileNavOpened ? classes.hamburgerOpened : '']) }
          onClick={ onMobileNavToggle }
        >
          <span/>
          <span/>
        </div>

        <MainNav mobileNavState={ isMobileNavOpened }/>

        <AddNav/>
      </div>
      { isLoading ? <Preloader extraClasses={ classes.preloader }/> : null }
    </div>
  </div>
);

export const AppHeader = withStyles(styles)(AppHeaderComponent);
