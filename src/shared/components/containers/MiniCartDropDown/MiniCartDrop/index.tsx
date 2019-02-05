import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { pathCartPage, pathCheckoutPage } from 'src/shared/routes/contentRoutes';
import { AppPrice } from 'src/shared/components/Common/AppPrice';
import { MiniCartItem } from '../MiniCartItem';
import { MiniCartDropProps as Props } from './types';
import { styles } from './styles';
import { connect } from './connect';
import { AppBtnLink } from 'src/shared/components/Common/AppBtnLink';
import { FormattedMessage } from 'react-intl';

@connect
export class MiniCartDropComponent extends React.Component<Props> {
    private deleteFromCart = (cartItemId: string) => {
        const {cartDeleteItemAction, removeItemGuestCartAction, cartId, anonymId, isUserLoggedIn} = this.props;

        if (isUserLoggedIn) {
            cartDeleteItemAction(cartId, cartItemId);
        } else {
            removeItemGuestCartAction(cartId, cartItemId, anonymId);
        }
    };

    public render() {
        const {classes, cartItems, totals} = this.props;

        return (
            <div className={classes.cartDrop}>
                <Typography gutterBottom component="h3" className={classes.title}>
                    <FormattedMessage id={'word.cart.title'} />
                </Typography>

                <ul className={classes.cartDropProductsList}>
                    {cartItems.map(cartItem => (
                        <li key={cartItem.sku}>
                            <MiniCartItem productData={cartItem} deleteItem={this.deleteFromCart} />
                        </li>
                    ))}
                </ul>

                <div className={classes.cartTotalContainer}>
                    {(totals.discountTotal && totals.discountTotal > 0) &&
                        <div className={classes.cartTotal}>
                            <Typography component="h5" className={classes.fontTotal}>
                                <FormattedMessage id={'word.discount.title'} />
                            </Typography>
                            <AppPrice
                                value={totals.discountTotal}
                                isMinus
                                extraClassName={classes.fontTotal}
                            />
                        </div>
                    }
                    <div className={classes.cartTotal}>
                        <Typography component="h5" className={classes.fontTotal}>
                            <FormattedMessage id={'word.total.title'} />
                        </Typography>
                        <AppPrice
                            value={totals.grandTotal}
                            extraClassName={classes.fontTotal}
                        />
                    </div>
                </div>

                <div className={classes.cartBtns}>
                    <AppBtnLink
                        title={<FormattedMessage id={'word.cart.title'} />}
                        path={pathCartPage}
                        extraClassName={classes.action}
                    />
                    <AppBtnLink
                        title={<FormattedMessage id={'word.checkout.title'} />}
                        path={pathCheckoutPage}
                        type="black"
                        extraClassName={classes.action}
                    />
                </div>
            </div>
        );
    }
}

export const MiniCartDrop = withStyles(styles)(MiniCartDropComponent);
