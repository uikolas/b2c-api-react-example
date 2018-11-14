import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { reduxify } from 'src/shared/lib/redux-helper';
import { deleteAddressAction, getAddressesAction, setCurrentAddressAction } from 'src/shared/actions/Pages/Addresses';
import { IAddressesState } from 'src/shared/reducers/Pages/Addresses';
import { ILoginState } from 'src/shared/reducers/Pages/Login';
import { getRouterHistoryPush, getRouterLocation } from 'src/shared/selectors/Common/router';
import { pathCustomerAddressesPage } from 'src/shared/routes/contentRoutes';

import { styles } from './styles';
import { CustomerAddressPageProps as Props, CustomerAddressPageState as State } from './types';

export class CustomerAddressBase extends React.Component<Props, State> {
  public state: State = {};

  public componentDidMount() {
    if (this.props.customer) {
      this.props.getAddressesList(this.props.customer);
    }
  }

  public handleAddAddress = () => {
    this.props.routerPush(`${pathCustomerAddressesPage}/new`);
  };

  public setUpdatedAddress = (addressId: string) => (e: any) => {
    this.props.dispatch(setCurrentAddressAction(addressId));
    this.props.routerPush(`${pathCustomerAddressesPage}/update`);
  };

  public render(): JSX.Element {
    const {classes, addresses, isLoading, deleteAddress} = this.props;

    const rows: any[] = addresses.map((item: any) => (
      <TableRow
        hover
        key={ item.id }
      >
        <TableCell component="th" scope="row">
          <div className={ classes.customerName }>{ `${item.salutation} ${item.firstName} ${item.lastName}` }</div>
          <div>{ `${item.company || ''}` }</div>
          <div>{ `${item.address1} ${item.address2} ${item.address3}` }</div>
          <div>{ `${item.zipCode} ${item.city}, ${item.country}` }</div>
          <div>{ `${item.phone || ''}` }</div>
          <div className={ classes.chips }>
            {
              item.isDefaultShipping
                ? <Chip
                  label="Shipping address"
                  color="primary"
                  variant="outlined"
                  className={ classes.marginRight }
                />
                : null
            }
            {
              item.isDefaultBilling
                ? <Chip
                  label="Billing address"
                  color="primary"
                  variant="outlined"
                />
                : null
            }

          </div>
        </TableCell>

        <TableCell padding="checkbox">
          <IconButton
            color="primary"
            onClick={ this.setUpdatedAddress(item.id) }
            disabled={ isLoading }
          >
            <EditIcon/>
          </IconButton>
        </TableCell>
        <TableCell padding="checkbox">
          <IconButton
            color="primary"
            onClick={ () => deleteAddress(item.id, this.props.customer) }
            disabled={ isLoading }
          >
            <DeleteIcon/>
          </IconButton>
        </TableCell>
      </TableRow>
    ));

    return (
      <Grid container>

        <Grid item xs={ 12 } container justify="center">
          <Typography
            variant="headline"
            children="Manage Addresses"
          />
        </Grid>

        <Grid item xs={ 12 } container justify="center">
          <Paper elevation={ 4 } className={ classes.paperContainer }>
            <Button variant="contained" color="primary" className={ classes.addButton }
                    onClick={ this.handleAddAddress }>
              Add new address
            </Button>
            <Divider/>
            <Table>
              <TableBody>
                { rows }
              </TableBody>
            </Table>
          </Paper>
        </Grid>

      </Grid>
    );
  }
}

export const CustomerAddress = withStyles(styles)(CustomerAddressBase);

export const CustomerAddressPage = reduxify(
  (state: any, ownProps: any) => {
    const location = getRouterLocation(state, ownProps);
    const routerPush = getRouterHistoryPush(state, ownProps);
    const customerProps: ILoginState = state.pagesLogin ? state.pagesLogin : null;
    const addressesProps: IAddressesState = state.pageAddresses ? state.pageAddresses : null;

    return ({
      customer: customerProps && customerProps.data ? customerProps.data.customerRef : ownProps.customer,
      addresses: addressesProps && addressesProps.data ? addressesProps.data.addresses : ownProps.addresses,
      currentAddress: addressesProps && addressesProps.data
        ? addressesProps.data.currentAddress
        : ownProps.currentAddress,
      isInitial: addressesProps && addressesProps.data ? addressesProps.data.isInitial : ownProps.isInitial,
      isLoading: addressesProps ? addressesProps.pending : ownProps.isLoading,
      location,
      routerPush,
    });
  },
  (dispatch: Function) => ({
    dispatch,
    getAddressesList: (customerId: string) => dispatch(getAddressesAction(customerId)),
    deleteAddress: (addressId: string, customerId: string) => dispatch(deleteAddressAction(addressId, customerId)),
  }),
)(CustomerAddress);
