import { bindActionCreators, Dispatch } from 'redux';

import { isUserAuthenticated } from 'src/shared/reducers/Pages/Login';
import { reduxify } from 'src/shared/lib/redux-helper';
import { logout } from 'src/shared/actions/Pages/Login';
import {IReduxOwnProps, IReduxStore} from "src/shared/reducers/types";


const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
  const isUserLoggedIn = isUserAuthenticated(state, ownProps);

  return ({ isUserLoggedIn });
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      logout,
    },
    dispatch,
  );

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
