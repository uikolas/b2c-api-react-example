import { WithStyles } from '@material-ui/core';
import { RouteProps } from 'react-router';
import { styles } from './styles';
import { Category } from '../../../interfaces/searchPageData';
import { IProductCard } from '../../../interfaces/product';
import { TAppCurrency } from '../../../reducers/Common/Init';

export interface CatalogProps extends WithStyles<typeof styles>, RouteProps {
  // connect
  suggestions?: Array<IProductCard>;
  searchTerm?: string;
  categories?: Array<Category>;
  currency: TAppCurrency;
  isLoading?: boolean;

  sendSuggestionAction?(query: string): void;
  clearSuggestions?(query: string): void;
  sendSearchAction?(params: any): void;
  getProductDataAction?(sku: string): void;
  push?(query: string): void;
}

export interface CatalogState {
  value: string;
}
