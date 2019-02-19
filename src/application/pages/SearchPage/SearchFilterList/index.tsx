import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import { styles } from './styles';
import { SprykerFilterElement } from 'src/application/components/UI/SprykerFilter/index';
import { ValueFacets } from 'src/interfaces/searchPageData/index';
import { rangeMaxType, rangeMinType, TActiveFilters } from '@components/pages/SearchPage/types';
import { sprykerTheme } from 'src/theme/sprykerTheme';
import { FilterWrapper } from 'src/application/pages/SearchPage/FilterWrapper/index';
import { rangeFilterValueToFront } from 'src/helpers/common/transform';
import { AppPageSubTitle } from 'src/application/components/AppPageSubTitle/index';
import { SprykerRangeSlider } from 'src/application/components/UI/SprykerRangeSlider/index';
import { AppPrice } from 'src/application/components/AppPrice/index';
import { ISearchFilterListProps } from 'src/application/pages/SearchPage/SearchFilterList/types';
import { FormattedMessage } from 'react-intl';

export const SearchFilterListBase: React.SFC<ISearchFilterListProps> = props => {
    const {
        classes,
        filters,
        updateFilterHandler,
        activeValuesFilters,
        ranges,
        activeValuesRanges,
        updateRangeHandler,
        onCloseFilterHandler,
        onAfterChangeRangeFilter,
    } = props;

    let filterItems: JSX.Element[] | null = [];
    let rangeItems: JSX.Element[] | null = [];

    const priceValueFormatter = (value: number) => (
        <AppPrice value={value * 100} extraClassName={classes.priceClassName}/>
    );

    if (!Array.isArray(filters) || !filters.length) {
        filterItems = null;
    } else {
        filters.forEach((filter: ValueFacets) => {
            if (Array.isArray(filter.values) && filter.values.length) {
                filterItems.push(
                    <FilterWrapper
                        filter={
                            <SprykerFilterElement
                                attributeName={filter.name}
                                menuItems={filter.values}
                                activeValues={activeValuesFilters[filter.name] || []}
                                handleChange={updateFilterHandler}
                                extraClassName={classes.filter}
                                isShowSelected={false}
                                handleClose={onCloseFilterHandler}
                                title={filter.localizedName}
                            />
                        }
                        keyValue={filter.name}
                        key={filter.name}
                    />,
                );
            }
        });
    }

    if (!Array.isArray(ranges) || !ranges.length) {
        rangeItems = null;
    } else {
        rangeItems = ranges.filter(item => (
            item.min !== 0 && item.max !== 0 && item.name !== 'rating' // rating filter temporary hidden
        )).map(filter => {
            const valueFrom = rangeFilterValueToFront(filter.min, rangeMinType);
            const valueTo = rangeFilterValueToFront(filter.max, rangeMaxType);

            return (
                <FilterWrapper
                    filter={
                        <SprykerRangeSlider
                            key={filter.name}
                            attributeName={filter.name}
                            title={filter.localizedName}
                            min={valueFrom}
                            max={valueTo}
                            handleChange={updateRangeHandler}
                            handleAfterChange={onAfterChangeRangeFilter}
                            currentValue={activeValuesRanges[filter.name] || {
                                min: valueFrom,
                                max: valueTo,
                            }}
                            valueFormatter={filter.name.includes('price') ? priceValueFormatter : null}
                        />
                    }
                    keyValue={filter.name}
                    key={filter.name}
                />
            );
        });
    }

    const isItemsExist = (filterItems && filterItems.length > 0) || (rangeItems && rangeItems.length > 0);

    return (
        <Grid
            container
            justify="flex-start"
            alignItems="center"
            className={classes.root}
        >
            {isItemsExist
                ? (
                    <Grid item xs={12}>
                        <AppPageSubTitle
                            title={<FormattedMessage id={'category.results.filter.title'} />}
                        />
                    </Grid>
                )
                : null
            }
            <Grid container alignItems="flex-start" spacing={sprykerTheme.appFixedDimensions.gridSpacing}>
                {filterItems}
                {rangeItems}
            </Grid>
        </Grid>
    );
};

export const SearchFilterList = withStyles(styles)(SearchFilterListBase);
