import * as React from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { toast } from 'react-toastify';

import {styles} from '../styles';
import {IAddressItem} from '../../../../interfaces/addresses';
import {getAddressesAction, addAddressAction} from '../../../../actions/Pages/Addresses';

import {IAddressesState} from "../../../../reducers/Pages/Addresses";
import {ILoginState} from "../../../../reducers/Pages/Login";
import {getRouterLocation, getRouterHistoryPush} from "../../../../selectors/Common/router";
import {pathCustomerPage} from "../../../../routes/contentRoutes";
import {salutationVariants} from "../../../../constants/customer";
import {
  TCustomerFirstName,
  TCustomerLastName,
  TCustomerSalutation,
  TSalutationVariant
} from "../../../../interfaces/customer";

interface AddressFormProps extends WithStyles<typeof styles> {
  location: string;
  customer: string;
  addresses: Array<IAddressItem>;
  currentAddress: IAddressItem;
  isLoading: boolean;
  dispatch: Function;
  getAddressesList: Function;
  addAddress: Function;
  routerPush: Function;
}

interface AddressFormState extends IAddressItem {

}

export class AddressForm extends React.Component<AddressFormProps, AddressFormState> {

  public state: AddressFormState = {
    salutation: '',
    firstName: '',
    lastName: '',
    company: '',
    address1: '',
    address2: '',
    address3: '',
    zipCode: '',
    city: '',
    country: '',
    isDefaultShipping: true,
  };

  public handleChangeSalutation = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      salutation: event.target.value,
    });
  }

  public handleChange =  (event: any) => {
    const { name, value }: any = event.target;
    this.setState({
      ...this.state, [name]: value
    });
  }

  public handleCheckbox = (event: any, checked: boolean) => {
    console.info(event.target);
  }

  public render(): JSX.Element {
    const {classes, addresses, isLoading} = this.props;
    console.info(this.props);

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
            <form
              noValidate
              autoComplete="off"
              className={classes.addressForm}
              // onSubmit={this.handleSubmitForm}
            >
              <Grid container spacing={16}>
                <Grid item xs={12} sm={2}>
                  <TextField
                    required
                    fullWidth
                    select
                    label="Salutation"
                    name="salutation"
                    value={this.state.salutation}
                    onChange={this.handleChangeSalutation}
                  >
                    {salutationVariants.map((option: TSalutationVariant) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    required
                    fullWidth
                    label="First Name"
                    type="text"
                    value={this.state.firstName}
                    name="firstName"
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    required
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                  />
                </Grid>
              </Grid>
              <TextField
                fullWidth
                label="Company"
                name="company"
                value={this.state.company}
                onChange={this.handleChange}
                className={classes.textField}
              />
              <Grid container spacing={24}>
                <Grid item xs={10}>
                  <TextField
                    required
                    fullWidth
                    label="Street"
                    name="address1"
                    value={this.state.address1}
                    onChange={this.handleChange}
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    required
                    fullWidth
                    label="Number"
                    name="address2"
                    value={this.state.address2}
                    onChange={this.handleChange}
                    className={classes.textField}
                  />
                </Grid>
              </Grid>
              <TextField
                fullWidth
                label="Addition to address"
                name="address3"
                value={this.state.address3}
                onChange={this.handleChange}
                className={classes.textField}
              />
              <Grid container spacing={16}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    label="Zip Code"
                    name="zipCode"
                    value={this.state.zipCode}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    label="City"
                    name="city"
                    value={this.state.city}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    label="Country"
                    name="country"
                    value={this.state.country}
                    onChange={this.handleChange}
                  />
                </Grid>
              </Grid>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={this.state.phone}
                onChange={this.handleChange}
                className={classes.textField}
              />
              <Grid container spacing={24}>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.isDefaultShipping}
                        id="isDefaultShipping"
                        onChange={this.handleCheckbox}
                        color="primary"
                      />
                    }
                    label="Primary"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.isDefaultBilling}
                        id="isDefaultBilling"
                        onChange={this.handleCheckbox}
                        color="primary"
                      />
                    }
                    label="Primary"
                  />
                </Grid>
              </Grid>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </form>
          </Paper>
        </Grid>

      </Grid>
    );
  }
}

export const AddressFormPage = withStyles(styles)(AddressForm);
