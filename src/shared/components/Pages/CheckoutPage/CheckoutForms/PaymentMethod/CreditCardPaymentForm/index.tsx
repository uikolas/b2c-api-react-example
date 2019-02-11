import * as React from 'react';
import {connect} from './connect';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import { CheckoutPageContext } from '../../../context';
import { formStyles } from '@components/Pages/CheckoutPage/CheckoutForms/styles';
import { SprykerForm } from '@components/UI/SprykerForm';
import { checkoutFormsNames } from '@components/Pages/CheckoutPage/constants';
import { ICreditCardPaymentFormProps } from './types';
import {
    getCreditCardFormSettings
} from '@components/Pages/CheckoutPage/CheckoutForms/settings/creditCardSettings';
import { IPaymentCreditCardParams } from '@components/Pages/CheckoutPage/types/formSettingsTypes';
import { creditCardConfigInputStable } from '@components/Pages/CheckoutPage/constants/inputsConfig';
import { InputChangeEvent } from '@interfaces/common/react';
import { InputSaveErrorMessage } from '../../../../../../translation';
import {
    validateCreditCardInput,
    validateCreditCardForm
} from '@components/Pages/CheckoutPage/helpers/validation';

export const CreditCardPaymentFormBase: React.SFC<ICreditCardPaymentFormProps> = (props): JSX.Element => {
    const {
        classes,
        providersCollection,
        paymentCreditCardData,
        mutateStateCreditCard,
        mutatePaymentSection
    } = props;

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
            || name === creditCardConfigInputStable.cardExpiryYear.inputName

        if (isSelecrChanged) {
            handleCreditCardValidity();
        }
    };

    const handleCreditCardValidity = (): void => {
        const isFormValid = validateCreditCardForm(paymentCreditCardData);
        mutatePaymentSection(isFormValid);
    };

    return (
        <CheckoutPageContext.Consumer>
            {({
                  submitHandler,
              }) => {
                const creditCardParams: IPaymentCreditCardParams = {
                    inputsData: paymentCreditCardData,
                    inputsConfig: creditCardConfigInputStable,
                    providersCollection,
                    submitHandler,
                    inputChangeHandler: handleCreditCardInputs,
                    onBlurHandler: handleCreditCardValidity
                };

                const creditCardFormSettings = getCreditCardFormSettings(
                    checkoutFormsNames.creditCard,
                    creditCardParams
                );

                return (
                    <Grid container className={classes.root}>
                        <Grid item xs={12}>
                            <SprykerForm form={creditCardFormSettings} formClassName={classes.creditCardForm} />
                        </Grid>
                    </Grid>
                );
            }}
        </CheckoutPageContext.Consumer>
    );
};

export const CreditCardPaymentForm = connect(withStyles(formStyles)(CreditCardPaymentFormBase));
