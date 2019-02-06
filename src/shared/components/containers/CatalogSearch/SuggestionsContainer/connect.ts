import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from 'src/shared/lib/redux-helper';
import { sendSearchAction } from '@stores/actions/pages/search';

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            sendSearchAction
        },
        dispatch,
    );

export const connect = reduxify(null, mapDispatchToProps);
