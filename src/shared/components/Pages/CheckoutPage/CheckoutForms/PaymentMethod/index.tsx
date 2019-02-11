import * as React from 'react';
import { connect } from './connect';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { CheckoutPageContext } from '../../context';
import { formStyles } from '@components/Pages/CheckoutPage/CheckoutForms/styles';
import { SprykerForm } from '@components/UI/SprykerForm';
import { IPaymentMethodProps } from './types';
import {
    IPaymentInvoiceParams,
    IPaymentMethodsParams,
    IPaymentProviderToIcon
} from '@components/Pages/CheckoutPage/types/formSettingsTypes';
import { PartnerIconMasterCard } from 'src/shared/assets/icons/partnerIconMasterCard';
import { PartnerIconPaypal } from 'src/shared/assets/icons/partnerIconPaypal';
import { PartnerIconVisa } from 'src/shared/assets/icons/partnerIconVisa';
import {
    getPaymentMethodsFormSettings
} from '@components/Pages/CheckoutPage/CheckoutForms/settings/paymentSettings';
import { IPaymentMethod } from '@interfaces/checkout';
import {
    checkoutFormsNames,
    checkoutPaymentMethodsNames
} from '@components/Pages/CheckoutPage/constants';
import { InvoicePaymentForm } from './InvoicePaymentForm';
import { CreditCardPaymentForm } from './CreditCardPaymentForm';
import {
    IPaymentMethodsGrouped,
    TPaymentProvidersCollection
} from '@components/Pages/CheckoutPage/types/constantTypes';
import { InputChangeEvent } from '@interfaces/common/react';
import {
    validateCreditCardForm,
    validateInvoiceForm
} from '@components/Pages/CheckoutPage/helpers/validation';

export const PaymentMethodBase: React.SFC<IPaymentMethodProps> = (props): JSX.Element => {
    const {
        classes,
        paymentMethod: currentValuePaymentMethod,
        paymentMethods,
        paymentInvoiceData,
        paymentCreditCardData
    } = props;

    const handleSelectionsChange = (event: InputChangeEvent): void => {
        const {value} = event.target;
        const {mutatePaymentMethod} = props;

        const isInvoiceFormValid = validateInvoiceForm(paymentInvoiceData);
        const isCreditCardFormValid = validateCreditCardForm(paymentCreditCardData);

        let isFourthStepCompleted: boolean = false;

        if (value === checkoutPaymentMethodsNames.invoice && isInvoiceFormValid) {
            isFourthStepCompleted = true;
        } else if (value === checkoutPaymentMethodsNames.creditCard && isCreditCardFormValid) {
            isFourthStepCompleted = true;
        }

        mutatePaymentMethod({value, isFourthStepCompleted});
    };

    const paymentProviderToIcon: IPaymentProviderToIcon = {
        masterCard: <PartnerIconMasterCard key="masterCard" />,
        paypal: <PartnerIconPaypal key="paypal" />,
        visa: <PartnerIconVisa key="visa" />
    };

    return (
        <CheckoutPageContext.Consumer>
            {({
                  submitHandler
              }) => {
                const isPaymentMethodsExist = Boolean(Array.isArray(paymentMethods) && paymentMethods.length > 0);
                if (!isPaymentMethodsExist) {
                    return null;
                }

                const creditCardProvidersCollection: TPaymentProvidersCollection = [];

                const paymentMethodsGrouped: IPaymentMethodsGrouped = {};
                for (const paymentMethod of paymentMethods) {
                    if (!paymentMethodsGrouped[paymentMethod.paymentMethodName]) {
                        paymentMethodsGrouped[paymentMethod.paymentMethodName] = [];
                    }
                    paymentMethodsGrouped[paymentMethod.paymentMethodName].push(paymentMethod);
                }

                const paymentMethodGroupItems: IPaymentMethodsParams['paymentMethodGroupItems'] = [];

                for (const groupName in paymentMethodsGrouped) {
                    if (!paymentMethodsGrouped.hasOwnProperty(groupName)
                        || !Array.isArray(paymentMethodsGrouped[groupName])
                        || !paymentMethodsGrouped[groupName].length
                    ) {
                        continue;
                    }
                    const paymentMethodLabel: React.ReactNode[] = [];
                    paymentMethodLabel.push(
                        <Typography
                            key={groupName}
                            align="left"
                            component="p"
                            color="inherit"
                        >
                            {groupName}
                        </Typography>
                    );

                    paymentMethodsGrouped[groupName].forEach((item: IPaymentMethod) => {
                        if (paymentProviderToIcon[item.paymentProviderName]) {
                            paymentMethodLabel.push(paymentProviderToIcon[item.paymentProviderName]);
                        }
                        if (groupName === checkoutPaymentMethodsNames.creditCard) {
                            creditCardProvidersCollection.push({
                                name: item.paymentProviderName,
                                value: item.paymentProviderName
                            });
                        }
                    });

                    paymentMethodGroupItems.push({value: groupName, label: paymentMethodLabel});
                }

                const paymentMethodsParams = {
                    paymentMethodGroupItems,
                    currentValuePaymentMethod,
                    paymentProviderToIcon,
                    submitHandler,
                    inputChangeHandler: handleSelectionsChange
                };
                const paymentMethodFormSettings = getPaymentMethodsFormSettings(
                    checkoutFormsNames.paymentMethod,
                    paymentMethodsParams
                );

                return (
                    <Grid container className={classes.root}>
                        <Grid item xs={12}>
                            <SprykerForm form={paymentMethodFormSettings} formClassName={classes.paymentMethodsForm} />
                            {(currentValuePaymentMethod === checkoutPaymentMethodsNames.invoice) &&
                                <InvoicePaymentForm />
                            }
                            {(currentValuePaymentMethod === checkoutPaymentMethodsNames.creditCard) &&
                                <CreditCardPaymentForm
                                    providersCollection={creditCardProvidersCollection}
                                />
                            }
                        </Grid>
                    </Grid>
                );
            }}
        </CheckoutPageContext.Consumer>
    );
};

export const PaymentMethod = connect(withStyles(formStyles)(PaymentMethodBase));
