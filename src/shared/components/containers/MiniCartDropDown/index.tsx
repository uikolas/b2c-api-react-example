import * as React from 'react';
import { withRouter } from 'react-router';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import { ClickEvent } from 'src/shared/interfaces/common/react';
import { MiniCartDrop } from './MiniCartDrop';
import { CartIcon } from './icons';
import { IMiniCartDropDownProps as Props, IMiniCartDropDownState as State } from './types';
import { connect } from './connect';
import { styles } from './styles';
import { pathCartPage } from 'src/shared/routes/contentRoutes';
import { PopoverWrapper } from 'src/shared/components/components/PopoverWrapper';
import { FormattedMessage } from 'react-intl';
import { BreakpointsSM } from 'src/shared/constants/breakpoints';

@(withRouter as Function)
@connect
export class MiniCartDropDownComponent extends React.Component<Props, State> {
    public state: State = {
        anchorEl: null,
        isCartNotificationOpen: true
    };

    public componentDidUpdate(prevProps: Props) {
        if (this.props.location !== prevProps.location) {
            this.closePopover();
        }

        if (this.props.cartProductsQuantity > prevProps.cartProductsQuantity) {
            this.handleOpenCartNotification();
        }

        if (this.props.cartProductsQuantity === 0 && prevProps.cartProductsQuantity > 0) {
            this.closePopover();
        }
    }

    private openPopover = ({currentTarget}: ClickEvent) => {
        const {cartItemsQuantity} = this.props;

        if (window.innerWidth < BreakpointsSM) {
            if (cartItemsQuantity !== 0) {
                this.props.history.push(pathCartPage);
            }
        } else {
            this.setState(() => ({anchorEl: cartItemsQuantity !== 0 ? currentTarget : null}));
        }
    };
    private closePopover = () => this.setState(() => ({anchorEl: null}));

    private handleCloseCartNotification = () => {
        this.setState(() => ({isCartNotificationOpen: false}));
    };

    private handleOpenCartNotification = () => {
        this.setState(() => ({isCartNotificationOpen: true}));
    };

    public render() {
        const {anchorEl, isCartNotificationOpen} = this.state;
        const {classes, cartItemsQuantity, popoverPosLeft, popoverPosTop} = this.props;
        const open = Boolean(anchorEl);

        const cartButton = (
            <IconButton aria-label="cart" onClick={this.openPopover} color="inherit">
                <Badge
                    badgeContent={cartItemsQuantity}
                    classes={{
                        colorPrimary: classes.badge,
                        badge: cartItemsQuantity === 0 && classes.hideBadge
                    }}
                    color="primary"
                >
                    <CartIcon />
                </Badge>
            </IconButton>
        );

        return (
            <div>
                {cartItemsQuantity === 0
                    ? (<Tooltip disableFocusListener
                                placement="top"
                                title={<FormattedMessage id={'empty.cart.title'} />}>
                        {cartButton}
                    </Tooltip>)
                    : cartButton
                }

                <PopoverWrapper
                    popoverPosLeft={popoverPosLeft}
                    popoverPosTop={popoverPosTop}
                    anchorEl={anchorEl}
                    closePopoverHandler={this.closePopover}
                    extraContentClassName={classes.cartContent}
                    extraHelperClassName={classes.popoverTriangle}
                >
                    <MiniCartDrop />
                </PopoverWrapper>
            </div>
        );
    }
}

export const MiniCartDropDown = withStyles(styles)(MiniCartDropDownComponent);
