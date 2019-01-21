import { reduxify } from 'src/shared/lib/redux-helper';
import {getTotalItemsQuantity, getTotalProductsQuantity} from "@stores/reducers/common/cart/selectors";


const mapStateToProps = (state: any, ownProps: any) => ({
  cartItemsQuantity: getTotalItemsQuantity(state, ownProps),
  cartProductsQuantity: getTotalProductsQuantity(state, ownProps),
});

export const connect = reduxify(mapStateToProps);
