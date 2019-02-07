import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';

import { CartRowsProps, CartRowsState } from './types';
import { ICartItem } from '@interfaces/cart';

import { createCartItemAddToCart } from '@helpers/cart/item';

import { CartItem } from '../../components/cartItem';

import { List, Divider, withStyles } from '@material-ui/core';
import { styles } from './styles';

@connect
export class CartRowsComponent extends React.Component<CartRowsProps, CartRowsState> {
    protected listRef: React.RefObject<HTMLDivElement> = React.createRef();
    protected designImgWidth: number = 0.2;

    readonly state: CartRowsState = {
        heightListItem: 129
    };

    public componentDidMount = (): void => {
        window.addEventListener('resize', this.setListItemHeight);
        this.setListItemHeight();
    };

    public componentWillUnmount = (): void => {
        window.removeEventListener('resize', this.setListItemHeight);
    };

    public componentDidUpdate = (): void => {
        this.setListItemHeight();
    };

    protected setListItemHeight = (): void => {
        if (this.listRef
            && this.listRef.current
            && Math.floor(
                this.listRef.current.offsetWidth * this.designImgWidth
            ) !== Math.floor(this.state.heightListItem)
        ) {
            this.setState({heightListItem: this.listRef.current.offsetWidth * this.designImgWidth});
        }
    };

    protected handleDeleteItem = (sku: string): void => {
        const {cartDeleteItemAction, removeItemGuestCartAction, cartId, isUserLoggedIn, anonymId} = this.props;

        if (isUserLoggedIn) {
            cartDeleteItemAction(cartId, sku);
        } else {
            removeItemGuestCartAction(cartId, sku, anonymId);
        }
    };

    protected handleChangeQty = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
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

    public render = (): JSX.Element => {
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
