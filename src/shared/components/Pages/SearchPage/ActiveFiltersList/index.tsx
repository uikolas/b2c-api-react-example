import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';

import { styles } from './styles';
import {
  filterTypeFilter,
  filterTypeRange,
  IFilterItem, rangeMaxType, rangeMinType,
  TActiveFilters,
  TActiveRangeFilters,
  TFilterItemName,
  TFilterItemValue,
} from "src/shared/components/Pages/SearchPage/types";
import {ActiveFilterItem} from "src/shared/components/Pages/SearchPage/ActiveFilterItem/index";
import {AppPageSubTitle} from "src/shared/components/Common/AppPageSubTitle/index";
import {firstLetterToUpperCase} from "src/shared/helpers/common/transform";
import {RangeFacets} from "src/shared/interfaces/searchPageData/index";

interface ActiveFiltersListProps extends WithStyles<typeof styles> {
  activeValuesFilters: TActiveFilters;
  activeValuesRanges: TActiveRangeFilters;
  rangeFilters?: Array<RangeFacets>;
  resetHandler: (event: React.MouseEvent<HTMLDivElement>) => void;
  numberToPrice: Function;
}

const title = 'Active Filters';
const resetBtnTitle = 'RESET ALL FILTERS';

export const ActiveFiltersListBase: React.SFC<ActiveFiltersListProps> = (props) => {
  const {classes, activeValuesFilters, activeValuesRanges, rangeFilters, resetHandler, numberToPrice } = props;

  const isActiveRangesExist = ((Object.getOwnPropertyNames(activeValuesRanges).length > 0));
  const itemsGlobalCollection: Array<IFilterItem> = [];

  const transformName = (name: TFilterItemName, separator: string) => {
    let filterNameParts = name.split(separator);
    if (filterNameParts.length <= 0) {
      return name;
    }
    filterNameParts[0] = firstLetterToUpperCase(filterNameParts[0]);
    return filterNameParts.join(' ');
  };

  for (let filter in activeValuesFilters) {
    if (Array.isArray(activeValuesFilters[filter]) && activeValuesFilters[filter].length) {
      const itemsLocalCollection =  activeValuesFilters[filter].map((value: TFilterItemValue) => ({
        name: filter,
        value,
        label: `${transformName(filter, '_')}: ${value}`,
        type: filterTypeFilter,
      }));
      itemsGlobalCollection.push(...itemsLocalCollection);
    }
  }

  if (isActiveRangesExist && rangeFilters) {

    for (let rangeName in activeValuesRanges) {
      const defaultValuesArr = rangeFilters.filter((item: RangeFacets) => (item.name === rangeName));
      if (defaultValuesArr && defaultValuesArr[0]) {

        const valueFrom = activeValuesRanges[rangeName].min;
        const valueTo = activeValuesRanges[rangeName].max;
        if(numberToPrice(defaultValuesArr[0].min) !==  valueFrom) {
          itemsGlobalCollection.push({
            name: rangeName,
            value: activeValuesRanges[rangeName].min,
            label: `${firstLetterToUpperCase(rangeName)} from: ${valueFrom}`,
            type: filterTypeRange,
            rangeSubType: rangeMinType,
          });
        }
        if(numberToPrice(defaultValuesArr[0].max) !==  valueTo) {
          itemsGlobalCollection.push({
            name: rangeName,
            value: activeValuesRanges[rangeName].max,
            label: `${firstLetterToUpperCase(rangeName)} to: ${valueTo}`,
            type: filterTypeRange,
            rangeSubType: rangeMaxType,
          });
        }

      }
    }
  }

  const isActiveGlobalCollectionExist = (itemsGlobalCollection.length > 0);

  if (!isActiveGlobalCollectionExist) {
    return null;
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

      <Grid container
            justify="flex-start"
            alignItems="center"
            className={ classes.list }
      >
       {itemsGlobalCollection.map((item: IFilterItem) => {
         return (
           <ActiveFilterItem
             key={item.label}
             value={item.value}
             name={item.name}
             label={item.label}
             type={item.type}
             rangeSubType={item.rangeSubType}
           />
         );
       })
       }
        <Chip
          label={resetBtnTitle}
          className={`${classes.reset}`}
          onClick={resetHandler}
          classes={{label: classes.resetLabel}}
        />

      </Grid>

    </Grid>
  );
};

export const ActiveFiltersList = withStyles(styles)(ActiveFiltersListBase);
