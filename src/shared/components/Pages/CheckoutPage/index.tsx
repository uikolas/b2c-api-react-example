import * as React from 'react';
import {FormEvent, ChangeEvent} from "react";

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import { connect } from './connect';
import { styles } from './styles';

import {AppBackdrop} from "src/shared/components/Common/AppBackdrop/index";
import {AppMain} from "src/shared/components/Common/AppMain/index";
import {CheckoutForms} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/index";
import {CartData} from "src/shared/components/Pages/CheckoutPage/CartData/index";
import {ICheckoutFieldInput, ICheckoutPageProps, ICheckoutPageState} from "./types";
import {CheckoutPageContext} from "./context";
import {IExtraAddressesOptions, TAddressType} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/types";
import {
  InputLabelAddNewBillingAddress, InputLabelAddNewDeliveryAddress,
  InputLabelSameAsCurrentDelivery
} from "src/shared/constants/forms/labels";


@connect
export class CheckoutPageBase extends React.Component<ICheckoutPageProps, ICheckoutPageState> {

  public state: ICheckoutPageState = {
    isBillingSameAsDelivery: false,
    selectedAddresses: {
      billingSelectedAddressId: null,
      deliverySelectedAddressId: null,
    },
    isAddNewBilling: false,
    isAddNewDelivery: false,
  };

  public componentDidMount() {
    console.info('%c ++ CheckoutPage componentDidMount ++', 'background: #3d5afe; color: #ffea00');
    this.initRequestAddressesData();
  }

  public componentDidUpdate = (prevProps: ICheckoutPageProps, prevState: ICheckoutPageState) => {
    console.info('%c -- CheckoutPage componentDidUpdate --', 'background: #4caf50; color: #cada55');
    this.initRequestAddressesData();
  }

  private initRequestAddressesData = (): void => {
    const {customerReference,
      addressesCollection,
      isAddressesLoading,
      isAddressesFulfilled,
      isAppStateLoading,
      isCartFulfilled,
    } = this.props;
    if (isAddressesLoading || isAddressesFulfilled || isAppStateLoading || !isCartFulfilled) {
      return;
    }
    if (customerReference && !addressesCollection) {
      this.props.getAddressesList(customerReference);
    }
  }

  public handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.info('handleSubmit ');
  }

  public handleInputChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>): void => {
    // {target: ICheckoutFieldInput}
    console.info('handleInputChange ');
    // const { name, value }: ICheckoutFieldInput = event.target;
    const { name, value } = event.target;
    console.info('handleInputChange target', event.target);
    console.info('handleInputChange name', event.target.name);
    console.info('handleInputChange value', event.target.value);

  }

  public handleBillingSameAsDelivery = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.info('handleBillingSameAsDelivery value', event.target.value);
    if (event.target.value !== "sameAsDelivery") {
      return;
    }
    this.setState( (prevState: ICheckoutPageState) => {
      return ({
        ...prevState,
        isBillingSameAsDelivery: !prevState.isBillingSameAsDelivery,
      });
    });
  }

  private getExtraAddressesOptions = (): IExtraAddressesOptions | null => {
    const response: IExtraAddressesOptions = {delivery: null, billing: null};

    if (this.props.addressesCollection) {
      response.delivery = [];
      response.billing = [];
      response.delivery.push({value: 'isAddNewDelivery', label: InputLabelAddNewDeliveryAddress});
      response.billing.push(
        {value: 'isAddNewBilling', label: InputLabelAddNewBillingAddress},
        {value: 'sameAsDelivery', label: InputLabelSameAsCurrentDelivery}
      );
    }

    if (!response.delivery && !response.billing) {
      return null;
    }

    return response;
  }

  public render(): JSX.Element {
    const {
      classes,
      isLoading,
      addressesCollection,
    } = this.props;

    console.info('CheckoutPage state: ', this.state);
    console.info('CheckoutPage props: ', this.props);
    console.info('products: ', this.props.products);

    return (
      <AppMain>
        {isLoading ? <AppBackdrop isOpen={true} /> : null}

        <CheckoutPageContext.Provider
          value={{
            submitHandler: this.handleSubmit,
            inputChangeHandler: this.handleInputChange,
            billingSameAsDeliveryHandler: this.handleBillingSameAsDelivery,
            isBillingSameAsDelivery: this.state.isBillingSameAsDelivery,
          }}
        >
          <Grid container className={classes.container}>
            <Grid item xs={12} md={7}>
              <CheckoutForms
                shippingAddress={{
                  firstName: 'firstName',
                  lastName: 'lastName',
                  salutation: 'Mr',
                  address1: 'address1 str',
                  address2: '37',
                  address3: '',
                  zipCode: '33222',
                  city: 'Bochum',
                  country: 'USA',
                  company: '',
                  phone: '+49 1234 5060',
                  iso2Code: 'RRR'
                }}
                billingAddress={{
                  firstName: 'billing firstName',
                  lastName: 'billing lastName',
                  salutation: 'Mr',
                  address1: 'address1 str billing',
                  address2: '32',
                  address3: '',
                  zipCode: '344422',
                  city: 'Bochum',
                  country: 'USA',
                  company: '',
                  phone: '+49 1234 5060',
                  iso2Code: 'RRR'
                }}
                addressesCollection={addressesCollection}
                selectedAddresses={this.state.selectedAddresses}
                extraAddressesOptions={this.getExtraAddressesOptions()}
                isAddNewBilling={this.state.isAddNewBilling}
                isAddNewDelivery={this.state.isAddNewDelivery}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <CartData />
            </Grid>
          </Grid>
        </CheckoutPageContext.Provider>

      </AppMain>
    );
  }
}

export const CheckoutPage = withStyles(styles)(CheckoutPageBase);
export default CheckoutPage;
