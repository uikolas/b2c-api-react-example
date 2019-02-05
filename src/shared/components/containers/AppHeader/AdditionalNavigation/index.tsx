import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Search from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton/IconButton';
import { LanguageSwitcher } from '@components/containers/LanguageSwitcher';
import { UserDropNavigation } from '@components/containers/UserDropNavigation';
import { MiniCartDropDown } from '@components/containers/MiniCartDropDown';
import { AddNavProps as Props } from './types';
import { styles } from './styles';
import { appContainerStyles } from 'src/shared/theme/properties/new/appContainerStyles';
import { appFixedDimensions } from 'src/shared/theme/properties/new/appFixedDimensions';
import { ErrorBoundary } from '@components/hoc/ErrorBoundary';

export const AdditionalNavigationComponent: React.SFC<Props> = props => {
    const {classes, showSearch, handleSearch, isSticky, pageWidth} = props;

    const getPopoverPosition = (
        {
            pageWidth,
            isSticky,
            showSearch,
            overFlow,
            popoverWidth
        }: {
            pageWidth: number;
            isSticky: boolean;
            showSearch: boolean;
            overFlow: number;
            popoverWidth: number;
        }): {top: number; left: number} => {

        const {headerHeight, customBreakpoints} = appFixedDimensions;
        const containerWidth = Number(appContainerStyles.maxWidth);
        const margin = (pageWidth - containerWidth) / 2;
        const overFlowNumber = (pageWidth < customBreakpoints.tablet ? 0 : overFlow);
        const fullHeaderHeight = pageWidth < customBreakpoints.smallTablet
            ? headerHeight.tablet
            : headerHeight.desktop;

        const popoverPosLeft: number = margin + containerWidth - popoverWidth + overFlowNumber;
        let popoverPosTop: number = headerHeight.sticky;
        if (showSearch) {
            popoverPosTop = fullHeaderHeight;
        } else if (isSticky && !showSearch) {
            popoverPosTop = headerHeight.sticky;
        }

        return {
            top: popoverPosTop,
            left: popoverPosLeft
        };
    };

    const popoverCartPos = getPopoverPosition({
        pageWidth,
        isSticky,
        showSearch,
        overFlow: appFixedDimensions.headerPopover.overFlow,
        popoverWidth: appFixedDimensions.cartDrop.width
    });

    const popoverUserPos = getPopoverPosition({
        pageWidth,
        isSticky,
        showSearch,
        overFlow: appFixedDimensions.headerPopover.overFlow,
        popoverWidth: appFixedDimensions.userDrop.width
    });

    return (
        <div className={classes.addNavContainer}>
            <div className={`${classes.addNavItem} ${showSearch ? classes.addNavSearch : ''}`}>
                <IconButton onClick={handleSearch} aria-label="Search">
                    <Search />
                </IconButton>
            </div>
            <div className={classes.addNavItem}>
                <ErrorBoundary>
                    <LanguageSwitcher />
                </ErrorBoundary>
            </div>
            <div className={classes.addNavItem}>
                <ErrorBoundary>
                    <UserDropNavigation
                        popoverPosLeft={popoverUserPos.left}
                        popoverPosTop={popoverUserPos.top}
                    />
                </ErrorBoundary>
            </div>
            <div className={classes.addNavItem}>
                <ErrorBoundary>
                    <MiniCartDropDown
                        popoverPosLeft={popoverCartPos.left}
                        popoverPosTop={popoverCartPos.top}
                    />
                </ErrorBoundary>
            </div>
        </div>
    );
};

export const AdditionalNavigation = withStyles(styles)(AdditionalNavigationComponent);
