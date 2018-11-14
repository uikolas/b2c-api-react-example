import * as React from 'react';
import { toast } from 'react-toastify';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import BackIcon from '@material-ui/icons/ChevronLeft';

import { emptyRequiredFieldsErrorText } from 'src/shared/constants/messages/errors';
import { BasicInformationForm } from './parts/BasicInformationForm';
import { AddressInformationForm } from './parts/AddressInformationForm';
import { styles } from '../styles';
import { AddressFormProps as Props, AddressFormState as State } from './types';
import { connect } from './connect';

@connect
export class AddressForm extends React.Component<Props, State> {
  constructor(props: Props) {
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
      iso2Code: props.currentAddress ? props.currentAddress.iso2Code : '',
      phone: props.currentAddress ? props.currentAddress.phone || '' : '',
      isDefaultShipping: props.currentAddress ? props.currentAddress.isDefaultShipping : true,
      isDefaultBilling: props.currentAddress ? props.currentAddress.isDefaultBilling : true,
      submitted: false,
    };
  }

  public handleChangeSalutation = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => this.setState(() => ({salutation: event.target.value}));
  public handleChangeCountry = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => this.setState(() => ({iso2Code: event.target.value}));
  public handleChange = ({target: {name, value}}: any) => this.setState(state => ({...state, [name]: value}));
  public handleCheckbox = (
    event: any, checked: boolean,
  ) => this.setState(state => ({...state, [event.target.id]: checked}));
  public handleSubmitForm = (e: any) => {
    e.preventDefault();
    const {salutation, firstName, lastName, address1, address2, zipCode, city, iso2Code} = this.state;

    this.setState(() => ({submitted: true}));

    if (!salutation || firstName || lastName || address1 || address2 || zipCode || city || iso2Code) {
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
  };

  public render(): JSX.Element {
    const {classes, currentAddress, countries, routerGoBack} = this.props;
    const {submitted, salutation, firstName, lastName, iso2Code, zipCode, city} = this.state;
    const pageTitle = `${currentAddress ? 'Edit' : 'Add'} Address Information`;
    const basicInformationFormProps = {submitted, salutation, firstName, lastName, handleChange: this.handleChange};
    const addressInformationForm = {zipCode, submitted, city, iso2Code, countries};

    return (
      <Grid container>
        <Grid item xs={ 12 } container justify="center">
          <Typography variant="headline" children={ pageTitle }/>
        </Grid>
        <Grid item xs={ 12 } container justify="center">
          <Paper elevation={ 4 } className={ classes.paperContainer }>
            <form noValidate autoComplete="off" className={ classes.addressForm } onSubmit={ this.handleSubmitForm }>
              <BasicInformationForm { ...basicInformationFormProps }/>
              <TextField
                fullWidth
                label="Company"
                name="company"
                value={ this.state.company }
                onChange={ this.handleChange }
                className={ classes.textField }
              />
              <Grid container spacing={ 24 }>
                <Grid item xs={ 10 }>
                  <TextField
                    required
                    error={ this.state.submitted && !this.state.address1 }
                    fullWidth
                    label="Street"
                    name="address1"
                    value={ this.state.address1 }
                    onChange={ this.handleChange }
                    className={ classes.textField }
                  />
                </Grid>
                <Grid item xs={ 2 }>
                  <TextField
                    required
                    error={ this.state.submitted && !this.state.address2 }
                    fullWidth
                    label="Number"
                    name="address2"
                    value={ this.state.address2 }
                    onChange={ this.handleChange }
                    className={ classes.textField }
                  />
                </Grid>
              </Grid>
              <TextField
                fullWidth
                label="Addition to address"
                name="address3"
                value={ this.state.address3 }
                onChange={ this.handleChange }
                className={ classes.textField }
              />
              <AddressInformationForm
                { ...addressInformationForm }
                handleChange={ this.handleChange }
                handleChangeCountry={ this.handleChangeCountry }
              />
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={ this.state.phone }
                onChange={ this.handleChange }
                className={ classes.textField }
              />
              <Grid container spacing={ 24 }>
                <Grid item xs={ 6 }>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={ this.state.isDefaultShipping }
                        id="isDefaultShipping"
                        onChange={ this.handleCheckbox }
                        color="primary"
                      />
                    }
                    label="Is default shipping address"
                  />
                </Grid>
                <Grid item xs={ 6 }>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={ this.state.isDefaultBilling }
                        id="isDefaultBilling"
                        onChange={ this.handleCheckbox }
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
                  className={ classes.buttons }
                  onClick={ () => routerGoBack() }
                >
                  <BackIcon/>
                  <span>Back</span>
                </Button>
                <Button type="submit" variant="contained" color="primary" className={ classes.buttons }>Submit</Button>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export const AddressFormPage = withStyles(styles)(AddressForm);
