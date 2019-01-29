import { reduxify } from 'src/shared/lib/redux-helper';
import { getTotalItemsQuantity, getTotalProductsQuantity } from '@stores/reducers/common/cart/selectors';
import { IReduxOwnProps, IReduxStore } from 'src/shared/stores/reducers/types';
import { getAppLocale } from '@stores/reducers/common/init';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => ({
    cartItemsQuantity: getTotalItemsQuantity(state, ownProps),
    cartProductsQuantity: getTotalProductsQuantity(state, ownProps),
    locale: getAppLocale(state, ownProps)
});

export const connect = reduxify(mapStateToProps);
