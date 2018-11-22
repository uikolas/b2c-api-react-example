import { WithStyles } from '@material-ui/core';
import { RouteProps } from 'react-router';
import { styles } from './styles';
import { FlyoutSearch } from 'src/shared/interfaces/searchPageData';
import { TAppCurrency } from 'src/shared/reducers/Common/Init';

export interface CatalogProps extends WithStyles<typeof styles>, RouteProps, FlyoutSearch {
  // connect
  currency?: TAppCurrency;
  isLoading?: boolean;
  id?: string;

  sendSuggestionAction?(query: string): void;
  clearSuggestions?(query: string): void;
  sendSearchAction?(params: any): void;
  getProductDataAction?(sku: string): void;
  push?(query: string): void;
}

export interface CatalogState {
  value: string;
  completionValue?: string;
  heightListItem: number;
}
