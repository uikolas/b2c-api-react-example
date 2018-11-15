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
import {getExtraAddressesOptions} from "src/shared/components/Pages/CheckoutPage/helpers";


@connect
export class CheckoutPageBase extends React.Component<ICheckoutPageProps, ICheckoutPageState> {

  public state: ICheckoutPageState = {
    deliverySelection: {
      selectedAddressId: null,
      isAddNew: false,
    },
    billingSelection: {
      selectedAddressId: null,
      isAddNew: false,
      isSameAsDelivery: false,
    }
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
    // const { name, value }: ICheckoutFieldInput = event.target;
    const { name, value } = event.target;
    console.info('handleInputChange name', event.target.name);
    console.info('handleInputChange value', event.target.value);
    if (name === 'deliverySelection') {
      this.handleDeliverySelection(event.target.name, event.target.value);
    } else if (name === 'billingSelection' || name === 'sameAsDelivery') {
      this.handleBillingSelection(event.target.name, event.target.value);
    }

  }

  private handleDeliverySelection = (name: string, value: string): boolean => {
    console.info('handleDeliverySelection name', name);
    console.info('handleDeliverySelection value', value);

    if (value === 'isAddNewDelivery') {
      this.setState( (prevState: ICheckoutPageState) => {
        return ({
          deliverySelection: {
            selectedAddressId: null,
            isAddNew: true,
          }
        });
      });
      return true;
    } else {
      this.setState( (prevState: ICheckoutPageState) => {
        return ({
          deliverySelection: {
            selectedAddressId: value,
            isAddNew: false,
          }
        });
      });
      return true;
    }
    return false;
  }

  private handleBillingSelection = (name: string, value: string): boolean => {
    console.info('handleBillingSelection name', name);
    console.info('handleBillingSelection value', value);

    if (value === 'isAddNewBilling') {
      this.setState( (prevState: ICheckoutPageState) => {
        return ({
          billingSelection: {
            selectedAddressId: null,
            isAddNew: true,
            isSameAsDelivery: false,
          }
        });
      });
      return true;
    } else if (value === 'sameAsDelivery') {
      this.setState( (prevState: ICheckoutPageState) => {
        const newSameValue = !prevState.billingSelection.isSameAsDelivery;
        return ({
          billingSelection: {
            selectedAddressId: null,
            isAddNew: newSameValue ? false : true,
            isSameAsDelivery: newSameValue,
          }
        });
      });
      return true;
    } else {
      this.setState( (prevState: ICheckoutPageState) => {
        return ({
          billingSelection: {
            selectedAddressId: value,
            isAddNew: false,
            isSameAsDelivery: false,
          }
        });
      });
      return true;
    }
    return false;
  }

  public render(): JSX.Element {
    const {
      classes,
      isLoading,
      products,
      totals,
      addressesCollection,
      isAddressesLoading,
      isAddressesFulfilled,
      isUserLoggedIn,
    } = this.props;

    console.info('CheckoutPage state: ', this.state);
    console.info('CheckoutPage props: ', this.props);
    console.info('products: ', this.props.products);
    const isAddressesCollectionExist = Boolean(Array.isArray(addressesCollection) && addressesCollection.length > 0);

    return (
      <AppMain>
        {isLoading ? <AppBackdrop isOpen={true} /> : null}

        <CheckoutPageContext.Provider
          value={{
            submitHandler: this.handleSubmit,
            inputChangeHandler: this.handleInputChange,
            isBillingSameAsDelivery: this.state.billingSelection.isSameAsDelivery,
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
                selections={{delivery: this.state.deliverySelection, billing: this.state.billingSelection}}
                extraAddressesOptions={getExtraAddressesOptions(isAddressesCollectionExist)}
                isAddressesFulfilled={isAddressesFulfilled}
                isUserLoggedIn={isUserLoggedIn}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <CartData products={products} totals={totals}/>
            </Grid>
          </Grid>
        </CheckoutPageContext.Provider>

      </AppMain>
    );
  }
}

export const CheckoutPage = withStyles(styles)(CheckoutPageBase);
export default CheckoutPage;
