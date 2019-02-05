import * as React from 'react';
import { Sticky, StickyChildArgs } from 'react-sticky';
import debounce from 'lodash/debounce';
import { withRouter } from 'react-router';
import withStyles from '@material-ui/core/styles/withStyles';
import { pathCheckoutPage } from 'src/shared/routes/contentRoutes';
import CatalogSearch from '@components/Common/CatalogSearch';
import { LogoWhite } from '@components/components/LogoWhite';
import { MainNavigation } from '@components/containers/MainNavigation';
import { AdditionalNavigation } from './AdditionalNavigation/index';
import { ErrorBoundary } from '@components/hoc/ErrorBoundary';
import { AppHeaderProps as Props, AppHeaderState as State } from './types';
import { styles } from './styles';
import { FormattedMessage } from 'react-intl';

@(withRouter as Function)
export class AppHeaderComponent extends React.PureComponent<Props, State> {
    public state: State = {
        showSearch: true,
        stickyTriggerOffset: 0,
        pageWidth: 0,
        pageHeight: 0
    };

    private stickyTriggerRef: React.RefObject<HTMLDivElement> = React.createRef();

    public componentDidMount() {
        window.addEventListener('resize', this.onWindowResize);
        window.addEventListener('scroll', this.onWindowScroll);
    }

    public componentDidUpdate() {
        this.onWindowResize();
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
        window.removeEventListener('scroll', this.onWindowScroll);
        this.stickyTriggerRef = null;
    }

    private onWindowResize = debounce(() => {
        this.setTriggerOffset();
        this.updateWindowDimensions();
    }, 0.3);

    private onWindowScroll = debounce(() => {
        const {showSearch, stickyTriggerOffset} = this.state;
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        if (showSearch && scrollPosition > stickyTriggerOffset) {
            this.setState(() => ({showSearch: false}));
        }
    }, 0.3);

    private updateWindowDimensions = () => {
        this.setState({pageWidth: window.innerWidth, pageHeight: window.innerHeight});
    };

    private setTriggerOffset = () => {
        const stickyTriggerOffset = this.stickyTriggerRef.current.offsetTop;

        this.setState(() => ({stickyTriggerOffset}));
    };

    private handleSticky = (stickyState: StickyChildArgs) => {
        const {stickyTriggerOffset} = this.state;
        const scrollOffset = stickyState.distanceFromTop * -1;

        this.setState(() => ({showSearch: scrollOffset < stickyTriggerOffset}));
    };

    private handleSearch = () => this.setState(({showSearch}) => ({showSearch: !showSearch}));

    public render() {
        const {classes, isMobileNavOpened, onMobileNavToggle, locale} = this.props;
        const {stickyTriggerOffset, showSearch, pageWidth, pageHeight} = this.state;

        return (
            <Sticky topOffset={stickyTriggerOffset}>
                {(stickyState: StickyChildArgs) => {
                    const {style, isSticky, wasSticky} = stickyState;

                    if (isSticky !== wasSticky) {
                        this.handleSticky(stickyState);
                    }

                    return (
                        <div
                            style={style}
                            className={classes.headerStickyContainer}
                        >
                            <div
                                className={classes.header}
                                style={{
                                    transform: `translate3d(0, -${showSearch ? 0 : stickyTriggerOffset}px, 0)`,
                                    transition: isSticky && wasSticky ? 'transform .3s ease-in-out' : 'none'
                                }}
                            >
                                <div className={classes.headerTop}>
                                    <div className={`${classes.headerContainer} ${classes.headerTopContainer}`}>
                                        <div className={classes.logoContainer}>
                                            <LogoWhite />
                                        </div>

                                        <div className={classes.headerSearchContainer}>
                                            <CatalogSearch id={'2'} locale={locale} />
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.headerBottom} ref={this.stickyTriggerRef}>
                                    <div className={classes.headerContainer}>
                                        <div
                                            className={
                                                `${classes.hamburger} ${
                                                    isMobileNavOpened ? classes.hamburgerOpened : ''
                                                    }`
                                            }
                                            onClick={onMobileNavToggle}
                                        >
                                            <span />
                                            <span />
                                        </div>

                                        {this.props.location.pathname.endsWith(pathCheckoutPage)
                                            ? <div className={classes.checkout}>
                                                <FormattedMessage id="word.checkout.title" />
                                            </div>
                                            : <ErrorBoundary>
                                                <MainNavigation mobileNavState={isMobileNavOpened} />
                                            </ErrorBoundary>
                                        }

                                        <AdditionalNavigation
                                            showSearch={showSearch}
                                            handleSearch={this.handleSearch}
                                            isSticky={isSticky}
                                            pageWidth={pageWidth}
                                            pageHeight={pageHeight}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }}
            </Sticky>
        );
    }
}

export const AppHeader = withStyles(styles)(AppHeaderComponent);
