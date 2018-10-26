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
export type TActiveFilters = {[name: string]: string[]};
export type TActiveRangeFilters = {[name: string]: RangeType};
export type TFilterItemName = string;
export type TFilterItemValue = number | string;

export interface SearchPageState {
  activeFilters: TActiveFilters;
  activeRangeFilters: TActiveRangeFilters;
  sort: string;
  selectedCategory: TCategoryId;
}

export interface IFilterItem {
  name: TFilterItemName;
  value: TFilterItemValue;
}
