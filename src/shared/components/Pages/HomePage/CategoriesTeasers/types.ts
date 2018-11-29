import {WithStyles} from '@material-ui/core/styles/withStyles';
import {categoriesTeasersStyles} from "./categoriesTeasersStyles";
import {ICategoriesTeasersData} from "src/shared/components/Pages/HomePage/types";


export interface ICategoriesTeasersProps extends WithStyles<typeof categoriesTeasersStyles> {
  teasers: Array<ICategoriesTeasersData>;
}
