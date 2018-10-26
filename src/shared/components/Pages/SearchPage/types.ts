import { TAppCurrency } from 'src/shared/reducers/Common/Init';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { ISearchPageData } from 'src/shared/interfaces/searchPageData';

export type IQuery = {
  q?: string,
  currency: TAppCurrency,
  sort?: string,
  [key: string]: string | number,
};

export interface SearchPageProps extends WithStyles<typeof styles>, ISearchPageData {
  isLoading: boolean;
  changeLocation: Function;
}

export type RangeType = {min: number, max: number};
export type TCategoryId = number | string;

export interface SearchPageState {
  activeFilters: {[name: string]: string[]};
  activeRangeFilters: {[name: string]: RangeType};
  sort: string;
  selectedCategory: number | string;
}
