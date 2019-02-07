import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import { AddressDetails } from '@components/components/AddressDetails';
import { IOrderAddressesProps } from './types';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export const OrderAddressesBase: React.SFC<IOrderAddressesProps> = props => {
    const {
        classes,
        billingAddress,
        shippingAddress,
        billingBlockTitle,
        shippingBlockTitle
    } = props;

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12}>
                <AddressDetails {...shippingAddress} blockTitle={shippingBlockTitle} />
                <AddressDetails {...billingAddress} blockTitle={billingBlockTitle} />
            </Grid>
        </Grid>
    );
};

export const OrderAddresses = withStyles(styles)(OrderAddressesBase);
