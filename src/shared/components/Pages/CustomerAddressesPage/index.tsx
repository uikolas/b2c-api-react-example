import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import { ClickEvent } from 'src/shared/interfaces/common/react';
import { CustomerPageTitle } from 'src/shared/components/Common/CustomerPageTitle';
import { SprykerButton } from 'src/shared/components/UI/SprykerButton';
import { pathAddressFormNew, pathAddressFormUpdateBase } from 'src/shared/routes/contentRoutes';
import { IAddressItem } from 'src/shared/interfaces/addresses';
import { styles } from './styles';
import { connect } from './connect';
import { CustomerAddressPageProps as Props, CustomerAddressPageState as State } from './types';
import { FormattedMessage } from 'react-intl';

@connect
export class CustomerAddressBase extends React.Component<Props, State> {
    public state: State = {};

    public componentDidMount() {
        this.props.setCurrentAddressAction(null);

         this.initRequestData();
    }

    public handleAddAddress = () => {
        this.props.routerPush(pathAddressFormNew);
    };

    public setUpdatedAddress = (addressId: string) => (e: ClickEvent) => {
        this.props.setCurrentAddressAction(addressId);
        this.props.routerPush(`${pathAddressFormUpdateBase}/${addressId}`);
    };

    private initRequestData = () => {
        const {addresses, isLoading, customer} = this.props;
        if (isLoading) { return; }

        if ((addresses && Array.isArray(addresses) && !addresses.length) && customer) {
            this.props.getAddressesAction(customer);
        }
    };

    public render(): JSX.Element {
        const {classes, addresses, isLoading, deleteAddressAction} = this.props;

        const rows = addresses.map((item: IAddressItem) => (
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
                            onClick={ this.setUpdatedAddress(item.id) }
                            disabled={ isLoading }
                        >
                            Edit
                        </Button>
                        <Button
                            color="primary"
                            onClick={ () => deleteAddressAction(item.id, this.props.customer) }
                            disabled={ isLoading }
                        >
                            Delete
                        </Button>
                    </div>
                </div>
                <Divider />
            </div>
        ));

        return (
            <Grid container>
                <Grid item xs={ 12 }>
                    <CustomerPageTitle title={ <FormattedMessage id={ 'manage.addresses' } /> } />

                    { addresses.length ? null : <div className={ classes.emptyMsg }>
                        <FormattedMessage id={ 'empty.address.message' } />
                    </div> }
                </Grid>

                <Grid item xs={12}>
                    {rows}
                </Grid>

                <Grid item xs={ 12 } sm={ 3 } className={ classes.addButton }>
                    <SprykerButton
                        title={ <FormattedMessage id={ 'add.address.title' } /> }
                        onClick={ this.handleAddAddress }
                        disabled={ isLoading }
                    />
                </Grid>

            </Grid>
        );
    }
}

export const CustomerAddressPage = withStyles(styles)(CustomerAddressBase);

export default CustomerAddressPage;
