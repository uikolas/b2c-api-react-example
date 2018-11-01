import * as React from 'react';
import {ChangeEvent} from "react";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';

import { styles } from './styles';
import {IPagination} from "./types";


interface AppPaginationProps extends WithStyles<typeof styles> {
  pagination: IPagination;
  onChangeHandler: (event: ChangeEvent<{}>, value: any) => void;
  maxActions?: number;
}

export const AppPaginationBase: React.SFC<AppPaginationProps> = (props) => {
  const {
    classes,
    pagination,
    pagination: {
      currentPage,
      maxPage,
    },
    onChangeHandler,
    maxActions = 5,
  } = props;

  if (!currentPage) {
    return null;
  }

  const pages: JSX.Element[] = [];

  const start = currentPage <= maxActions ? 1 : currentPage - (maxActions - 1);
  const end = maxPage > maxActions
    ? currentPage <= maxActions ? maxActions : currentPage
    : maxPage;

  for (let i = start; i <= end; i++) {
    pages.push(
      <BottomNavigationAction
        showLabel
        label={i}
        value={i}
        key={`page-${i}`}
        className={classes.pageNumber}
      />);
  }

  pages.push(
    <BottomNavigationAction
      showLabel
      icon={ <ChevronRight/> }
      value="next"
      key="next"
      className={classes.pageNumber}
    />,
  );

  pages.unshift(
    <BottomNavigationAction
      showLabel
      icon={ <ChevronLeft/> }
      value="prev"
      key="prev"
      className={classes.pageNumber}
    />,
  );

  return (
    <Grid container justify="center" alignItems="center" className={ classes.root }>
      <BottomNavigation
        value={ pagination.currentPage }
        onChange={ onChangeHandler }
        className={ classes.pagesContainer }
      >
        {pages}
      </BottomNavigation>
    </Grid>
  );
};

export const AppPagination = withStyles(styles)(AppPaginationBase);
