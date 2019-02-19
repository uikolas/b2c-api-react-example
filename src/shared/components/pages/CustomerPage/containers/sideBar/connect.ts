import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from 'src/shared/components/hoc/Reduxify/index';

import { logout } from '@stores/actions/pages/login';

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            logout,
        },
        dispatch,
    );

export const connect = reduxify(null, mapDispatchToProps);
