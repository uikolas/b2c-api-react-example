import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import { styles } from './styles';

interface FilterWrapperProps extends WithStyles<typeof styles> {
  filter: JSX.Element;
  keyValue: string;
}

export const FilterWrapperBase: React.SFC<FilterWrapperProps> = (props) => {
  const {classes, filter, keyValue} = props;

  return (
    <Grid item xs={12} sm={6} md={4} key={keyValue}>
      {filter}
    </Grid>
  );

};

export const FilterWrapper = withStyles(styles)(FilterWrapperBase);
