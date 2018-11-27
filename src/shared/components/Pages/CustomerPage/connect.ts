import { bindActionCreators, Dispatch } from 'redux';

import { reduxify } from 'src/shared/lib/redux-helper';
import { logout } from 'src/shared/actions/Pages/Login';
import { getRouterLocation } from 'src/shared/selectors/Common/router';

const mapStateToProps = (state: any, ownProps: any) => {
  const location = getRouterLocation(state, ownProps);

  return ({ location });
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    { logout },
    dispatch,
  );

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
