import { IProductCard } from '../product';
import { TAppCurrency } from '../../reducers/Common/Init';

export type TSpellingSuggestion = string;

export interface FilterValue {
  value: any;
  doc_count: number;
}

export interface ValueFacets {
  name?: string;
  docCount?: any;
  values?: Array<FilterValue>;
  activeValue?: Array<string> | null;
}

export interface RangeFacets {
  name?: string;
  min?: number;
  max?: number;
  activeMin?: number;
  activeMax?: number;
  docCount?: any;
}

export interface ISearchPagination {
  numFound: number;
  currentPage: number;
  maxPage: number;
  currentItemsPerPage: number;
  validItemsPerPageOptions: number[];
}

export interface FlyoutSearch {
  suggestions?: Array<IProductCard>;
  categories?: Array<{[name: string]: string}>;
  completion?: string[];
  pending?: boolean;
}

export interface ISearchPageData {
  dispatch?: Function;
  flyoutSearch?: FlyoutSearch;
  items?: Array<IProductCard>;
  filters?: Array<ValueFacets>;
  rangeFilters?: Array<RangeFacets>;
  searchTerm?: string;
  currency?: TAppCurrency;
  sortParams?: Array<string>;
  currentSort?: string;
  pagination: ISearchPagination;
  category: Array<FilterValue>;
  currentCategory: string;
  spellingSuggestion: TSpellingSuggestion | null;
}
