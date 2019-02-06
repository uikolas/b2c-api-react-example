import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { AddressesListProps } from './types';
import { IAddressItem } from '@interfaces/addresses';

import { Chip, Button, Divider, withStyles } from '@material-ui/core';
import { styles } from './styles';

export const AddressesListBase: React.SFC<AddressesListProps> = (props): JSX.Element => {
    const {
        classes,
        isLoading,
        customer,
        customerAddresses,
        updatedAddressHandler,
        deleteAddressHandler
    } = props;

    return (
        <>
            { customerAddresses.map((item: IAddressItem) => (
                <div key={ item.id || item.zipCode } className={ classes.addressData }>
                    <div>{ `${item.salutation} ${item.firstName} ${item.lastName},` }</div>
                    <div>{ `${item.company || ''}` }</div>
                    <div>{ `${item.address1} ${item.address2} ${item.address3},` }</div>
                    <div>{ `${item.city} ${item.zipCode},` }</div>
                    <div>{ `${item.country}` }</div>
                    <div>{ `${item.phone || ''}` }</div>
                    <div className={ classes.btnRow }>
                        <div>
                            {
                                item.isDefaultShipping
                                    ? <Chip
                                        label={ <FormattedMessage id={ 'shipping.address.title' } /> }
                                        variant="outlined"
                                        className={ classes.chips }
                                    />
                                    : null
                            }
                            {
                                item.isDefaultBilling
                                    ? <Chip
                                        label={ <FormattedMessage id={ 'billing.address.title' } /> }
                                        variant="outlined"
                                        className={ classes.chips }
                                    />
                                    : null
                            }
                        </div>
                        <div>
                            <Button
                                color="primary"
                                onClick={ updatedAddressHandler(item.id) }
                                disabled={ isLoading }
                            >
                                Edit
                            </Button>
                            <Button
                                color="primary"
                                onClick={ () => deleteAddressHandler(item.id, customer) }
                                disabled={ isLoading }
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                    <Divider />
                </div>
            )) }
        </>
    );
};

export const AddressesList = withStyles(styles)(AddressesListBase);
