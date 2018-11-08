import { WithStyles } from '@material-ui/core/styles/withStyles';
import {styles} from "./styles";
import {IProductCard, TProductCurrency} from "src/shared/interfaces/product/index";
import {IAvailableLabelsCollection, IProductsLabeledCollection} from "src/shared/interfaces/searchPageData/index";


export interface IProductsListProps extends WithStyles<typeof styles> {
  products: Array<IProductCard>;
  selectProductHandler: Function;
  currency: TProductCurrency;
  isLoading: boolean;
  productsLabeled: IProductsLabeledCollection | null;
  availableLabels: IAvailableLabelsCollection | null;
}
