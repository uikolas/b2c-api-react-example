import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from './connect';
import { CartRowsProps, CartRowsState } from './types';
import { createCartItemAddToCart } from '@helpers/cart/item';
import { List, Divider } from '@material-ui/core';
import { ICartItem } from '@interfaces/cart';
import { CartItem } from '../../components/cartItem';

import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

@connect
export class CartRowsComponent extends React.Component<CartRowsProps, CartRowsState> {
    private listRef: React.RefObject<HTMLDivElement> = React.createRef();
    private designImgWidth: number = 0.2;

    public state: CartRowsState = {
        heightListItem: 129
    };

    public componentDidMount() {
        window.addEventListener('resize', this.setListItemHeight);
        this.setListItemHeight();
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this.setListItemHeight);
    }

    public componentDidUpdate() {
        this.setListItemHeight();
    }

    private setListItemHeight = () => {
        if (this.listRef
            && this.listRef.current
            && Math.floor(
                this.listRef.current.offsetWidth * this.designImgWidth
            ) !== Math.floor(this.state.heightListItem)
        ) {
            this.setState({heightListItem: this.listRef.current.offsetWidth * this.designImgWidth});
        }
    };

    public handleDeleteItem = (sku: string) => {
        const {cartDeleteItemAction, removeItemGuestCartAction, cartId, isUserLoggedIn, anonymId} = this.props;

        if (isUserLoggedIn) {
            cartDeleteItemAction(cartId, sku);
        } else {
            removeItemGuestCartAction(cartId, sku, anonymId);
        }
    };

    public handleChangeQty = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value}: { name: string, value: string } = event.target;
        const {
            cartId,
            isUserLoggedIn,
            anonymId,
            cartDeleteItemAction,
            removeItemGuestCartAction,
            updateItemInCartAction,
            updateGuestCartAction
        } = this.props;
        // If is selected 0, the cart item should be removed from the cart
        if (Number(value) <= 0) {
            if (isUserLoggedIn) {
                cartDeleteItemAction(cartId, name);
            } else {
                removeItemGuestCartAction(cartId, name, anonymId);
            }
        } else {
            if (isUserLoggedIn) {
                updateItemInCartAction(
                    createCartItemAddToCart(name, +value),
                    this.props.cartId,
                );
            } else {
                updateGuestCartAction(
                    createCartItemAddToCart(name, +value),
                    this.props.cartId,
                    anonymId,
                );
            }
        }
    };

    public render() {
        const { classes, items } = this.props;

        return (
            <>
                <div className={ classes.listTitle } ref={ this.listRef }>
                    <div style={ { width: '20%' } }>
                        <FormattedMessage id={ 'word.items.title' } />
                    </div>
                    <div className={ classes.itemWrapper } />
                    <div className={ classes.quantityForm }>
                        <FormattedMessage id={ 'word.quantity.title' } />
                    </div>
                    <div className={ classes.priceWrapper }>
                        <FormattedMessage id={ 'word.price.title' } />
                    </div>
                </div>

                <Divider style={ { width: '100%' } } />

                <List>
                    { items.map((cartItem: ICartItem) => {
                        const quantities: number[] = [];
                        const maxItems = cartItem.availableQuantity < 10 ? cartItem.availableQuantity : 10;

                        for (let i = 0; i <= maxItems; i++) {
                            quantities.push(i);
                        }

                        return (
                            <CartItem
                                key={ cartItem.sku }
                                quantities={ quantities }
                                heightListItem={ this.state.heightListItem }
                                handleDeleteItem={ this.handleDeleteItem }
                                handleChangeQty={ this.handleChangeQty }
                                parentClasses={ classes }
                                { ...cartItem }
                            />
                        );
                    }) }
                </List>
            </>
        );
    }
}

export const CartRows = withStyles(styles)(CartRowsComponent);
