import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { styles } from './styles';
import {SprykerFilterProps} from "src/shared/components/UI/SprykerFilter/index";


interface SearchFilterListProps extends WithStyles<typeof styles> {
  filters:  Array<React.ComponentType<SprykerFilterProps>>;
}

const title = 'Filter your results';

export const SearchFilterListBase: React.SFC<SearchFilterListProps> = (props) => {
  const { classes, } = props;

  if (!Array.isArray(categoryList) || !categoryList.length) {
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

    </Grid>
  );

};

export const SearchFilterList = withStyles(styles)(SearchFilterListBase);
