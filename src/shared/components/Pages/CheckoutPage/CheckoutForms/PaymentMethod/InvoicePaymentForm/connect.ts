import { reduxify } from 'src/shared/lib/redux-helper';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import {
    getPaymentMethodsFromStore,
} from '@stores/reducers/pages/checkout';
import { IPaymentMethod } from '@interfaces/checkout';
import {
    mutateStateInvoiceFormAction,
    mutatePaymentSectionAction,
} from '@stores/actions/pages/checkout';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const paymentInvoiceData = state.pageCheckout.paymentInvoiceData;

    return {
        paymentInvoiceData,

    };
};

const mapDispatchToProps = (dispatch: Function) => ({
    dispatch,
    mutateStateInvoiceForm: (payload: any): void => {
        dispatch(mutateStateInvoiceFormAction(payload));
    },
    mutatePaymentSection: (payload: boolean): void => {
        dispatch(mutatePaymentSectionAction(payload));
    },
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
