import * as React from 'react';
import { toast } from 'react-toastify';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { emptyRequiredFieldsErrorText } from 'src/shared/constants/messages/errors';
import { CustomerPageTitle } from 'src/shared/components/Common/CustomerPageTitle';
import { SprykerButton } from 'src/shared/components/UI/SprykerButton';
import { SprykerForm } from 'src/shared/components/UI/SprykerForm';
import {
  InputLabelFirstName,
  InputLabelLastName,
  InputLabelSalutation,
  InputLabelCompany,
  InputLabelStreet,
  InputLabelNumber,
  InputLabelStreetExtra,
  InputLabelCity,
  InputLabelZipCode,
  InputLabelCountry,
  InputLabelPhone,
  InputLabelDefaultDeliveryAddress,
  InputLabelDefaultShippingAddress,
} from "src/shared/constants/forms/labels";
import { salutationVariants } from "src/shared/constants/customer";
import { TSalutationVariant } from "src/shared/interfaces/customer";
import { ICountries } from "src/shared/reducers/Common/Init";

import { styles } from '../styles';
import { AddressFormProps as Props, AddressFormState as State } from './types';
import { connect } from './connect';
import { setFormFields } from './settings';

interface IFieldInput {
  name: string;
  value: string;
}


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

  public handleChange = (event: {target: IFieldInput}): void => {
    const {name, value}: IFieldInput = event.target;
    this.setState(state => ({...state, [name]: value}));
    console.info(name, value);
  };

  public handleCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>, checked: boolean,
  ) => {
    console.info(event.target);
    // this.setState(state => ({...state, [event.target.id]: checked}));
  }

  public handleSubmitForm = (e: any) => {
    e.preventDefault();
    const {salutation, firstName, lastName, address1, address2, zipCode, city, iso2Code} = this.state;
    this.setState(() => ({submitted: true}));

    if (!salutation || !firstName || !lastName || !address1 || !address2 || !zipCode || !city || !iso2Code) {
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
    const { classes, currentAddress, countries, routerGoBack, isLoading } = this.props;

    const {
      salutation,
      firstName,
      lastName,
      company,
      address1,
      address2,
      address3,
      zipCode,
      city,
      iso2Code,
      phone,
      isDefaultShipping,
      isDefaultBilling,
      submitted,
    } = this.state;

    const pageTitle = `${currentAddress ? 'Edit' : 'Add New'} Address`;
    const currentState = { ...this.state };
    delete currentState.submitted;

    return (
      <Grid container>
        <Grid item xs={ 12 }>
          <CustomerPageTitle title={ pageTitle } />
        </Grid>

        <Grid item xs={ 9 }>
          <SprykerForm
            form={{
              formName: 'addressForm',
              onChangeHandler: this.handleChange,
              onSubmitHandler: this.handleSubmitForm,
              fields: setFormFields(currentState, countries),
            }}
            SubmitButton={
              <Grid container>
                <Grid item xs={12} sm={4}>
                  <SprykerButton title="save" btnType="submit"
                                 extraClasses={classes.addButton} disabled={ isLoading } />
                </Grid>
              </Grid>
            }
          />
        </Grid>
        <Grid item xs={ 12 }>
          <Button
            color="primary"
            onClick={ () => routerGoBack() }
            disabled={ isLoading }
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export const AddressFormPage = withStyles(styles)(AddressForm);
