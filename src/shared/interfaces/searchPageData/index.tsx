
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

export interface ISearchPageData {
  dispatch?: Function;
  suggestions?: Array<IProductCard>;
  items?: Array<IProductCard>;
  filters?: Array<ValueFacets>;
  rangeFilters?: Array<RangeFacets>;
  searchTerm?: string;
  currency?: string;
}
