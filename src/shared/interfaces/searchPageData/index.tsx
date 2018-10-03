
import {IProductCard} from "../product";

interface FilterValue {
  value: any;
  doc_count: number;
}

interface ValueFacets {
  name?: string;
  docCount?: any;
  values?: Array<FilterValue>
}

interface RangeFacets {
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
}

interface Category {
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
  sortParams?: Array<string>;
  pagination: Pagination;
  categories: Array<Category>
}
