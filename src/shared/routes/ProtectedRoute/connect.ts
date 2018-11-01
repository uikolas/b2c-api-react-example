import { reduxify } from 'src/shared/lib/redux-helper';
import { isUserAuthenticated } from 'src/shared/reducers/Pages/Login';

const mapStateToProps = (state: any, ownProps: any) => {
  const isUserLoggedIn = isUserAuthenticated(state, ownProps);

  return ({isUserLoggedIn});
};

export const connect = reduxify(mapStateToProps);
