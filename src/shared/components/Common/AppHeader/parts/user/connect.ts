import { bindActionCreators, Dispatch } from 'redux';

import { isUserAuthenticated } from 'src/shared/reducers/Pages/Login';
import { getAnonymId } from 'src/shared/reducers/Common/Init';
import { reduxify } from 'src/shared/lib/redux-helper';
import { logout } from 'src/shared/actions/Pages/Login';
import { getGuestCartAction } from 'src/shared/actions/Common/Cart';

const mapStateToProps = (state: any, ownProps: any) => {
  const isUserLoggedIn = isUserAuthenticated(state, ownProps);
  const anonymId = getAnonymId(state, ownProps);

  return ({isUserLoggedIn, anonymId});
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getGuestCartAction,
      logout,
    },
    dispatch,
  );

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
