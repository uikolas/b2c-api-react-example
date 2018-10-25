import { isUserAuthenticated } from 'src/shared/reducers/Pages/Login';
import { reduxify } from 'src/shared/lib/redux-helper';

const mapStateToProps = (state: any, ownProps: any) => {
  const isUserLoggedIn = isUserAuthenticated(state, ownProps);

  return ({isUserLoggedIn});
};

export const connect = reduxify(mapStateToProps);
