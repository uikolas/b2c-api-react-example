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

@(withRouter as any)
@connect
export class CartComponent extends React.PureComponent<Props, State> {
  public state: State = {
    anchorEl: null,
  };

  public componentDidUpdate(prevProps: any) {
    if (this.props.location !== prevProps.location) {
      this.closePopover();
    }
  }

  private openPopover = ({currentTarget}: ClickEvent) => {
    const { cartItemsQuantity } = this.props;

    if (window.innerWidth < 500) {
      if (cartItemsQuantity !== 0) {
        this.props.history.push(pathCartPage);
      }
    } else {
      this.setState(() => ({anchorEl: currentTarget}));
    }
  };
  private closePopover = () => this.setState(() => ({anchorEl: null}));

  public render() {
    const {anchorEl} = this.state;
    const {classes, cartItemsQuantity} = this.props;
    const open = Boolean(anchorEl);
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
        {cartItemsQuantity === 0 ? (
          <Tooltip disableFocusListener placement="top" title="Cart is empty">
            {cartButton}
          </Tooltip>
        ) : cartButton}

        <Popover
          { ...popoverProps }
          anchorOrigin={ {vertical: 'bottom', horizontal: 'center'} }
          transformOrigin={ {vertical: 'top', horizontal: 'center'} }
        >
          <PopoverDrop>
            <CartDrop/>
          </PopoverDrop>
        </Popover>
      </div>
    );
  }
}

export const Cart = withStyles(styles)(CartComponent);
