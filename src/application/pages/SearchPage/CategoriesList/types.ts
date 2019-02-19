import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { FilterValue, TLocalizedName } from 'src/interfaces/searchPageData/index';
import { TCategoryId } from 'src/application/pages/SearchPage/types';
import { ICategory } from 'src/interfaces/category/index';

export interface ICategoriesListProps extends WithStyles<typeof styles> {
    categories: FilterValue[];
    categoriesTree: ICategory[];
    selectedCategory: TCategoryId;
    localizedName: TLocalizedName | null;
}

export interface IActiveFilterCategories {
    [key: string]: number;
}
