import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from 'src/application/hoc/Reduxify';

import { logout } from '@stores/actions/pages/login';

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            logout,
        },
        dispatch,
    );

export const connect = reduxify(null, mapDispatchToProps);
