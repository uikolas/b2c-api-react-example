import { reduxify } from 'src/shared/lib/redux-helper';
import {getTotalItemsQuantity, getTotalProductsQuantity} from "@stores/reducers/common/cart/selectors";
import {IReduxOwnProps, IReduxStore} from "src/shared/stores/reducers/types";

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => ({
  cartItemsQuantity: getTotalItemsQuantity(state, ownProps),
  cartProductsQuantity: getTotalProductsQuantity(state, ownProps),
});

export const connect = reduxify(mapStateToProps);
