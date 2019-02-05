import * as React from 'react';
import { withRouter } from 'react-router';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton/IconButton';
import { ClickEvent } from 'src/shared/interfaces/common/react';
import { pathCustomerPage, pathCustomerProfilePage, pathLoginPage } from 'src/shared/routes/contentRoutes';
import { UserIcon } from './icons';
import { UserDrop } from './UserDrop/index';
import { UserDropNavigationProps as Props, UserDropNavigationState as State } from './types';
import { connect } from './connect';
import { styles } from './styles';
import { PopoverWrapper } from 'src/shared/components/components/PopoverWrapper';
import { BreakpointsSM } from 'src/shared/constants/breakpoints';
import { LogoutSetTimeoutTime } from '@constants/customer';

@connect
@(withRouter as Function)
export class UserDropNavigationComponent extends React.Component<Props, State> {
    public state: State = {
        anchorEl: null
    };

    public componentDidUpdate(prevProps: Props) {
        if (this.props.location !== prevProps.location) {
            this.closePopover();
        }
    }

    private openPopover = ({currentTarget}: ClickEvent) => {
        if (window.innerWidth < BreakpointsSM) {
            if (this.props.isUserLoggedIn) {
                this.props.history.push(pathCustomerProfilePage);
            } else {
                this.props.history.push(pathLoginPage);
            }
        } else {
            this.setState(() => ({anchorEl: currentTarget}));
        }
    };
    private closePopover = () => this.setState(() => ({anchorEl: null}));

    public handleLogout = (e: ClickEvent) => {
        e.preventDefault();
        if (this.props.location.pathname.includes(pathCustomerPage)) {
            this.props.logout();
        } else {
            this.props.history.push(pathCustomerPage);
            setTimeout(this.props.logout, LogoutSetTimeoutTime);
        }
    };

    public render() {
        const {anchorEl} = this.state;
        const {classes, popoverPosLeft, popoverPosTop, isUserLoggedIn} = this.props;
        const open = Boolean(anchorEl);

        return (
            <div>
                <IconButton aria-label="person" onClick={this.openPopover}>
                    <UserIcon />
                </IconButton>

                <PopoverWrapper
                    popoverPosLeft={popoverPosLeft}
                    popoverPosTop={popoverPosTop}
                    anchorEl={anchorEl}
                    closePopoverHandler={this.closePopover}
                    extraHelperClassName={classes.popoverTriangle}
                >
                    <UserDrop
                        closePopoverHandler={this.closePopover}
                        onLogoutClick={this.handleLogout}
                        isUserLoggedIn={isUserLoggedIn}
                    />
                </PopoverWrapper>

            </div>
        );
    }
}

export const UserDropNavigation = withStyles(styles)(UserDropNavigationComponent);
