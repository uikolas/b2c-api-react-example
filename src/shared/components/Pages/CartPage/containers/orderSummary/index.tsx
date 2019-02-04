import * as React from 'react';
import { connect } from './connect';
import { NavLink } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button/Button';
import Typography from '@material-ui/core/Typography/Typography';
import { pathCheckoutPage } from '@routes/contentRoutes';
import { styles } from './styles';
import { OrderSummaryProps, OrderSummaryState } from './types';
import { CartTotal } from '@components/Common/CartTotal';
import { FormattedMessage } from 'react-intl';

@connect
export class OrderSummaryComponent extends React.Component<OrderSummaryProps, OrderSummaryState> {
    public state: OrderSummaryState = {
        voucherCode: '',
    };

    public handleChangeVouchercode = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({voucherCode: e.target.value});
    };

    public render() {
        const { classes, totals } = this.props;

        return (
            <>
                <Typography
                    variant="display1"
                    noWrap
                    align="left"
                    color="primary"
                >
                    <FormattedMessage id={'word.total.title'} />
                </Typography>

                <CartTotal
                    extraClass={classes.cartTotalIndent}
                    totals={totals}
                    title={<FormattedMessage id={ 'grand.total.title' } />}
                />

                <NavLink
                    to={pathCheckoutPage}
                    style={
                        {
                            textDecoration: 'none',
                            width: '100%'
                        }
                    }
                >
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={classes.btnWrapper}
                    >
                        <FormattedMessage id={'continue.checkout.title'} />
                    </Button>
                </NavLink>
            </>
        );
    }
}

export const OrderSummary = withStyles(styles)(OrderSummaryComponent);
