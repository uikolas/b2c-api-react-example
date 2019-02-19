import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from 'src/shared/components/hoc/Reduxify/index';

import { addWishlistAction } from '@stores/actions/pages/wishlist';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            addWishlistAction
        },
        dispatch,
    );

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
