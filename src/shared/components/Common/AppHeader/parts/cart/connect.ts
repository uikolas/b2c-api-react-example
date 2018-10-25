import { reduxify } from 'src/shared/lib/redux-helper';
import { getTotalItemsQuantity } from 'src/shared/reducers/Common/Cart';

const mapStateToProps = (state: any, ownProps: any) => ({
  cartItemsQuantity: getTotalItemsQuantity(state, ownProps)
});

export const connect = reduxify(mapStateToProps);
