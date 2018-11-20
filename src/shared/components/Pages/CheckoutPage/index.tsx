import * as React from 'react';
import {FormEvent, ChangeEvent} from "react";

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import { connect } from './connect';
import { styles } from './styles';

import { ClickEvent } from 'src/shared/interfaces/commoon/react';
import {AppBackdrop} from "src/shared/components/Common/AppBackdrop/index";
import {AppMain} from "src/shared/components/Common/AppMain/index";
import {CheckoutForms} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/index";
import {CartData} from "src/shared/components/Pages/CheckoutPage/CartData/index";
import {
  ICheckoutPageProps,
  ICheckoutPageState,
  isAddNewBillingValue,
  isAddNewDeliveryValue,
  isSameAsDeliveryValue
} from "./types";
import {CheckoutPageContext} from "./context";
import {
  checkAddressFormValidity,
  checkFormInputValidity,
  getCheckoutPanelsSettings,
  getDefaultAddressId,
  getExtraAddressesOptions,
} from "src/shared/components/Pages/CheckoutPage/helpers";
import {
  billingConfigInputStable,
  billingNewAddressDefault,
  deliveryConfigInputStable,
  deliveryNewAddressDefault,
  stepCompletionCheckoutDefault,
} from "src/shared/components/Pages/CheckoutPage/constants";
import {inputSaveErrorText} from "src/shared/constants/messages/errors";
import {IAddressItem} from "src/shared/interfaces/addresses/index";


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
    stepsCompletion: {
      ...stepCompletionCheckoutDefault
    },
    shipmentMethod: null,
  };

  public componentDidMount() {
    console.info('%c ++ CheckoutPage componentDidMount ++', 'background: #3d5afe; color: #ffea00');
    this.initRequestAddressesData();
  }

  public componentDidUpdate = (prevProps: ICheckoutPageProps, prevState: ICheckoutPageState) => {
    console.info('%c -- CheckoutPage componentDidUpdate --', 'background: #4caf50; color: #cada55');
    this.initRequestAddressesData();

    // If we get saved addressesCollection
    if (!prevProps.isAddressesCollectionExist && this.props.isAddressesCollectionExist) {

      const defaultValueDelivery = getDefaultAddressId(this.props.addressesCollection, 'delivery');
      if (defaultValueDelivery) {
        this.handleDeliverySelection(defaultValueDelivery);
      }

      const defaultValueBilling = getDefaultAddressId(this.props.addressesCollection, 'billing');
      if (defaultValueBilling) {
        this.handleBillingSelection(defaultValueBilling);
      }
    }

  }

  public handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.info('handleSubmit ');
  }

  public sendCheckoutDataForOrder = (event: ClickEvent) => {
    event.preventDefault();
    console.info('Send checkout data');

    // this.props.sendCheckoutData();
  }

  public handleSelectionsChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>
                                  ): void => {
    const { name, value } = event.target;
    console.log(name, value);
    if (name === 'deliverySelection') {
      this.handleDeliverySelection(value);
    } else if (name === 'billingSelection' || name === isSameAsDeliveryValue) {
      this.handleBillingSelection(value);
    } else if (name === 'shipmentMethodSelection') {
      this.handleShipmentMethodSelection(value);
    } else {
      throw new Error(`Undefined type of forms: ${name}`);
    }
  }

  public handleDeliveryInputs = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>
                                ): void => {
    // TODO: checkAddressFormValidity change on blur event
    const name: any = event.target.name;
    const cleanValue = event.target.value.trim();
    if (!this.state.deliveryNewAddress.hasOwnProperty(name)) {
      throw new Error(inputSaveErrorText);
    }
    const key: any = name;

    const isInputValid = checkFormInputValidity({
      value: cleanValue,
      fieldConfig: deliveryConfigInputStable[key],
    });

    const newInputState = {
      [key]: {
        value: cleanValue,
        isError: !isInputValid,
      }
    };

    const isFormValid = checkAddressFormValidity({
      form: {
        ...this.state.deliveryNewAddress,
        ...newInputState,
      },
      fieldsConfig: deliveryConfigInputStable,
    });

    this.setState((prevState: ICheckoutPageState) => {
      if (prevState.deliveryNewAddress[key].value === cleanValue) {
        return;
      }
      return ({
        ...prevState,
        deliveryNewAddress: {
          ...prevState.deliveryNewAddress,
          ...newInputState,
        },
        stepsCompletion: {
          ...prevState.stepsCompletion,
          first: isFormValid,
        }
      });
    });
  }

  public handleBillingInputs = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>
                                ): void => {
    // TODO: checkAddressFormValidity change on blur event

    const name: any = event.target.name;
    const cleanValue = event.target.value.trim();
    if (!this.state.billingNewAddress.hasOwnProperty(name)) {
      throw new Error(inputSaveErrorText);
    }
    const key: any = name;

    const isInputValid = checkFormInputValidity({
      value: cleanValue,
      fieldConfig: billingConfigInputStable[key],
    });

    const newInputState = {
      [key]: {
        value: cleanValue,
        isError: !isInputValid,
      }
    };

    const isFormValid = checkAddressFormValidity({
      form: {
        ...this.state.billingNewAddress,
        ...newInputState,
      },
      fieldsConfig: billingConfigInputStable,
    });

    this.setState((prevState: ICheckoutPageState) => {

      if (prevState.billingNewAddress[key].value === cleanValue) {
        return;
      }

      return ({
        ...prevState,
        billingNewAddress: {
          ...prevState.billingNewAddress,
          ...newInputState,
        },
        stepsCompletion: {
          ...prevState.stepsCompletion,
          second: isFormValid,
        }
      });
    });
  }

  private handleDeliverySelection = (value: string): boolean => {
    if (value === isAddNewDeliveryValue) {
      this.setState( (prevState: ICheckoutPageState) => {
        return ({
          deliverySelection: {
            selectedAddressId: null,
            isAddNew: true,
          },
          stepsCompletion: {
            ...prevState.stepsCompletion,
            first: false,
          },
        });
      });
      return true;
    } else {
      this.setState( (prevState: ICheckoutPageState) => {
        return ({
          deliverySelection: {
            selectedAddressId: value,
            isAddNew: false,
          },
          stepsCompletion: {
            ...prevState.stepsCompletion,
            first: true,
          },
        });
      });
      return true;
    }
  }

  private handleBillingSelection = (value: string): boolean => {
    if (value === isAddNewBillingValue) {
      this.setState( (prevState: ICheckoutPageState) => {
        return ({
          billingSelection: {
            selectedAddressId: null,
            isAddNew: true,
            isSameAsDelivery: false,
          },
          stepsCompletion: {
            ...prevState.stepsCompletion,
            second: false,
          },
        });
      });
      return true;
    } else if (value === isSameAsDeliveryValue) {
      this.setState( (prevState: ICheckoutPageState) => {
        const newSameValue = !prevState.billingSelection.isSameAsDelivery;
        return ({
          billingSelection: {
            selectedAddressId: null,
            isAddNew: !newSameValue,
            isSameAsDelivery: newSameValue,
          },
          stepsCompletion: {
            ...prevState.stepsCompletion,
            second: true,
          },
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
          },
          stepsCompletion: {
            ...prevState.stepsCompletion,
            second: true,
          },
        });
      });
      return true;
    }
  }

  private handleShipmentMethodSelection = (value: string): boolean => {
    this.setState( (prevState: ICheckoutPageState) => {
      return ({
        shipmentMethod: value,
        stepsCompletion: {
          ...prevState.stepsCompletion,
          third: true,
        },
      });
    });
    return true;
  }

  private getCurrentValueInBillingSelection = (): IAddressItem["id"] | string | null => {
    return this.state.billingSelection.selectedAddressId
           || (this.state.billingSelection.isAddNew && isAddNewBillingValue)
           || (this.state.billingSelection.isSameAsDelivery && isSameAsDeliveryValue)
           || null;
  }

  private getCurrentValueInDeliverySelection = (): IAddressItem["id"] | string | null => {
    return this.state.deliverySelection.selectedAddressId
           || (this.state.deliverySelection.isAddNew && isAddNewDeliveryValue)
           || null;
  }

  // TODO: Remove it after we get access to checkout endpoint
  private initRequestAddressesData = (): void => {
    const {
      customerReference,
      addressesCollection,
      isAddressesLoading,
      isAddressesFulfilled,
      isAppStateLoading,
      isCartFulfilled,
      isAppDataSet,
    } = this.props;
    if (isAddressesLoading || isAddressesFulfilled || isAppStateLoading || !isCartFulfilled || !isAppDataSet) {
      return;
    }
    if (customerReference && !addressesCollection) {
      this.props.getAddressesList(customerReference);
    }
  }

  private isCheckoutFormValid = (): boolean => {
    return false;
  }

  public render(): JSX.Element {
    const {
      classes,
      isLoading,
      products,
      totals,
      addressesCollection,
      isAddressesCollectionExist,
      isAddressesFulfilled,
      isUserLoggedIn,
      countriesCollection,
      shipmentMethods,
    } = this.props;

    console.info('CheckoutPage state: ', this.state);
    console.info('CheckoutPage props: ', this.props);

    const isFirstPanelDisabled = false;
    const isSecondPanelDisabled = !this.state.stepsCompletion.first;
    const isThirdPanelDisabled = !this.state.stepsCompletion.second;
    const isFourthPanelDisabled = !this.state.stepsCompletion.third;

    // TODO: Handle isOpen param for panels

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
            deliveryAddressInputsConfig: deliveryConfigInputStable,
            billingAddressInputsConfig: billingConfigInputStable,
            addressesCollection,
            countriesCollection,
            selections: {delivery: this.state.deliverySelection, billing: this.state.billingSelection},
            currentValuesInSelections: {
              delivery: this.getCurrentValueInDeliverySelection(),
              billing: this.getCurrentValueInBillingSelection(),
            },
            extraAddressesOptions: getExtraAddressesOptions(isAddressesCollectionExist),
            isAddressesFulfilled,
            isUserLoggedIn,
            shipmentMethods,
            currentValueShipmentMethod: this.state.shipmentMethod,
          }}
        >
          <Grid container className={classes.container}>
            <Grid item xs={12} md={7}>
              <CheckoutForms
                panels={getCheckoutPanelsSettings({
                  isFirstPanelDisabled,
                  isSecondPanelDisabled,
                  isThirdPanelDisabled,
                  isFourthPanelDisabled,
                })}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <CartData
                products={products}
                totals={totals}
                sendData={this.sendCheckoutDataForOrder}
              />
            </Grid>
          </Grid>
        </CheckoutPageContext.Provider>

      </AppMain>
    );
  }
}

export const CheckoutPage = withStyles(styles)(CheckoutPageBase);
export default CheckoutPage;
