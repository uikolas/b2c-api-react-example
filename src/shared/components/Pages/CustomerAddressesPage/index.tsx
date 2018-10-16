import * as React from "react";
import {RouteProps} from "react-router";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { push } from 'react-router-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

import {reduxify} from '../../../lib/redux-helper';
import {styles} from './styles';
import {IAddressItem} from '../../../interfaces/addresses';
import {getAddressesAction, addAddressAction} from '../../../actions/Pages/Addresses';

import {isAppInitiated} from "../../../reducers/Common/Init";
import {isUserAuthenticated} from "../../../reducers/Pages/Login";
import {getRouterLocation, getRouterHistoryPush} from "../../../selectors/Common/router";

interface CustomerAddressPageProps extends WithStyles<typeof styles>, RouteProps {
  dispatch: Function;
  getAddressesList: Function;
  addAddress: Function;
}

interface CustomerAddressPageState {

}

export class CustomerAddressBase extends React.Component<CustomerAddressPageProps, CustomerAddressPageState> {

  public state: CustomerAddressPageState = {

  };

  public componentDidMount() {
    this.props.getAddressesList('DE--8');
  }

  public handleAddAddress = () => {
   // this.props.dispatch(push('/'));
    const payload = {
      salutation: 'Mr',
      firstName: 'Fname',
      lastName: 'Lname',
      address1: 'XXX',
      address2: 'street',
      address3: '162',
      zipCode: '61000',
      city: 'Kh',
      country: 'Ukr',
    };
    this.props.addAddress(payload, 'DE--8');
  }


  public render(): JSX.Element {
    const {classes} = this.props;

    return (
      <Grid container>

        <Grid item xs={12} container justify="center">
          <Typography
            variant="headline"
            children="Manage Addresses"
          />
        </Grid>

        <Grid item xs={12} container justify="center">
          <Paper elevation={4} className={classes.paperContainer}>
            <Button variant="contained" color="primary" onClick={this.handleAddAddress}>
              Add new address
            </Button>
            <Divider />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.headerCell}>Name</TableCell>
                  <TableCell className={classes.headerCell}># of items</TableCell>
                  <TableCell className={classes.headerCell}>Date of creation</TableCell>
                  <TableCell numeric></TableCell>
                  <TableCell numeric></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

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


    return ({
      location,
    });
  },
  (dispatch: Function) => ({
    dispatch,
    getAddressesList: (customerId: string) => dispatch(getAddressesAction(customerId)),
    addAddress: (payload: IAddressItem, customerId: string) => dispatch(addAddressAction(payload, customerId)),
  })
)(CustomerAddress);
