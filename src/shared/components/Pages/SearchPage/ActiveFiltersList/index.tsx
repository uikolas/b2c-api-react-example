import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';

import { styles } from './styles';
import {
  IFilterItem,
  TActiveFilters,
  TFilterItemName,
  TFilterItemValue
} from "src/shared/components/Pages/SearchPage/types";
import {ActiveFilterItem} from "src/shared/components/Pages/SearchPage/ActiveFilterItem/index";
import {AppPageSubTitle} from "src/shared/components/Common/AppPageSubTitle/index";
import {firstLetterToUpperCase} from "src/shared/helpers/common/transform";

interface ActiveFiltersListProps extends WithStyles<typeof styles> {
  activeValuesFilters: TActiveFilters;
  resetHandler: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const title = 'Active Filters';
const resetBtnTitle = 'RESET ALL FILTERS';

export const ActiveFiltersListBase: React.SFC<ActiveFiltersListProps> = (props) => {
  const {classes, activeValuesFilters, resetHandler } = props;

  const itemsGlobalCollection: Array<IFilterItem> = [];
  const transformName = (name: TFilterItemName) => {
    let filterNameParts = name.split('_');
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
        value
      }));
      itemsGlobalCollection.push(...itemsLocalCollection);
    }
  }
  if (!itemsGlobalCollection.length) {
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
             key={`${item.name}-${item.value}`}
             filterValue={item.value}
             filterName={item.name}
             label={`${transformName(item.name)}: ${item.value}`}
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
