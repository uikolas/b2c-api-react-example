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
import BackIcon from '@material-ui/icons/ChevronLeft';
import { toast } from 'react-toastify';

import {styles} from '../styles';
import {IAddressItem} from '../../../../interfaces/addresses';
import {addAddressAction, updateAddressAction} from '../../../../actions/Pages/Addresses';

import {IAddressesState} from "../../../../reducers/Pages/Addresses";
import {ILoginState} from "../../../../reducers/Pages/Login";
import {getRouterHistoryBack} from "../../../../selectors/Common/router";
import {salutationVariants} from "../../../../constants/customer";
import {
  TSalutationVariant
} from "../../../../interfaces/customer";
import {emptyRequiredFieldsErrorText} from "../../../../constants/messages/errors";
import {reduxify} from "../../../../lib/redux-helper";

interface AddressFormProps extends WithStyles<typeof styles> {
  customer: string;
  currentAddress: IAddressItem;
  addAddress: Function;
  updateAddress: Function;
  routerGoBack: Function;
  dispatch: Function;
}

interface AddressFormState extends IAddressItem {
  submitted: boolean;
}

export class AddressForm extends React.Component<AddressFormProps, AddressFormState> {
  constructor(props: AddressFormProps) {
    super(props);

    this.state = {
      salutation: props.currentAddress ? props.currentAddress.salutation : '',
      firstName: props.currentAddress ? props.currentAddress.firstName : '',
      lastName: props.currentAddress ? props.currentAddress.lastName : '',
      company: props.currentAddress ? props.currentAddress.company || '' : '',
      address1: props.currentAddress ? props.currentAddress.address1 : '',
      address2: props.currentAddress ? props.currentAddress.address2 : '',
      address3: props.currentAddress ? props.currentAddress.address3 || '' : '',
      zipCode: props.currentAddress ? props.currentAddress.zipCode : '',
      city: props.currentAddress ? props.currentAddress.city : '',
      country: props.currentAddress ? props.currentAddress.country : '',
      phone: props.currentAddress ? props.currentAddress.phone || '' : '',
      isDefaultShipping: props.currentAddress ? props.currentAddress.isDefaultShipping : true,
      isDefaultBilling: props.currentAddress ? props.currentAddress.isDefaultBilling : true,
      submitted: false,
    };
  }

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
    isDefaultBilling: true,
    submitted: false,
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
    this.setState({
      ...this.state, [event.target.id]: checked
    });
  }

  public handleSubmitForm = (e: any) => {
    e.preventDefault();

    this.setState({submitted: true});

    if (
      !this.state.salutation
      || !this.state.firstName
      || !this.state.lastName
      || !this.state.address1
      || !this.state.address2
      || !this.state.zipCode
      || !this.state.city
      || !this.state.country
    ) {
      toast.warn(emptyRequiredFieldsErrorText);
      return;
    }

    const payload = {...this.state};
    delete payload.submitted;

    if (this.props.currentAddress) {
      this.props.updateAddress(this.props.currentAddress.id, this.props.customer, payload);
    } else {
      this.props.addAddress(payload, this.props.customer);
    }
  }

  public render(): JSX.Element {
    const {classes, currentAddress, routerGoBack} = this.props;

    return (
      <Grid container>

        <Grid item xs={12} container justify="center">
          <Typography
            variant="headline"
            children={`${currentAddress ? 'Add' : 'Edit'} Address Information`}
          />
        </Grid>

        <Grid item xs={12} container justify="center">
          <Paper elevation={4} className={classes.paperContainer}>
            <form
              noValidate
              autoComplete="off"
              className={classes.addressForm}
              onSubmit={this.handleSubmitForm}
            >
              <Grid container spacing={16}>
                <Grid item xs={12} sm={2}>
                  <TextField
                    required
                    error={this.state.submitted && !this.state.salutation}
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
                    error={this.state.submitted && !this.state.firstName}
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
                    error={this.state.submitted && !this.state.lastName}
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
                    error={this.state.submitted && !this.state.address1}
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
                    error={this.state.submitted && !this.state.address2}
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
                    error={this.state.submitted && !this.state.zipCode}
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
                    error={this.state.submitted && !this.state.city}
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
                    error={this.state.submitted && !this.state.country}
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
                    label="Is default shipping address"
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
                    label="Is default billing address"
                  />
                </Grid>
              </Grid>
              <Grid container justify="flex-end">
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.buttons}
                  onClick={() => routerGoBack()}
                >
                  <BackIcon />
                  <span>Back</span>
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.buttons}
                >
                  Submit
                </Button>
              </Grid>
            </form>
          </Paper>
        </Grid>

      </Grid>
    );
  }
}

export const AddressFormPageBase = withStyles(styles)(AddressForm);

export const AddressFormPage = reduxify(
  (state: any, ownProps: any) => {
    const routerGoBack = getRouterHistoryBack(state, ownProps);
    const customerProps: ILoginState = state.pagesLogin ? state.pagesLogin : null;
    const addressesProps: IAddressesState = state.pageAddresses ? state.pageAddresses : null;

    return (
      {
        customer: customerProps && customerProps.data ? customerProps.data.customerRef : ownProps.customer,
        currentAddress: addressesProps && addressesProps.data ? addressesProps.data.currentAddress : ownProps.currentAddress,
        routerGoBack,
      }
    );
  },
  (dispatch: Function) => ({
    dispatch,
    addAddress: (payload: IAddressItem, customerId: string) => dispatch(addAddressAction(payload, customerId)),
    updateAddress: (addressId: string, customerId: string, payload: any) => dispatch(updateAddressAction(addressId, customerId, payload)),
  })
)(AddressFormPageBase);

