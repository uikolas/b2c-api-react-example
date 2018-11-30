import { reduxify } from 'src/shared/lib/redux-helper';
import { isUserAuthenticated } from 'src/shared/reducers/Pages/Login';
import {isAppStateFulfilled} from "src/shared/reducers/Common/Init";

const mapStateToProps = (state: any, ownProps: any) => {
  const isUserLoggedIn = isUserAuthenticated(state, ownProps);
  const isInitStateFulfilled: boolean = isAppStateFulfilled(state, ownProps);

  return ({isUserLoggedIn, isInitStateFulfilled});
};

export const connect = reduxify(mapStateToProps);
