import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { styles } from './styles';
import { SearchPageContext } from '../context';
import { ICategoryItemProps } from 'src/shared/components/Pages/SearchPage/CategoryItem/types';


export const CategoryItemBase: React.SFC<ICategoryItemProps> = (props) => {
  const {
    classes,
    displayName,
    categoryValue,
    isSelected,
  } = props;

  return (
    <SearchPageContext.Consumer>
      { ({selectCategoryHandler}) => (
        <div className={ classes.listItemOuter }>
          <ListItem
            button
            onClick={ (event: React.MouseEvent<HTMLElement>) => selectCategoryHandler(categoryValue)(event) }
            selected={ isSelected }
            className={ classes.categoryItem }
            disableGutters
            classes={ {root: classes.root, selected: classes.selected} }
          >
            <ListItemText
              disableTypography
              classes={ {root: classes.categoryItemText} }
              primary={ displayName }
            />
          </ListItem>
        </div>
      ) }
    </SearchPageContext.Consumer>
  );
};

export const CategoryItem = withStyles(styles)(CategoryItemBase);
