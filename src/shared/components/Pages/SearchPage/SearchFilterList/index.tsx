import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { styles } from './styles';
import {SprykerFilterElement} from "src/shared/components/UI/SprykerFilter/index";
import {RangeFacets, ValueFacets} from "src/shared/interfaces/searchPageData/index";
import {RangeType} from "src/shared/components/Pages/SearchPage/types";
import {SprykerRange} from "src/shared/components/UI/SprykerRangeFilter/index";
import {sprykerTheme} from "src/shared/theme/sprykerTheme";


interface SearchFilterListProps extends WithStyles<typeof styles> {
  filters:  Array<ValueFacets>;
  updateFilterHandler: Function;
  activeValuesFilters: {[name: string]: string[]};
  ranges: Array<RangeFacets>;
  activeValuesRanges: {[name: string]: RangeType};
  updateRangeHandler: Function;
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
  } = props;

  const ItemWrapper = ({item, keyValue}: {item: JSX.Element, keyValue: string}): JSX.Element => {
    return (
      <Grid item xs={4} key={keyValue}>
        {item}
      </Grid>
    );
  };

  let filterItems: any[] | null = [];
  let rangeItems: any[] | null = [];

  if (!Array.isArray(filters) || !filters.length) {
    filterItems = null;
  } else {
    filters.forEach((filter: ValueFacets) => {
      if (Array.isArray(filter.values) && filter.values.length) {
        filterItems.push(
          <ItemWrapper
            item={ <SprykerFilterElement
                      attributeName={ filter.name }
                      menuItems={ filter.values }
                      activeValues={ activeValuesFilters[filter.name] || [] }
                      handleChange={ updateFilterHandler }
                      extraClassName={classes.filter}
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
    rangeItems = ranges.map((filter: RangeFacets) => (
      <ItemWrapper
        item={ <SprykerRange
                  attributeName={ filter.name }
                  min={ filter.min / 100 }
                  max={ filter.max / 100 }
                  currentValue={ activeValuesRanges[filter.name] || {
                    min: filter.min / 100,
                    max: filter.max / 100,
                  } }
                  handleChange={ updateRangeHandler }
        />}
        keyValue={filter.name}
        key={filter.name}
      />
    ));
  }

  return (
    <Grid container
          justify="flex-start"
          alignItems="center"
          className={ classes.root }
    >
      <Grid item xs={ 12 }>
        <Typography component="h2" color="inherit" className={classes.title}>
          {title}
        </Typography>
      </Grid>

      <Grid container alignItems="flex-start" spacing={ sprykerTheme.appFixedDimensions.gridSpacing }>
        {filterItems}
        {rangeItems}
      </Grid>

    </Grid>
  );

};

export const SearchFilterList = withStyles(styles)(SearchFilterListBase);
