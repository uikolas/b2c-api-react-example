import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { styles } from './styles';
import {ISearchPagination} from "src/shared/interfaces/searchPageData/index";


export interface FoundItemsProps extends WithStyles<typeof styles> {
  numberFound: ISearchPagination["numFound"];
}

export const FoundItemsBase: React.SFC<FoundItemsProps> = (props) => {
  const {
    classes,
    numberFound,
  } = props;

  return (
    <Grid container
          justify="flex-start"
          alignItems="center"
          className={ classes.root }
    >
      <Grid item xs={ 12 } >
        <Typography color="inherit" paragraph className={ classes.paragraph }>
          {numberFound
            ? `${numberFound} ${(numberFound === 1) ? 'item' : 'items'} found`
            : 'Nothing found'
          }
        </Typography>
      </Grid>
    </Grid>
  );

};

export const FoundItems = withStyles(styles)(FoundItemsBase);
