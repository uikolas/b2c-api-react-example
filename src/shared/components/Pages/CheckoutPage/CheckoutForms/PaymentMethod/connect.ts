import { reduxify } from 'src/shared/lib/redux-helper';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import {
    getPaymentMethodsFromStore,
} from '@stores/reducers/pages/checkout';
import { IPaymentMethod } from '@interfaces/checkout';
import {
    mutatePaymentMethodAction,
    mutateStateInvoiceFormAction,
    mutatePaymentSectionAction,
    mutateStateCreditCardAction
} from '@stores/actions/pages/checkout';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const paymentMethods: IPaymentMethod[] | null = getPaymentMethodsFromStore(state, ownProps);
    const paymentMethod = state.pageCheckout.paymentMethod;
    const paymentInvoiceData = state.pageCheckout.paymentInvoiceData;
    const paymentCreditCardData = state.pageCheckout.paymentCreditCardData;

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
