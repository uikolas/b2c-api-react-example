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

  let start = currentPage <= maxActions ? 1 : currentPage - (maxActions - 1);
  let end = maxPage > maxActions
    ? currentPage <= maxActions ? maxActions : currentPage
    : maxPage;

  if (currentPage > 3 && maxPage > maxActions) {
    start = currentPage - 2;
  }

  for (let i = start; i <= end; i++) {
    pages.push(
      <BottomNavigationAction
        showLabel
        label={i}
        value={i}
        key={`page-${i}`}
        classes={{
          root: classes.item,
          selected: classes.selected,
          label: classes.label,
        }}
      />);
  }

  return (
    <Grid container justify="center" alignItems="center" className={ classes.root }>
      <Grid item xs>
        <BottomNavigation
          value={currentPage}
          onChange={ onChangeHandler }
          classes={{
            root: classes.container
          }}
        >
          <BottomNavigationAction
            showLabel
            icon={ <ChevronLeft/> }
            value="prev"
            key="prev"
            classes={{
              root: `${classes.item} ${classes.itemLeft}`,
              wrapper: classes.wrapper,
            }}
          />
          {pages}
          <BottomNavigationAction
            showLabel
            icon={ <ChevronRight/> }
            value="next"
            key="next"
            classes={{
              root: `${classes.item} ${classes.itemRight}`,
              wrapper: classes.wrapper,
            }}
          />
        </BottomNavigation>
      </Grid>
    </Grid>
  );
};

export const AppPagination = withStyles(styles)(AppPaginationBase);
