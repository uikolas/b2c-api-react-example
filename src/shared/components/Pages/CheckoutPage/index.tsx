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
import {ICheckoutPageProps, ICheckoutPageState} from "./types";
import {CheckoutPageContext} from "./context";
import {getExtraAddressesOptions} from "src/shared/components/Pages/CheckoutPage/helpers";
import {billingNewAddressDefault, deliveryNewAddressDefault} from "src/shared/components/Pages/CheckoutPage/constants";
import {inputSaveErrorText} from "src/shared/constants/messages/errors";


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
    },
    deliveryNewAddress: {
      ...deliveryNewAddressDefault
    },
    billingNewAddress: {
      ...billingNewAddressDefault
    },
  };

  public componentDidMount() {
    console.info('%c ++ CheckoutPage componentDidMount ++', 'background: #3d5afe; color: #ffea00');
    this.initRequestAddressesData();
  }

  public componentDidUpdate = (prevProps: ICheckoutPageProps, prevState: ICheckoutPageState) => {
    console.info('%c -- CheckoutPage componentDidUpdate --', 'background: #4caf50; color: #cada55');
    this.initRequestAddressesData();
  }

  // TODO: Remove it after we get access to checkout endpoint
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

  public handleSelectionsChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>
                                  ): void => {
    const { name, value } = event.target;
    if (name === 'deliverySelection') {
      this.handleDeliverySelection(event.target.name, event.target.value);
    } else if (name === 'billingSelection' || name === 'sameAsDelivery') {
      this.handleBillingSelection(event.target.name, event.target.value);
    }
  }

  public handleDeliveryInputs = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>
                                ): void => {

    const name: any = event.target.name;
    const cleanValue = event.target.value.trim();
    if (!this.state.deliveryNewAddress.hasOwnProperty(name)) {
      throw new Error(inputSaveErrorText);
    }

    this.setState((prevState: ICheckoutPageState) => {
      const key: any = name;
      if (prevState.deliveryNewAddress[key] === cleanValue) {
        return;
      }

      return ({
        ...prevState,
        deliveryNewAddress: {
          ...prevState.deliveryNewAddress,
          [key]: cleanValue,
        },
      });
    });
  }

  public handleBillingInputs = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>
                                ): void => {
    const name: any = event.target.name;
    const cleanValue = event.target.value.trim();
    if (!this.state.billingNewAddress.hasOwnProperty(name)) {
      throw new Error(inputSaveErrorText);
    }

    this.setState((prevState: ICheckoutPageState) => {
      const key: any = name;
      if (prevState.billingNewAddress[key] === cleanValue) {
        return;
      }

      return ({
        ...prevState,
        deliveryNewAddress: {
          ...prevState.billingNewAddress,
          [key]: cleanValue,
        },
      });
    });
  }

  private handleDeliverySelection = (name: string, value: string): boolean => {
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
  }

  private handleBillingSelection = (name: string, value: string): boolean => {
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
            isAddNew: !newSameValue,
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
  }

  public render(): JSX.Element {
    const {
      classes,
      isLoading,
      products,
      totals,
      addressesCollection,
      isAddressesFulfilled,
      isUserLoggedIn,
      countriesCollection,
    } = this.props;

    console.info('CheckoutPage state: ', this.state);
    console.info('CheckoutPage props: ', this.props);

    const isAddressesCollectionExist = Boolean(Array.isArray(addressesCollection) && addressesCollection.length > 0);

    return (
      <AppMain>
        {isLoading ? <AppBackdrop isOpen={true} /> : null}

        <CheckoutPageContext.Provider
          value={{
            submitHandler: this.handleSubmit,
            selectionsChangeHandler: this.handleSelectionsChange,
            handleDeliveryInputs: this.handleDeliveryInputs,
            handleBillingInputs: this.handleBillingInputs,
            isBillingSameAsDelivery: this.state.billingSelection.isSameAsDelivery,
            deliveryNewAddress: this.state.deliveryNewAddress,
            billingNewAddress: this.state.billingNewAddress,
            addressesCollection,
            countriesCollection,
            selections: {delivery: this.state.deliverySelection, billing: this.state.billingSelection},
            extraAddressesOptions: getExtraAddressesOptions(isAddressesCollectionExist),
            isAddressesFulfilled,
            isUserLoggedIn,
          }}
        >
          <Grid container className={classes.container}>
            <Grid item xs={12} md={7}>
              <CheckoutForms />
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
