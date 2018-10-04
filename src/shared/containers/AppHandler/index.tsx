import * as React from 'react';
import { ToastContainer, Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { IntlProvider, addLocaleData } from 'react-intl';

import {IComponent} from "../../../typings/app";
import {getContentRoutes} from '../../routes/contentRoutes';
import {AppHeader} from '../../components/Common/AppHeader';
import {isStateLoading} from "../../reducers/index";
import {reduxify} from "../../lib/redux-helper";
import {getAppLocale, isAppInitiated, TAppLocale} from "../../reducers/Common/Init";
import {getLocaleData} from "../../services/localeHelper/index";
import {APP_LOCALE_DEFAULT} from "../../constants/Environment/index";
import {initApplicationDataAction} from "../../actions/Common/Init";

const styles = require('./style.scss');
// console.info('primary', styles.primary); // -> #BF4040
// console.info('secondary', styles.secondary); // -> #1F4F7F
const className = styles.appHandler;

interface AppHandlerProps extends IComponent {
  isLoading: boolean;
  locale: TAppLocale;
  initApplicationData: Function;
  isAppDataSet: boolean;
}

interface AppHandlerState {
}
export class AppHandlerBase extends React.Component<AppHandlerProps, AppHandlerState> {

  public componentDidMount = () => {
    if (!this.props.isAppDataSet) {
      this.props.initApplicationData(null);
      return;
    }
  }

  public render(): JSX.Element {
    const {isLoading, locale} = this.props;
    addLocaleData(getLocaleData(locale));

    return (
      <IntlProvider locale={locale} key={locale}>
        <div className={className}>
          <CssBaseline />
          <AppHeader isLoading={isLoading} />
          {getContentRoutes()}
          <ToastContainer
            autoClose={3000}
            transition={Slide}
            position={toast.POSITION.BOTTOM_LEFT}
            pauseOnHover={true}
            style={{
              width: '90%',
              left: 0,
            }}
          />
        </div>
      </IntlProvider>
    );
  }
}

export const AppHandler = reduxify(
  (state: any, ownProps: any) => {
    const isLoading = isStateLoading(state, ownProps) || ownProps.pending || false;
    const locale = getAppLocale(state, ownProps) || APP_LOCALE_DEFAULT;
    const isAppDataSet: boolean = isAppInitiated(state, ownProps);

    return ({
      isLoading,
      locale,
      isAppDataSet,
    });
  },
  (dispatch: Function) => ({
    dispatch,
    initApplicationData: (payload: any) => dispatch(initApplicationDataAction(payload)),
  }),
)(AppHandlerBase);
