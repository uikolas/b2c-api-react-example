import {IFormSettings} from "src/shared/components/UI/SprykerForm/types";
import {
  IPaymentCreditCardParams
} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/settings/types";
import {
  InputLabelPaymentCreditCardCVC,
  InputLabelPaymentCreditCardName,
  InputLabelPaymentCreditCardNumber,
  InputLabelPaymentExpiryDate,
  InputLabelPaymentProvider
} from "src/shared/constants/forms/labels";


export const getCreditCardFormSettings = ( formName: string, params: IPaymentCreditCardParams): IFormSettings => {
  const {
    inputsData: {
      paymentProvider,
      cardNumber,
      cardName,
      cardExpiryMonth,
      cardExpiryYear,
      cardCVC,
    },
    inputsConfig: {
      paymentProvider: paymentProviderConfig,
      cardNumber: cardNumberConfig,
      cardName: cardNameConfig,
      cardExpiryMonth: cardExpiryMonthConfig,
      cardExpiryYear: cardExpiryYearConfig,
      cardCVC: cardCVCConfig,
    },
    submitHandler,
    inputChangeHandler,
    onBlurHandler,
  } = params;


  const formSettings: IFormSettings = {
    formName,
    onChangeHandler: inputChangeHandler,
    onSubmitHandler: submitHandler,
    onBlurHandler,
    fields: [
      [
        {
          type: 'input',
          inputName: paymentProviderConfig.inputName,
          inputValue: paymentProvider.value,
          spaceNumber: 6,
          isRequired: paymentProviderConfig.isRequired,
          label: InputLabelPaymentProvider,
          isError: paymentProvider.isError,
        },
      ],
      [
        {
          type: 'input',
          inputName: cardNumberConfig.inputName,
          inputValue: cardNumber.value,
          spaceNumber: 6,
          isRequired: cardNumberConfig.isRequired,
          label: InputLabelPaymentCreditCardNumber,
          isError: cardNumber.isError,
        },
        {
          type: 'input',
          inputName: cardNameConfig.inputName,
          inputValue: cardName.value,
          spaceNumber: 6,
          isRequired: cardNameConfig.isRequired,
          label: InputLabelPaymentCreditCardName,
          isError: cardName.isError,
        },
      ],
      [
        {
          type: 'input',
          inputName: cardExpiryMonthConfig.inputName,
          inputValue: cardExpiryMonth.value,
          spaceNumber: 3,
          isRequired: cardExpiryMonthConfig.isRequired,
          label: InputLabelPaymentExpiryDate,
          isError: cardExpiryMonth.isError,
        },
        {
          type: 'input',
          inputName: cardExpiryYearConfig.inputName,
          inputValue: cardExpiryYear.value,
          spaceNumber: 3,
          isRequired: cardExpiryYearConfig.isRequired,
          label: InputLabelPaymentExpiryDate,
          isError: cardExpiryYear.isError,
        },
        {
          type: 'input',
          inputName: cardCVCConfig.inputName,
          inputValue: cardCVC.value,
          spaceNumber: 3,
          isRequired: cardCVCConfig.isRequired,
          label: InputLabelPaymentCreditCardCVC,
          isError: cardCVC.isError,
        },
      ],
    ],
  };
  return formSettings;
};
