import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { IProductCard, TProductCurrency } from 'src/interfaces/product/index';
import { IAvailableLabelsCollection, IProductsLabeledCollection } from 'src/interfaces/searchPageData/index';

export interface IProductsListProps extends WithStyles<typeof styles> {
    products: IProductCard[];
    selectProductHandler: Function;
    currency: TProductCurrency;
    isLoading: boolean;
    productsLabeled: IProductsLabeledCollection | null;
    availableLabels: IAvailableLabelsCollection | null;
}
