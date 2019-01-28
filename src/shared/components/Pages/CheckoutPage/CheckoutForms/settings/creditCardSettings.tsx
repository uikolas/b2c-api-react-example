import { IFormSettings } from 'src/shared/components/UI/SprykerForm/types';
import {
    IPaymentCreditCardParams
} from '../../types/formSettingsTypes';
import {
    InputLabelPaymentCreditCardCVC,
    InputLabelPaymentCreditCardName,
    InputLabelPaymentCreditCardNumber,
    InputLabelPaymentExpiryDate,
    InputLabelPaymentProvider,
    FirstItemInSelect
} from 'src/shared/translation';
import { IMenuItemSelect } from 'src/shared/components/UI/SprykerSelect/types';

export const getCreditCardFormSettings = (formName: string, params: IPaymentCreditCardParams): IFormSettings => {
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
        providersCollection,
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
                    type: 'select',
                    inputName: paymentProviderConfig.inputName,
                    inputValue: paymentProvider.value,
                    spaceNumber: 6,
                    isRequired: paymentProviderConfig.isRequired,
                    label: InputLabelPaymentProvider,
                    isError: paymentProvider.isError,
                    menuItems: providersCollection,
                    menuItemFirst: {
                        value: ' ',
                        name: FirstItemInSelect,
                        selected: true,
                        disabled: true,
                    },
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
                    type: 'select',
                    inputName: cardExpiryMonthConfig.inputName,
                    inputValue: cardExpiryMonth.value,
                    spaceNumber: 3,
                    isRequired: cardExpiryMonthConfig.isRequired,
                    label: InputLabelPaymentExpiryDate,
                    isError: cardExpiryMonth.isError,
                    menuItems: createItemsForExpiryMonth(),
                    /* menuItemFirst: {
					   value: " ",
					   name: FirstItemInSelect,
					   selected: true,
					   disabled: true,
					 },*/
                },
                {
                    type: 'select',
                    inputName: cardExpiryYearConfig.inputName,
                    inputValue: cardExpiryYear.value,
                    spaceNumber: 3,
                    isRequired: cardExpiryYearConfig.isRequired,
                    label: null,
                    isError: cardExpiryYear.isError,
                    menuItems: createItemsForExpiryYear(),
                    /*menuItemFirst: {
					  value: " ",
					  name: FirstItemInSelect,
					  selected: true,
					  disabled: true,
					},*/
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

const createItemsForExpiryMonth = (): IMenuItemSelect[] => {
    const data = getRange(1, 12);

    return data.map((item: number) => ({value: `${item}`, name: item}));
};

const createItemsForExpiryYear = (): IMenuItemSelect[] => {
    const currentYear = (new Date()).getFullYear();
    const data = getRange(currentYear, currentYear + 5);

    return data.map((item: number) => ({value: `${item}`, name: item}));
};

const getRange = (start: number, end: number): number[] => {
    const list = [];
    for (let i = start; i <= end; i++) {
        list.push(i);
    }

    return list;
};
