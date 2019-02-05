import * as React from 'react';
import { NavLink } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { pathLoginPage } from 'src/shared/routes/contentRoutes';
import { UserDropProps as Props } from './types';
import { styles } from './styles';
import { customerProfileNavLinks } from 'src/shared/constants/navLinks/index';
import { AppBtnLink } from 'src/shared/components/Common/AppBtnLink/index';
import { SprykerButton } from 'src/shared/components/UI/SprykerButton/index';
import { INavLinkData } from 'src/shared/interfaces/navLinks/index';
import { FormattedMessage } from 'react-intl';

export const UserDropComponent: React.SFC<Props> = props => {
    const {classes, isUserLoggedIn, closePopoverHandler, onLogoutClick} = props;

    const loggedInUser = (
        <React.Fragment>
            <ul className={classes.userDropNav}>
                {customerProfileNavLinks.map((item: INavLinkData) => (
                    <li key={item.title} onClick={closePopoverHandler}>
                        <NavLink to={item.path}>
                            <FormattedMessage id={item.title} />
                        </NavLink>
                    </li>
                ))}
            </ul>
            <div className={classes.userBtns}>
                <SprykerButton
                    title={<FormattedMessage id={'log.out.button.title'} />}
                    onClick={onLogoutClick}
                    extraClasses={classes.actionLogOut}
                />
            </div>
        </React.Fragment>
    );
    const notLoggedInUser = (
        <div className={classes.userBtns}>
            <AppBtnLink
                title={<FormattedMessage id={'word.register.title'} />}
                path={pathLoginPage}
                extraClassName={classes.action} />
            <AppBtnLink
                title={<FormattedMessage id={'log.in.button.title'} />}
                path={pathLoginPage}
                type="black"
                extraClassName={classes.action} />
        </div>
    );

    return (
        <div className={classes.userDrop}>
            <Typography component="h5" className={classes.title}>
                <FormattedMessage id={'account.title'} />
            </Typography>
            {isUserLoggedIn ? loggedInUser : notLoggedInUser}
        </div>
    );

};

export const UserDrop = withStyles(styles)(UserDropComponent);
