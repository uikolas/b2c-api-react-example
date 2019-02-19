import { reduxify } from 'src/shared/components/hoc/Reduxify/index';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { getRouterMatchParam } from '@helpers/router';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const restoreKey = getRouterMatchParam(state, ownProps, 'restoreKey');

    return ({
        restoreKey
    });
};

export const connect = reduxify(mapStateToProps);
