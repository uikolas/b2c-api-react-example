import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { styles } from './styles';
import {IFilterItem, TActiveFilters, TFilterItemValue} from "src/shared/components/Pages/SearchPage/types";
import {ActiveFilterItem} from "src/shared/components/Pages/SearchPage/ActiveFilterItem/index";

interface ActiveFiltersListProps extends WithStyles<typeof styles> {
  activeValuesFilters: TActiveFilters;
}

const title = 'Active Filters';


export const ActiveFiltersListBase: React.SFC<ActiveFiltersListProps> = (props) => {
  const {classes, activeValuesFilters } = props;

  const itemsGlobalCollection: Array<IFilterItem> = [];

  for (let filter in activeValuesFilters) {
    if (Array.isArray(activeValuesFilters[filter]) && activeValuesFilters[filter].length) {
      const itemsLocalCollection =  activeValuesFilters[filter].map((value: TFilterItemValue) => ({
        name: filter,
        value
      }));
      itemsGlobalCollection.push(...itemsLocalCollection);
    }

  }

  console.log('itemsGlobalCollection ', itemsGlobalCollection);

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
        <Typography component="h2" color="inherit" className={classes.title}>
          {title}
        </Typography>
      </Grid>

      <Grid container
            justify="flex-start"
            alignItems="center"
            className={ classes.list }
      >
       {itemsGlobalCollection.map((item: IFilterItem) => (
         <ActiveFilterItem
           key={`${item.name}-${item.value}`}
           filterValue={item.value}
           filterName={item.name}
         />)
       )}

      </Grid>

    </Grid>
  );
};

export const ActiveFiltersList = withStyles(styles)(ActiveFiltersListBase);
