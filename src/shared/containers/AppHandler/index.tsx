import * as React from 'react';
import { StickyContainer } from 'react-sticky';
import { Slide, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { addLocaleData, IntlProvider } from 'react-intl';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { IComponent } from 'src/typings/app';
import { getContentRoutes } from 'src/shared/routes/contentRoutes';
import { AppHeader } from 'src/shared/components/Common/AppHeader';
import { AppFooter } from 'src/shared/components/Common/AppFooter';
import { isStateLoading } from 'src/shared/reducers';
import { reduxify } from 'src/shared/lib/redux-helper';
import { getAppLocale, isAppInitiated, TAppLocale } from 'src/shared/reducers/Common/Init';
import { isUserAuthenticated } from 'src/shared/reducers/Pages/Login';
import { getLocaleData } from 'src/shared/helpers/locale';
import { APP_LOCALE_DEFAULT } from 'src/shared/constants/Environment';
import { initApplicationDataAction, setAuthFromStorageAction } from 'src/shared/actions/Common/Init';
import { getCustomerCartsAction, getGuestCartAction } from 'src/shared/actions/Common/Cart';
import { sprykerTheme } from 'src/shared/theme/sprykerTheme';

const styles = require('./style.scss');
const className = styles.appHandler;

interface AppHandlerProps extends IComponent {
  dispatch: Function;
  isLoading: boolean;
  locale: TAppLocale;
  initApplicationData: Function;
  setAuth: Function;
  getCustomerCart: Function;
  getGuestCart: Function;
  isAppDataSet: boolean;
  isCustomerAuth: boolean;
}

interface AppHandlerState {
  mobileNavOpened: boolean;
}

export class AppHandlerBase extends React.Component<AppHandlerProps, AppHandlerState> {
  public state: AppHandlerState = {
    mobileNavOpened: false,
  };

  public componentDidMount() {
    const accessToken: string = localStorage.getItem('accessToken');
    const expiresIn: string = localStorage.getItem('tokenExpire');
    const refreshToken: string = localStorage.getItem('refreshToken');
    const customerRef: string = localStorage.getItem('customerRef');

    if (accessToken && expiresIn && refreshToken) {
      this.props.setAuth({
        accessToken,
        expiresIn,
        refreshToken,
        customerRef,
      });
    }

    if (!this.props.isAppDataSet) {
      this.props.initApplicationData(null);
      return;
    }
  }

  public componentDidUpdate(prevProps: AppHandlerProps) {
    if (!prevProps.isAppDataSet && this.props.isAppDataSet) {
      if (this.props.isCustomerAuth) {
        this.props.getCustomerCart();
      } else {
        this.props.getGuestCart();
      }
    }
  }

  private mobileNavToggle = () => this.setState(({mobileNavOpened}) => ({mobileNavOpened: !mobileNavOpened}));

  public render(): JSX.Element {
    const {isLoading, locale} = this.props;
    const {mobileNavOpened} = this.state;
    addLocaleData(getLocaleData(locale));

    return (
      <MuiThemeProvider theme={ sprykerTheme }>
        <IntlProvider locale={ locale } key={ locale }>
          <div className={ className }>
            <CssBaseline/>
            <StickyContainer>
              <AppHeader
                isLoading={ isLoading }
                onMobileNavToggle={ this.mobileNavToggle }
                isMobileNavOpened={ mobileNavOpened }
              />
              { getContentRoutes() }
              <ToastContainer
                autoClose={ 3000 }
                transition={ Slide }
                position={ toast.POSITION.BOTTOM_LEFT }
                pauseOnHover={ true }
                style={ {
                  width: '90%',
                  left: 0,
                } }
              />
              <AppFooter/>
            </StickyContainer>
          </div>
        </IntlProvider>
      </MuiThemeProvider>
    );
  }
}

export const AppHandler = reduxify(
  (state: any, ownProps: any) => {
    const isLoading = isStateLoading(state, ownProps) || ownProps.pending || false;
    const locale = getAppLocale(state, ownProps) || APP_LOCALE_DEFAULT;
    const isAppDataSet: boolean = isAppInitiated(state, ownProps);
    const isCustomerAuth: boolean = isUserAuthenticated(state, ownProps);

    return ({
      isLoading,
      locale,
      isAppDataSet,
      isCustomerAuth,
    });
  },
  (dispatch: Function) => ({
    dispatch,
    initApplicationData: (payload: any) => dispatch(initApplicationDataAction(payload)),
    setAuth: (payload: any) => dispatch(setAuthFromStorageAction(payload)),
    getCustomerCart: () => dispatch(getCustomerCartsAction()),
    getGuestCart: () => dispatch(getGuestCartAction()),
  }),
)(AppHandlerBase);
