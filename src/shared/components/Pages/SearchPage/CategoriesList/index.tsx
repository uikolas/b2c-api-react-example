import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';

import { styles } from './styles';
import {ListItemProps} from "@material-ui/core/es/ListItem";

interface CategoriesListProps extends WithStyles<typeof styles> {
  categoryList: Array<React.ComponentType<ListItemProps>>;
}

const title = 'Categories';

export const CategoriesListBase: React.SFC<CategoriesListProps> = (props) => {
  const { classes, categoryList} = props;

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
        <List
          component="nav"
          className={ classes.list }
        >
          { categoryList }
        </List>
      </Grid>
    </Grid>
  );

};

export const CategoriesList = withStyles(styles)(CategoriesListBase);
