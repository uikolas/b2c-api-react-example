import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';

import { styles } from './styles';
import { FilterValue } from 'src/shared/interfaces/searchPageData';
import { CategoryItem } from 'src/shared/components/Pages/SearchPage/CategoryItem';
import { AppPageSubTitle } from 'src/shared/components/Common/AppPageSubTitle';
import { ICategoriesListProps } from 'src/shared/components/Pages/SearchPage/CategoriesList/types';


const title = 'Categories';

export const CategoriesListBase: React.SFC<ICategoriesListProps> = (props) => {
  const {
    classes,
    categories,
    categoriesTree,
    selectedCategory,
  } = props;

  if (!Array.isArray(categories) || !categories.length) {
    return null;
  }

  const categoryList = categories.map((category: FilterValue) => {
    let name: string;
    const searchName = (leaf: any) => {
      if (leaf.nodeId === category.value) {
        name = leaf.name;
        return true;
      }
      if (Array.isArray(leaf.children) && leaf.children.length) {
        return leaf.children.some(searchName);
      }
      return false;
    };
    categoriesTree.some(searchName);
    if (!name) {
      return null;
    }
    return (
      <CategoryItem
        key={ `category-${category.value}` }
        categoryValue={ category.value }
        isSelected={ (+selectedCategory) === category.value }
        displayName={ `${name} (${category.doc_count})` }
      />
    );
  });

  return (
    <Grid container
          justify="flex-start"
          alignItems="center"
          className={ classes.root }
    >
      <Grid item xs={ 12 }>
        <AppPageSubTitle title={ title } extraClass={ classes.title }/>
        <List component="nav" className={ classes.list }>
          { categoryList }
        </List>
      </Grid>
    </Grid>
  );
};

export const CategoriesList = withStyles(styles)(CategoriesListBase);
