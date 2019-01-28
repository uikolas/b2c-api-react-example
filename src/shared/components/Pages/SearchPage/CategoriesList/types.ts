import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import {FilterValue, TLocalizedName} from 'src/shared/interfaces/searchPageData';
import { TCategoryId } from 'src/shared/components/Pages/SearchPage/types';
import {ICategory} from "src/shared/interfaces/category";


export interface ICategoriesListProps extends WithStyles<typeof styles> {
  categories: Array<FilterValue>;
  categoriesTree: Array<ICategory>;
  selectedCategory: TCategoryId;
  localizedName: TLocalizedName | null;
}

export interface IActiveFilterCategories {
  [key: string]: number;
}
