import { IProductCard } from '../product';
import { TAppCurrency } from '../../reducers/Common/Init';

export type TSpellingSuggestion = string;

interface FilterValue {
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

interface Pagination {
  numFound: number;
  currentPage: number;
  maxPage: number;
  currentItemsPerPage: number;
  validItemsPerPageOptions: number[];
}

export interface Category {
  nodeId?: number | string;
  order?: number | string;
  name?: string;
  children?: Array<Category> | object;
}

export interface ISearchPageData {
  dispatch?: Function;
  suggestions?: Array<IProductCard>;
  items?: Array<IProductCard>;
  filters?: Array<ValueFacets>;
  rangeFilters?: Array<RangeFacets>;
  searchTerm?: string;
  currency?: TAppCurrency;
  sortParams?: Array<string>;
  currentSort?: string;
  pagination: Pagination;
  categoriesTree: Array<Category>;
  category: Array<FilterValue>;
  categories: Array<{[name: string]: string}>;
  currentCategory: string;
  spellingSuggestion: TSpellingSuggestion | null;
}
