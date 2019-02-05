import * as React from 'react';
import { NavLink } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import { MainNavProps as Props } from './types';
import { styles } from './styles';
import { connect } from './connect';
import { fixtures } from './fixtures';
import { FormattedMessage } from 'react-intl';

@connect
export class MainNavigationComponent extends React.Component<Props> {
    public render() {
        const {classes, categoriesTree, mobileNavState} = this.props;

        return (
            <nav className={`${classes.mainNav} ${mobileNavState ? classes.mainNavOpened : ''}`}>
                {fixtures.map(category => (
                    <NavLink key={category.name + category.path} className={classes.mainNavLink} to={category.path}>
                        <FormattedMessage id={category.name} />
                    </NavLink>
                ))}
            </nav>
        );
    }
}

export const MainNavigation = withStyles(styles)(MainNavigationComponent);
