import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { styles } from './styles';
import {SearchPageContext} from '../context';
import {TCategoryId} from "src/shared/components/Pages/SearchPage/types";

interface CategoryItemProps extends WithStyles<typeof styles> {
  categoryValue: TCategoryId;
  displayName: string;
  isSelected: boolean;
}

export const CategoryItemBase: React.SFC<CategoryItemProps> = (props) => {
  const {
    classes,
    displayName,
    categoryValue,
    isSelected,
  } = props;

  return (
    <SearchPageContext.Consumer>
      {({selectCategoryHandler}) => (
        <div className={classes.listItemOuter}>
          <ListItem
            button
            onClick={(event: React.MouseEvent<HTMLElement>) => selectCategoryHandler(categoryValue)(event)}
            selected={isSelected}
            className={classes.categoryItem}
            disableGutters
            classes={{root: classes.root, selected: classes.selected}}
          >
            <ListItemText
              disableTypography
              classes={{root: classes.categoryItemText}}
              primary={displayName}
            />
        </ListItem>
        </div>
      ) }
    </SearchPageContext.Consumer>
  );
};

export const CategoryItem = withStyles(styles)(CategoryItemBase);
