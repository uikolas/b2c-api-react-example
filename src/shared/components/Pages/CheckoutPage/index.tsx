import * as React from 'react';
import {FormEvent, ChangeEvent} from "react";

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import { connect } from './connect';
import { styles } from './styles';
import {
  checkoutFormsNames,
  checkoutSelectionInputs,
} from "./constants/index";
import {ICheckoutPageProps, ICheckoutPageState} from "./types/index";
import {CheckoutPageContext} from "./context";
import {
  checkFormValidity,
  checkFormInputValidity,
  getCheckoutPanelsSettings,
  getDefaultAddressId,
  getExtraOptionsToSelection,
} from "./helpers";
import {AppBackdrop} from "src/shared/components/Common/AppBackdrop/index";
import {AppMain} from "src/shared/components/Common/AppMain/index";
import {CheckoutForms} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/index";
import {CartData} from "src/shared/components/Pages/CheckoutPage/CartData/index";
import {inputSaveErrorText} from "src/shared/constants/messages/errors";
import {IAddressItem} from "src/shared/interfaces/addresses/index";
import {
  billingNewAddressDefault,
  billingSelectionDefault,
  deliveryNewAddressDefault,
  deliverySelectionDefault,
  paymentCreditCardDefault,
  paymentInvoiceDefault,
  stepCompletionCheckoutDefault
} from "src/shared/components/Pages/CheckoutPage/constants/stateDefaults";
import {
  billingConfigInputStable,
  creditCardConfigInputStable,
  deliveryConfigInputStable,
  invoiceConfigInputStable
} from "src/shared/components/Pages/CheckoutPage/constants/inputsConfig";
import {
  mutateBillingNewAddressValidity,
  mutateCreditCardValidity,
  mutateDeliveryNewAddressValidity,
  mutateInvoiceValidity
} from "src/shared/components/Pages/CheckoutPage/stateMutations/validity";
import {
  mutateBillingInputs,
  mutateCreditCardInputs,
  mutateDeliveryInputs,
  mutateInvoiceInputs
} from "src/shared/components/Pages/CheckoutPage/stateMutations/inputs";
import {
  mutateBillingSelectionAddNew,
  mutateBillingSelectionAddressId,
  mutateBillingSelectionSameAsDelivery,
  mutateDeliverySelectionAddNew,
  mutateDeliverySelectionAddressId
} from "src/shared/components/Pages/CheckoutPage/stateMutations/selections";
import {mutatePaymentMethod, mutateShipmentMethod} from "src/shared/components/Pages/CheckoutPage/stateMutations/index";


@connect
export class CheckoutPageBase extends React.Component<ICheckoutPageProps, ICheckoutPageState> {

  public state: ICheckoutPageState = {
    deliverySelection: {...deliverySelectionDefault},
    billingSelection: {...billingSelectionDefault},
    deliveryNewAddress: {...deliveryNewAddressDefault},
    billingNewAddress: {...billingNewAddressDefault},
    stepsCompletion: {...stepCompletionCheckoutDefault},
    shipmentMethod: null,
    paymentMethod: null,
    paymentCreditCardData: {...paymentCreditCardDefault},
    paymentInvoiceData: {...paymentInvoiceDefault},
  };

  public componentDidMount() {
    console.info('%c ++ CheckoutPage componentDidMount ++', 'background: #3d5afe; color: #ffea00');
    this.initRequestAddressesData();
    this.setDefaultAddresses();
  }

  public componentDidUpdate = (prevProps: ICheckoutPageProps, prevState: ICheckoutPageState) => {
    console.info('%c -- CheckoutPage componentDidUpdate --', 'background: #4caf50; color: #cada55');
    this.initRequestAddressesData();

    // If we get saved addressesCollection
    if (!prevProps.isAddressesCollectionExist && this.props.isAddressesCollectionExist) {
      this.setDefaultAddresses();
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
        this.handleDeliverySelection(value);
    } else if (name === 'billingSelection' || name === checkoutSelectionInputs.isSameAsDeliveryValue) {
        this.handleBillingSelection(value);
    } else if (name === 'shipmentMethodSelection') {
        this.handleShipmentMethodSelection(value);
    } else if (name === 'paymentMethodSelection') {
        this.handlePaymentMethodSelection(value);
    } else {
        throw new Error(`Undefined type of Selection: ${name}`);
    }
  }

