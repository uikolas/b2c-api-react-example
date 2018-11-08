import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';

import { styles } from './styles';
import {
  filterTypeFilter,
  IFilterItem,
  rangeMaxType,
  rangeMinType,
  TFilterItemValue,
} from "src/shared/components/Pages/SearchPage/types";
import {ActiveFilterItem} from "src/shared/components/Pages/SearchPage/ActiveFilterItem/index";
import {AppPageSubTitle} from "src/shared/components/Common/AppPageSubTitle/index";
import {isWordHasPrice, rangeFilterValueToFront} from "src/shared/helpers/common/transform";
import {RangeFacets} from "src/shared/interfaces/searchPageData/index";
import {createRangeFilterItem, transformName} from "src/shared/components/Pages/SearchPage/ActiveFiltersList/helper";
import {IActiveFiltersListProps} from "src/shared/components/Pages/SearchPage/ActiveFiltersList/types";


const title = 'Active Filters';
const resetBtnTitle = 'RESET ALL FILTERS';

export const ActiveFiltersListBase: React.SFC<IActiveFiltersListProps> = (props) => {
  const {
    classes,
    activeValuesFilters,
    activeValuesRanges,
    rangeFilters,
    resetHandler,
  } = props;

  const isActiveRangesExist = ((Object.getOwnPropertyNames(activeValuesRanges).length > 0));
  const itemsGlobalCollection: Array<IFilterItem> = [];

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

        let isPrice = false;
        if (isWordHasPrice(rangeName)) {
          isPrice = true;
        }
        const valueFrom = activeValuesRanges[rangeName].min;
        const valueTo = activeValuesRanges[rangeName].max;
        const defaultFrom =  rangeFilterValueToFront(defaultValuesArr[0].min, rangeMinType);
        const defaultTo = rangeFilterValueToFront(defaultValuesArr[0].max, rangeMaxType);

        if(defaultFrom !==  valueFrom && valueFrom > 0) {
          itemsGlobalCollection.push(
            createRangeFilterItem(isPrice, true, rangeName, valueFrom, classes.price)
          );
        }
        if(defaultTo !==  valueTo && valueTo > 0) {
          itemsGlobalCollection.push(
            createRangeFilterItem(isPrice, false, rangeName, valueTo, classes.price)
          );
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
             key={`${item.name}-${item.value}${item.rangeSubType ? item.rangeSubType : ''}`}
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
