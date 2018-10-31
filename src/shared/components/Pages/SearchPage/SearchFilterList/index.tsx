import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import { styles } from './styles';
import {SprykerFilterElement} from "src/shared/components/UI/SprykerFilter/index";
import {RangeFacets, ValueFacets} from "src/shared/interfaces/searchPageData/index";
import {TActiveFilters, TActiveRangeFilters} from "src/shared/components/Pages/SearchPage/types";
import {SprykerRange} from "src/shared/components/UI/SprykerRangeFilter/index";
import {sprykerTheme} from "src/shared/theme/sprykerTheme";
import {FilterWrapper} from "src/shared/components/Pages/SearchPage/FilterWrapper/index";
import {firstLetterToUpperCase} from "src/shared/helpers/common/transform";
import {AppPageSubTitle} from "src/shared/components/Common/AppPageSubTitle/index";


interface SearchFilterListProps extends WithStyles<typeof styles> {
  filters:  Array<ValueFacets>;
  updateFilterHandler: Function;
  activeValuesFilters: TActiveFilters;
  ranges: Array<RangeFacets>;
  activeValuesRanges: TActiveRangeFilters;
  updateRangeHandler: Function;
  onCloseFilterHandler: Function;
  onBlurRangeFilter: (event: any) => void;
  rangeValueToFront: Function;
  isFiltersReset: boolean;
}

const title = 'Filter your results';

export const SearchFilterListBase: React.SFC<SearchFilterListProps> = (props) => {
  const {
    classes,
    filters,
    updateFilterHandler,
    activeValuesFilters,
    ranges,
    activeValuesRanges,
    updateRangeHandler,
    onCloseFilterHandler,
    onBlurRangeFilter,
    rangeValueToFront,
    isFiltersReset,
  } = props;

  let filterItems: any[] | null = [];
  let rangeItems: any[] | null = [];

  if (!Array.isArray(filters) || !filters.length) {
    filterItems = null;
  } else {
    filters.forEach((filter: ValueFacets) => {
      if (Array.isArray(filter.values) && filter.values.length) {
        filterItems.push(
          <FilterWrapper
            filter={ <SprykerFilterElement
                        attributeName={ filter.name }
                        menuItems={ filter.values }
                        activeValues={ activeValuesFilters[filter.name] || [] }
                        handleChange={ updateFilterHandler }
                        extraClassName={classes.filter}
                        isShowSelected={false}
                        handleClose={onCloseFilterHandler}
                      />
            }
            keyValue={filter.name}
            key={filter.name}
          />
        );
      }
    });
  }

  if (!Array.isArray(ranges) || !ranges.length) {
    rangeItems = null;
  } else {
    rangeItems = ranges.map((filter: RangeFacets) => {
      return (
        <SprykerRange
          key={filter.name}
          attributeName={ filter.name}
          title={firstLetterToUpperCase(filter.name)}
          min={ rangeValueToFront(filter.min) }
          max={ rangeValueToFront(filter.max) }
          currentValue={ activeValuesRanges[filter.name] || {
            min: rangeValueToFront(filter.min),
            max: rangeValueToFront(filter.max),
          } }
          handleChange={ updateRangeHandler }
          Wrapper={FilterWrapper}
          handleBlur={onBlurRangeFilter}
          isReset={isFiltersReset}
        />
      );
    });
  }

  return (
    <Grid container
          justify="flex-start"
          alignItems="center"
          className={ classes.root }
    >
      <Grid item xs={ 12 }>
        <AppPageSubTitle title={title} />
      </Grid>

      <Grid container alignItems="flex-start" spacing={ sprykerTheme.appFixedDimensions.gridSpacing }>
        {filterItems}
        {rangeItems}
      </Grid>

    </Grid>
  );

};

export const SearchFilterList = withStyles(styles)(SearchFilterListBase);
