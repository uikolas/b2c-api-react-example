import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import { styles } from './styles';
import { SquareImage } from 'src/shared/components/Common/SquareImage';
import { AppPrice } from 'src/shared/components/Common/AppPrice';
import { CartTotal } from 'src/shared/components/Common/CartTotal';
import { CustomerPageTitle } from 'src/shared/components/Common/CustomerPageTitle';
import { CartDataProps, CartDataState } from './types';
import { ICartItem } from 'src/shared/interfaces/cart';
import { priceTypeNameOriginal } from 'src/shared/interfaces/product';
import { FormattedMessage } from 'react-intl';

export class CartDataBase extends React.Component<CartDataProps, CartDataState> {
    private containerRef: React.RefObject<HTMLDivElement> = React.createRef();
    private designImgWidth: number = 0.33;

    public state: CartDataState = {
        heightListItem: 100,
    };

    public componentDidMount() {
        window.addEventListener('resize', this.setListItemHeight);
        this.setListItemHeight();
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this.setListItemHeight);
    }

    private setListItemHeight = () => {
        if (this.containerRef && this.containerRef.current) {
            this.setState({heightListItem: this.containerRef.current.offsetWidth * this.designImgWidth});
        }
    };

    public render() {
        const {classes, products, totals, order, isSendBtnDisabled, sendData} = this.props;

        const rows = products.map((item: ICartItem) => (
            <ListItem
                key={item.sku}
                disableGutters
                divider
                className={classes.listItem}
            >
                <SquareImage
                    image={item.image}
                    size={this.state.heightListItem}
                    alt={item.name}
                />
                <div className={classes.itemWrapper}>
                    <div className={classes.itemName}>{item.name}</div>
                    <AppPrice value={item.calculations.sumPriceToPayAggregation}
                        extraClassName={classes.priceAndQtyInfo}
                    />
                    {
                        item.calculations.sumPriceToPayAggregation !== item.calculations.sumGrossPrice
                            ? <AppPrice
                                value={item.calculations.sumGrossPrice}
                                extraClassName={`${classes.priceAndQtyInfo} ${classes.smallFont}`}
                                priceType={priceTypeNameOriginal}
                            />
                            : null
                    }
                    <div className={`${classes.priceAndQtyInfo} ${classes.marginTopQty}`}>
                        {`Quantity: ${item.quantity}`}
                    </div>
                </div>
            </ListItem>
        ));

        return (
            <div className={classes.root} ref={this.containerRef}>
                <CustomerPageTitle
                    title={order
                        ? <FormattedMessage id={'word.total.title'} />
                        : <FormattedMessage id={'word.cart.title'} /> }
                />
                <List>
                    {rows}
                </List>

                { order ? null : <CustomerPageTitle title={<FormattedMessage id={ 'word.total.title' } /> }/>}

                <CartTotal
                    totals={totals}
                    title={<FormattedMessage id={`${order ? 'order.amount' : 'grand.total.title'}`} /> }
                />

                {
                    order
                        ? null
                        : <Button
                            variant="contained"
                            color="primary"
                            disabled={isSendBtnDisabled}
                            fullWidth
                            className={classes.btnWrapper}
                            onClick={sendData}
                        >
                            {<FormattedMessage id={'place.order.title'} />}
                        </Button>
                }
            </div>
        );
    }
}

export const CartData = withStyles(styles)(CartDataBase);
