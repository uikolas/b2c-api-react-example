import * as React from 'react';
import { NavLink } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import { pathHomePage } from 'src/shared/routes/contentRoutes';
import { LogoProps as Props } from './types';
import { styles } from './styles';
import { SprykerLogoBlack } from 'src/shared/assets/icons/SprykerLogoBlack';
import { FormattedMessage } from 'react-intl';

export const LogoComponent: React.SFC<Props> = ({ classes }) => (

    <div className={ classes.logoContainer }>
        <NavLink to={ pathHomePage } className={ classes.logo }>
            <SprykerLogoBlack />
        </NavLink>
        <span className={ classes.logoCopy }>
            <FormattedMessage id={ 'spryker.name.title' } />
        </span>
    </div>
);

export const Logo = withStyles(styles)(LogoComponent);
