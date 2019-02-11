import { reduxify } from 'src/shared/lib/redux-helper';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import {
    mutatePaymentSectionAction,
    mutateStateCreditCardAction
} from '@stores/actions/pages/checkout';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const paymentCreditCardData = state.pageCheckout.paymentCreditCardData;

    return {
        paymentCreditCardData

    };
};

const mapDispatchToProps = (dispatch: Function) => ({
    dispatch,
    mutateStateCreditCard: (payload: any): void => {
        dispatch(mutateStateCreditCardAction(payload));
    },
    mutatePaymentSection: (payload: boolean): void => {
        dispatch(mutatePaymentSectionAction(payload));
    },
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
