import { formStyles } from '@components/Pages/CheckoutPage/CheckoutForms/styles';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { IPaymentMethod } from '@interfaces/checkout';
import { ICheckoutCreditCardState, ICheckoutInvoiceState } from '@components/Pages/CheckoutPage/types';

interface IMutatePaymentMethod {
    value: string;
    isFourthStepCompleted: boolean;
}

export interface IPaymentMethodProps extends WithStyles<typeof formStyles> {
    paymentMethod: IPaymentMethod['paymentMethodName'] | null;
    paymentMethods: IPaymentMethod[] | null;
    paymentCreditCardData: ICheckoutCreditCardState;
    paymentInvoiceData: ICheckoutInvoiceState;
    mutatePaymentMethod: (IMutatePaymentMethod) => void;
}
