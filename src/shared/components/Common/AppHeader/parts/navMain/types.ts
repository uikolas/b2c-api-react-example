import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import {ICategory} from "src/shared/interfaces/category";

export interface MainNavProps extends WithStyles<typeof styles> {
  categoriesTree: ICategory[];
  mobileNavState: boolean;
}
