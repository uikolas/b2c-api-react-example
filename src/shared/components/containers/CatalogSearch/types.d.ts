import { WithStyles } from '@material-ui/core';
import { RouteProps } from 'react-router';
import { styles } from './styles';
import { FlyoutSearch, ISearchQuery } from 'src/shared/interfaces/searchPageData/index';
import { ICategory } from '@interfaces/category';
import { TAppCurrency } from 'src/shared/interfaces/currency/index';

export interface CatalogProps extends WithStyles<typeof styles>, RouteProps, FlyoutSearch {
    // connect
    currency: TAppCurrency;
    isLoading: boolean;
    id: string;
    categoriesTree: ICategory[] | null;

    sendSuggestionAction(query: string): void;

    clearSuggestions(query: string): void;

    sendSearchAction(params: ISearchQuery): void;

    getProductDataAction(sku: string): void;

    push(query: string): void;
}

export interface CatalogState {
    value: string;
    completionValue?: string;
    heightListItem: number;
}
