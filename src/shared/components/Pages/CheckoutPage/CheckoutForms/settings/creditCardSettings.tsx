import { IFormSettings } from 'src/shared/components/UI/SprykerForm/types';
import { IPaymentCreditCardParams } from '../../types/formSettingsTypes';
import { IMenuItemSelect } from 'src/shared/components/UI/SprykerSelect/types';
import { FormattedMessage } from 'react-intl';
import React from 'react';


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
                    label: <FormattedMessage id={ 'payment.provider.label' } />,
                    isError: paymentProvider.isError,
                    menuItems: providersCollection,
                    menuItemFirst: {
                        value: " ",
                        name: <FormattedMessage id={ 'first.item.in.select' } />,
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
                    label: <FormattedMessage id={ 'payment.credit.card.number.label' } />,
                    isError: cardNumber.isError,
                },
                {
                    type: 'input',
                    inputName: cardNameConfig.inputName,
                    inputValue: cardName.value,
                    spaceNumber: 6,
                    isRequired: cardNameConfig.isRequired,
                    label: <FormattedMessage id={ 'payment.credit.card.name.label' } />,
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
                    label: <FormattedMessage id={ 'payment.expiry.date.label' } />,
                    isError: cardExpiryMonth.isError,
                    menuItems: createItemsForExpiryMonth(),
                    /* menuItemFirst: {
                       value: " ",
                       name: <FormattedMessage id={ 'first.item.in.select' } />,
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
                      name: <FormattedMessage id={ 'first.item.in.select' } />,
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
                    label: <FormattedMessage id={ 'payment.credit.card.cvc.label' } />,
                    isError: cardCVC.isError,
                },
            ],
        ],
    };
    return formSettings;
};


const createItemsForExpiryMonth = (): Array<IMenuItemSelect> => {
    const data = getRange(1, 12);
    return data.map((item: number) => ({ value: `${item}`, name: item }));
};

const createItemsForExpiryYear = (): Array<IMenuItemSelect> => {
    const currentYear = (new Date()).getFullYear();
    const data = getRange(currentYear, currentYear + 5);
    return data.map((item: number) => ({ value: `${item}`, name: item }));
};

const getRange = (start: number, end: number): Array<number> => {
    const list = [];
    for (let i = start; i <= end; i++) {
        list.push(i);
    }
    return list;
};
