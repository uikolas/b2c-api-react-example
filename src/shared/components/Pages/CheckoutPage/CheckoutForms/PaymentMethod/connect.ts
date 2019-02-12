import { reduxify } from 'src/shared/lib/redux-helper';
import {
    getPaymentMethodsFromStore,
} from '@stores/reducers/pages/checkout/selectors';
import {
    mutatePaymentMethodAction,
    mutateStateInvoiceFormAction,
    mutatePaymentSectionAction,
    mutateStateCreditCardAction
} from '@stores/actions/pages/checkout';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import {
    ICheckoutCreditCardState,
    ICheckoutInvoiceState,
    IPaymentMethod
} from '@interfaces/checkout';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const paymentMethods: IPaymentMethod[] | null = getPaymentMethodsFromStore(state, ownProps);
    const paymentMethod: IPaymentMethod['paymentMethodName'] | null = state.pageCheckout.paymentMethod;
    const paymentInvoiceData: ICheckoutInvoiceState = state.pageCheckout.paymentInvoiceData;
    const paymentCreditCardData: ICheckoutCreditCardState = state.pageCheckout.paymentCreditCardData;

    return {
        paymentMethod,
        paymentMethods,
        paymentInvoiceData,
        paymentCreditCardData

    };
};

const mapDispatchToProps = (dispatch: Function) => ({
    dispatch,
    mutatePaymentMethod: (payload: string): void => {
        dispatch(mutatePaymentMethodAction(payload));
    },
    mutateStateInvoiceForm: (payload: any): void => {
        dispatch(mutateStateInvoiceFormAction(payload));
    },
    mutatePaymentSection: (payload: boolean): void => {
        dispatch(mutatePaymentSectionAction(payload));
    },
    mutateStateCreditCard: (payload: any): void => {
        dispatch(mutateStateCreditCardAction(payload));
    },
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
