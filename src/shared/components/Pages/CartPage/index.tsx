import * as React from 'react';
import { ErrorBoundary } from '@components/Library/ErrorBoundary';
import { FormattedPlural, FormattedMessage } from 'react-intl';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { AppMain } from 'src/shared/components/Common/AppMain';
import { CartRows } from './containers/cartRows';
import { OrderSummary } from './containers/orderSummary';
import { styles } from './styles';
import { connect } from './connect';
import { CartPageProps } from './types';

@connect
export class CartPageBase extends React.Component<CartPageProps> {
    public render() {
        const {classes, isCartEmpty, isUserLoggedIn, totalQty} = this.props;

        if (isCartEmpty) {
            return (
                <AppMain>
                    <Grid item xs={12} className={ classes.emptyCart }>
                        <Typography
                            variant="display2"
                            noWrap
                            align="center"
                        >
                            <FormattedMessage id={'cart.is.empty.message'} />
                        </Typography>
                    </Grid>
                </AppMain>
            );
        }

        return (
            <AppMain>
                <Grid item xs={ 12 } container spacing={ 24 } className={ classes.root }>
                    <Grid item xs={ 12 } md={ 8 }>
                        <Typography
                            variant="display1"
                            noWrap
                            align="left"
                            color="primary"
                        >
                            <FormattedMessage
                                id={ `${isUserLoggedIn ? 'cart.with.items.title' : 'cart.quest.with.items.title'}` }
                                values={{ items: totalQty }}
                            />

                            <span>
                                { ` - ${totalQty} ` }
                            </span>

                            <FormattedPlural
                                value={ totalQty }
                                one={ <FormattedMessage id={ 'word.item.title' } /> }
                                other={ <FormattedMessage id={ 'word.items.title' } /> }
                            />
                        </Typography>

                        <ErrorBoundary>
                            <CartRows />
                        </ErrorBoundary>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <ErrorBoundary>
                            <OrderSummary />
                        </ErrorBoundary>
                    </Grid>
                </Grid>
            </AppMain>
        );
    }
}

export const CartPage = withStyles(styles)(CartPageBase);
export default CartPage;
