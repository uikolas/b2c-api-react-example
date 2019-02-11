import * as React from 'react';
import { connect } from './connect';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import { CheckoutPageContext } from '../../../context';
import { formStyles } from '@components/Pages/CheckoutPage/CheckoutForms/styles';
import { SprykerForm } from '@components/UI/SprykerForm';
import { checkoutFormsNames } from '@components/Pages/CheckoutPage/constants';
import { IInvoicePaymentFormProps } from './types';
import {
    getInvoiceFormSettings
} from '@components/Pages/CheckoutPage/CheckoutForms/settings/invoiceSettings';
import { IPaymentInvoiceParams } from '@components/Pages/CheckoutPage/types/formSettingsTypes';
import { invoiceConfigInputStable } from '@components/Pages/CheckoutPage/constants/inputsConfig';
import { TCheckoutPageContext } from '@components/Pages/CheckoutPage/types/contextTypes';
import { InputChangeEvent } from '@interfaces/common/react';
import { InputSaveErrorMessage } from '../../../../../../translation';
import {
    validateInvoiceInput,
    validateInvoiceForm
} from '@components/Pages/CheckoutPage/helpers/validation';

export const InvoicePaymentFormBase: React.SFC<IInvoicePaymentFormProps> = (props): JSX.Element => {
    const {
        classes,
        paymentInvoiceData,
        mutatePaymentSection,
        mutateStateInvoiceForm
    } = props;

    const handleInvoiceInputs = (event: InputChangeEvent): void => {
        const {name, value} = event.target;
        if (!paymentInvoiceData.hasOwnProperty(name)) {
            throw new Error(InputSaveErrorMessage);
        }
        const isInputValid = validateInvoiceInput(name, value);
        const changedFiledData = {
            key: name,
            value,
            isError: !isInputValid
        };

        mutateStateInvoiceForm(changedFiledData);
    };

    const handleInvoiceValidity = (): void => {
        const isFormValid = validateInvoiceForm(paymentInvoiceData);
        mutatePaymentSection(isFormValid);
    };

    return (
        <CheckoutPageContext.Consumer>
            {({
                  submitHandler
              }: Partial<TCheckoutPageContext>) => {
                const invoiceParams: IPaymentInvoiceParams = {
                    inputsData: paymentInvoiceData,
                    inputsConfig: invoiceConfigInputStable,
                    submitHandler,
                    inputChangeHandler: handleInvoiceInputs,
                    onBlurHandler: handleInvoiceValidity
                };

                const invoiceFormSettings = getInvoiceFormSettings(checkoutFormsNames.invoice, invoiceParams);

                return (
                    <Grid container className={classes.root}>
                        <Grid item xs={12}>
                            <SprykerForm form={invoiceFormSettings} />
                        </Grid>
                    </Grid>
                );
            }}
        </CheckoutPageContext.Consumer>
    );
};

export const InvoicePaymentForm = connect(withStyles(formStyles)(InvoicePaymentFormBase));