  public handleFormValidityOnBlur = (formName: string) => (event: any): void => {
    if (formName === checkoutFormsNames.delivery) {
        this.handleDeliveryNewAddressValidity();
    } else if (formName === checkoutFormsNames.billing) {
        this.handleBillingNewAddressValidity();
    } else if (formName === checkoutFormsNames.invoice) {
        this.handleInvoiceValidity();
    } else if (formName === checkoutFormsNames.creditCard) {
        this.handleCreditCardValidity();
    } else {
        throw new Error(`Undefined type of formName: ${formName}`);
    }
  }

  public handleDeliveryInputs = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>
                                ): void => {
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

    this.setState((prevState: ICheckoutPageState) => {
      return mutateDeliveryInputs(prevState, key, cleanValue, !isInputValid);
    }, () => {
      // Validate form when select input is changed
      if (key === deliveryConfigInputStable.salutation.inputName
          || key === deliveryConfigInputStable.country.inputName
      ) {
        this.handleDeliveryNewAddressValidity();
      }
    });
  }

  public handleBillingInputs = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>
                               ): void => {
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

    this.setState((prevState: ICheckoutPageState) => {
      if (prevState.billingNewAddress[key].value === cleanValue) {
        return;
      }
      return mutateBillingInputs(prevState, key, cleanValue, !isInputValid);
    }, () => {
      // Validate form when select input is changed
      if (key === billingConfigInputStable.salutation.inputName
          || key === billingConfigInputStable.country.inputName
      ) {
        this.handleBillingNewAddressValidity();
      }
    });
  }

  public handleInvoiceInputs = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>
                               ): void => {
    const name: any = event.target.name;
    const cleanValue = event.target.value.trim();
    if (!this.state.paymentInvoiceData.hasOwnProperty(name)) {
      throw new Error(inputSaveErrorText);
    }
    const key: any = name;
    const isInputValid = checkFormInputValidity({
      value: cleanValue,
      fieldConfig: invoiceConfigInputStable[key],
    });
    this.setState((prevState: ICheckoutPageState) => {
      if (prevState.paymentInvoiceData[key].value === cleanValue) {
        return;
      }
      return mutateInvoiceInputs(prevState, key, cleanValue, !isInputValid);
    });
  }

  public handleCreditCardInputs = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>
                                  ): void => {
    const name: any = event.target.name;
    const cleanValue = event.target.value.trim();
    if (!this.state.paymentCreditCardData.hasOwnProperty(name)) {
      throw new Error(inputSaveErrorText);
    }
    const key: any = name;
    const isInputValid = checkFormInputValidity({
      value: cleanValue,
      fieldConfig: creditCardConfigInputStable[key],
    });
    this.setState((prevState: ICheckoutPageState) => {
      return mutateCreditCardInputs(prevState, key, cleanValue, !isInputValid);
    }, () => {
      // Validate form when select input is changed
      if (key === creditCardConfigInputStable.paymentProvider.inputName
          || key === creditCardConfigInputStable.cardExpiryMonth.inputName
          || key === creditCardConfigInputStable.cardExpiryYear.inputName
      ) {
        this.handleCreditCardValidity();
      }
    });
  }

  private handleBillingNewAddressValidity = (): boolean => {
    const isFormValid = checkFormValidity({
      form: this.state.billingNewAddress,
      fieldsConfig: billingConfigInputStable,
    });
    this.setState((prevState: ICheckoutPageState) => {
      return mutateBillingNewAddressValidity(prevState, isFormValid);
    });
    return isFormValid;
  }

  private handleDeliveryNewAddressValidity = (): void => {
    const isFormValid = checkFormValidity({
      form: this.state.deliveryNewAddress,
      fieldsConfig: deliveryConfigInputStable,
    });
    this.setState((prevState: ICheckoutPageState) => {
      return mutateDeliveryNewAddressValidity(prevState, isFormValid);
    });
  }

  private handleInvoiceValidity = (): void => {
    const isFormValid = checkFormValidity({
      form: this.state.paymentInvoiceData,
      fieldsConfig: invoiceConfigInputStable,
    });
    this.setState((prevState: ICheckoutPageState) => {
      return mutateInvoiceValidity(prevState, isFormValid);
    });
  }

  private handleCreditCardValidity = (): void => {
    const isFormValid = checkFormValidity({
      form: this.state.paymentCreditCardData,
      fieldsConfig: creditCardConfigInputStable,
    });
    this.setState((prevState: ICheckoutPageState) => {
      return mutateCreditCardValidity(prevState, isFormValid);
    });
  }

  private handleDeliverySelection = (value: string): void => {
    if (value === checkoutSelectionInputs.isAddNewDeliveryValue) {
      this.setState( (prevState: ICheckoutPageState) => {
        return mutateDeliverySelectionAddNew(prevState);
      });
    } else {
      this.setState( (prevState: ICheckoutPageState) => {
        return mutateDeliverySelectionAddressId(prevState, value);
      });
    }
  }

  private handleBillingSelection = (value: string): void => {
    if (value === checkoutSelectionInputs.isAddNewBillingValue) {
      this.setState( (prevState: ICheckoutPageState) => {
        return mutateBillingSelectionAddNew(prevState);
      });
    } else if (value === checkoutSelectionInputs.isSameAsDeliveryValue) {
      this.setState( (prevState: ICheckoutPageState) => {
        return mutateBillingSelectionSameAsDelivery(prevState);
      });
    } else {
      this.setState( (prevState: ICheckoutPageState) => {
        return mutateBillingSelectionAddressId(prevState, value);
      });
    }
  }

  private handleShipmentMethodSelection = (value: string): void => {
    this.setState( (prevState: ICheckoutPageState) => {
      return mutateShipmentMethod(prevState, value);
    });

  }

  private handlePaymentMethodSelection = (value: string ): void => {
    this.setState( (prevState: ICheckoutPageState) => {
      return mutatePaymentMethod(prevState, value);
    });
  }

  private getCurrentValueBillingSelection = (): IAddressItem["id"] | string | null => {
    return this.state.billingSelection.selectedAddressId
           || (this.state.billingSelection.isAddNew && checkoutSelectionInputs.isAddNewBillingValue)
           || (this.state.billingSelection.isSameAsDelivery && checkoutSelectionInputs.isSameAsDeliveryValue)
           || null;
  }

  private getCurrentValueDeliverySelection = (): IAddressItem["id"] | string | null => {
    return this.state.deliverySelection.selectedAddressId
           || (this.state.deliverySelection.isAddNew && checkoutSelectionInputs.isAddNewDeliveryValue)
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

  private setDefaultAddresses = (): void => {
    const defaultValueDelivery = getDefaultAddressId(this.props.addressesCollection, 'delivery');
    if (defaultValueDelivery) {
      this.handleDeliverySelection(defaultValueDelivery);
    }

    const defaultValueBilling = getDefaultAddressId(this.props.addressesCollection, 'billing');
    if (defaultValueBilling) {
      this.handleBillingSelection(defaultValueBilling);
    }
  }

  private checkCheckoutFormValidity = (): boolean => {
    const {first, second, third, fourth} = this.state.stepsCompletion;
    if (!first || !second || !third || !fourth) { return false; }
    return true;
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
      paymentMethods,
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
            onBlurHandler: this.handleFormValidityOnBlur,
            selectionsChangeHandler: this.handleSelectionsChange,
            handleDeliveryInputs: this.handleDeliveryInputs,
            handleBillingInputs: this.handleBillingInputs,
            handleInvoiceInputs: this.handleInvoiceInputs,
            handleCreditCardInputs: this.handleCreditCardInputs,
            isBillingSameAsDelivery: this.state.billingSelection.isSameAsDelivery,
            deliveryNewAddress: this.state.deliveryNewAddress,
            billingNewAddress: this.state.billingNewAddress,
            addressesCollection,
            countriesCollection,
            deliverySelections: this.state.deliverySelection,
            billingSelections: this.state.billingSelection,
            currentValueDeliverySelection: this.getCurrentValueDeliverySelection(),
            currentValueBillingSelection: this.getCurrentValueBillingSelection(),
            extraOptionsDeliverySelection: getExtraOptionsToSelection(isAddressesCollectionExist, 'delivery'),
            extraOptionsBillingSelection: getExtraOptionsToSelection(isAddressesCollectionExist, 'billing'),
            isAddressesFulfilled,
            isUserLoggedIn,
            shipmentMethods,
            currentValueShipmentMethod: this.state.shipmentMethod,
            paymentMethods,
            currentValuePaymentMethod: this.state.paymentMethod,
            paymentCreditCardDataInputs: this.state.paymentCreditCardData,
            paymentInvoiceDataInputs: this.state.paymentInvoiceData,
          }}
        >
          <Grid container className={classes.container}>
            <Grid item xs={12} md={7} className={classes.leftColumn}>
              <CheckoutForms
                panels={getCheckoutPanelsSettings({
                  isFirstPanelDisabled,
                  isSecondPanelDisabled,
                  isThirdPanelDisabled,
                  isFourthPanelDisabled,
                })}
              />
            </Grid>
            <Grid item xs={12} md={5} className={classes.rightColumn}>
              <CartData
                products={products}
                totals={totals}
                isSendBtnDisabled={!this.checkCheckoutFormValidity()}
                sendData={this.handleSubmit}
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
