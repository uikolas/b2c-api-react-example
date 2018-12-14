import * as React from 'react';
import { withRouter } from 'react-router';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Popover from '@material-ui/core/Popover/Popover';
import Tooltip from '@material-ui/core/Tooltip';

import { ClickEvent } from 'src/shared/interfaces/commoon/react';
import { PopoverDrop } from 'src/shared/components/Common/AppHeader/parts/popoverDrop';
import { CartDrop } from './parts/cartDrop';
import { CartIcon } from './cart-icon';
import { CartProps as Props, CartState as State } from './types';
import { connect } from './connect';
import { styles } from './styles';
import { pathCartPage } from 'src/shared/routes/contentRoutes';
import { SprykerNotification } from 'src/shared/components/UI/SprykerNotification';
import {getPopoverPosition} from "src/shared/components/Common/AppHeader/helpers";

@(withRouter as any)
@connect
export class CartComponent extends React.PureComponent<Props, State> {
  public state: State = {
    anchorEl: null,
    isCartNotificationOpen: true,
    pageWidth: 0,
    pageHeight: 0,
  };

  public componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  public componentDidUpdate(prevProps: Props) {
    if (this.props.location !== prevProps.location) {
      this.closePopover();
    }

    if (this.props.cartProductsQuantity > prevProps.cartProductsQuantity) {
      this.handleOpenCartNotification();
    }
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  private openPopover = ({currentTarget}: ClickEvent) => {
    const {cartItemsQuantity} = this.props;

    if (window.innerWidth < 500) {
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

  private updateWindowDimensions = () => {
    this.setState({ pageWidth: window.innerWidth, pageHeight: window.innerHeight });
  };

  public render() {
    const {anchorEl, isCartNotificationOpen} = this.state;
    const {classes, cartItemsQuantity, isSticky} = this.props;
    const open = Boolean(anchorEl);
    const popoverPos = getPopoverPosition({pageWidth: this.state.pageWidth, isSticky});
    const popoverStyles = {
      top: popoverPos.top,
      left: 0,
    };

    const popoverProps = {
      open,
      anchorEl,
      elevation: 0,
      onClose: this.closePopover,
    };

    const cartButton = (
      <IconButton aria-label="cart" onClick={ this.openPopover }>
        <Badge
          badgeContent={ cartItemsQuantity }
          classes={ {
            colorPrimary: classes.badge,
            badge: cartItemsQuantity === 0 && classes.hideBadge,
          } }
          color="primary"
        >
          <CartIcon/>
        </Badge>
      </IconButton>
    );

    return (
      <div>
        { cartItemsQuantity === 0 ? (
          <Tooltip disableFocusListener placement="top" title="Cart is empty">
            { cartButton }
          </Tooltip>
        ) : cartButton }


        <Popover
          { ...popoverProps }
          className = {classes.popover}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 0, left: popoverPos.left }}
          style = {popoverStyles}
          PaperProps = {{classes: {root: classes.cartContent}}}
        >
          <PopoverDrop>
            <div className={`${open ? classes.cartFlyOutOpen : ''}`}></div>
            <CartDrop/>
          </PopoverDrop>
        </Popover>

       {/* <SprykerNotification
          message="Your product was added to your cart"
          extraClasses={ classes.cartNotification }
          isOpen={ isCartNotificationOpen }
          onClickClose={ this.handleCloseCartNotification }
          onClickOpen={ this.handleOpenCartNotification }
          vertical="top"
          horizontal="right"
        />*/}
      </div>
    );
  }
}

export const Cart = withStyles(styles)(CartComponent);
