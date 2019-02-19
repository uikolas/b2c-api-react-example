import * as React from 'react';
import { connect } from './connect';
import { StickyContainer } from 'react-sticky';
import { addLocaleData, IntlProvider } from 'react-intl';
import { withRouter } from 'react-router';
import { getContentRoutes } from '@components/components/Routes';
import { pathCategoryPageBase, pathSearchPage } from '@constants/routes';
import { AppHeader } from 'src/shared/components/containers/AppHeader';
import { AppFooter } from 'src/shared/components/components/AppFooter';
import { getLocaleData } from 'src/shared/helpers/locale';
import { Notifications } from 'src/shared/components/components/Notifications';
import { messages } from 'src/shared/translation';
import {
    IPageContentProps as Props,
    IPageContentState as State
} from './types';
import { ErrorBoundary } from '@components/hoc/ErrorBoundary';

const styles = require('./style.scss');
const className = styles.pageContent;

@connect
@(withRouter as Function)
export class PageContent extends React.Component<Props, State> {
    public state: State = {
        mobileNavOpened: false
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
                customerRef
            });
        }

        if (!this.props.isAppDataSet) {
            this.props.initApplicationData(null);

            return;
        }
    }

    public componentDidUpdate(prevProps: Props, prevState: State) {
        this.clearFlyoutSearchHandler(prevProps);

        if (!prevProps.isAppDataSet && this.props.isAppDataSet) {
            if (this.props.isCustomerAuth) {
                this.props.getCustomerCart();
            } else {
                this.props.getGuestCart(this.props.anonymId);
            }
        }
    }

    private clearFlyoutSearchHandler = (prevProps: Props): void => {
        if (this.props.location.pathname !== prevProps.location.pathname
            && this.props.location.pathname.includes(pathCategoryPageBase) === false
            && this.props.location.pathname.includes(pathSearchPage) === false
        ) {
            this.props.clearSearchTerm();
        }
    };

    private isDataFulfilled = () => (
        Boolean(this.props.cartCreated && this.props.isInitStateFulfilled)
    );

    private mobileNavToggle = () => this.setState(({ mobileNavOpened }) => ({ mobileNavOpened: !mobileNavOpened }));

    public render(): JSX.Element {
        const { isLoading, locale } = this.props;
        const { mobileNavOpened } = this.state;
        addLocaleData(getLocaleData(locale));

        return (
            <IntlProvider locale={ locale } messages={ messages[ locale ] }>
                <div className={ className }>
                    <StickyContainer>
                        <AppHeader
                            isLoading={ isLoading }
                            onMobileNavToggle={ this.mobileNavToggle }
                            isMobileNavOpened={ mobileNavOpened }
                        />
                        <ErrorBoundary>
                            {getContentRoutes(this.isDataFulfilled())}
                        </ErrorBoundary>
                        <Notifications />
                        <AppFooter/>
                    </StickyContainer>
                </div>
            </IntlProvider>
        );
    }
}
