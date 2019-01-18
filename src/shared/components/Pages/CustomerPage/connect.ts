import { bindActionCreators, Dispatch } from 'redux';

import { reduxify } from 'src/shared/lib/redux-helper';
import { logout } from '@stores/actions/pages/login';
import { isUserAuthenticated } from '@stores/reducers/pages/login';


const mapStateToProps = (state: any, ownProps: any) => {
  const isUserLoggedIn: boolean = isUserAuthenticated(state, ownProps);

  return ({
    isUserLoggedIn,
  });
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      logout,
    },
    dispatch,
  );

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
