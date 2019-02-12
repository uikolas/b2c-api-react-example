import * as React from 'react';
import { connect } from './connect';
import { withStyles, Grid } from '@material-ui/core';
import { SprykerForm } from '@components/UI/SprykerForm';
import {
    getCreditCardFormSettings
} from 'src/shared/helpers/formCreations/checkout/creditCardSettings';
import { checkFormInputValidity, checkFormValidity } from 'src/shared/helpers/checkout';

import { checkoutFormsNames } from 'src/shared/constants/checkout';
import { creditCardConfigInputStable } from 'src/shared/constants/checkout';
import { InputSaveErrorMessage } from 'src/shared/translation/index';

import { FormEvent, InputChangeEvent } from '@interfaces/common/react';
import { ICheckoutCreditCardState } from '@interfaces/checkout';
import { IPaymentCreditCardParams } from 'src/shared/helpers/formCreations/checkout/types';
import { ICreditCardPaymentFormProps } from './types';
import { styles } from './styles';

export const CreditCardPaymentFormBase: React.SFC<ICreditCardPaymentFormProps> = (props): JSX.Element => {
    const {
        classes,
        providersCollection,
        paymentCreditCardData,
        mutateStateCreditCard,
        mutatePaymentSection
    } = props;

    const validateCreditCardInput = (key: string, value: string): boolean => (
        checkFormInputValidity({value, fieldConfig: creditCardConfigInputStable[key]})
    );

    const validateCreditCardForm = (formState: ICheckoutCreditCardState): boolean => (
        checkFormValidity({form: formState, fieldsConfig: creditCardConfigInputStable})
    );

    const handleCreditCardInputs = (event: InputChangeEvent): void => {
        const {name, value} = event.target;
        if (!paymentCreditCardData.hasOwnProperty(name)) {
            throw new Error(InputSaveErrorMessage);
        }
        const isInputValid = validateCreditCardInput(name, value);
        const changedFiledData = {
            key: name,
            value,
            isError: !isInputValid
        };

        mutateStateCreditCard(changedFiledData);

        const isSelecrChanged = name === creditCardConfigInputStable.paymentProvider.inputName
            || name === creditCardConfigInputStable.cardExpiryMonth.inputName
            || name === creditCardConfigInputStable.cardExpiryYear.inputName;

        if (isSelecrChanged) {
            handleCreditCardValidity();
        }
    };

    const handleSubmit = (event: FormEvent): void => {
        event.preventDefault();
    };

    const handleCreditCardValidity = (): void => {
        const isFormValid = validateCreditCardForm(paymentCreditCardData);
        mutatePaymentSection(isFormValid);
    };

    const creditCardParams: IPaymentCreditCardParams = {
        inputsData: paymentCreditCardData,
        inputsConfig: creditCardConfigInputStable,
        providersCollection,
        submitHandler: handleSubmit,
        inputChangeHandler: handleCreditCardInputs,
        onBlurHandler: handleCreditCardValidity
    };

    const creditCardFormSettings = getCreditCardFormSettings(
        checkoutFormsNames.creditCard,
        creditCardParams
    );

    return (
        <Grid container>
            <Grid item xs={12}>
                <SprykerForm form={creditCardFormSettings} formClassName={classes.creditCardForm} />
            </Grid>
        </Grid>
    );
};

export const CreditCardPaymentForm = connect(withStyles(styles)(CreditCardPaymentFormBase));
