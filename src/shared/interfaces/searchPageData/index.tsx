import { IProductCard } from '../product';
import { TAppCurrency } from '../../reducers/Common/Init';
import { IPagination } from 'src/shared/components/Common/AppPagination/types';
import {TCategoryId} from "src/shared/components/Pages/SearchPage/types";

export type TSpellingSuggestion = string;
export type TLocalizedName = string;
export type TDocCount = number;
export type TLabelId = string;

export interface FilterValue {
  value: string | number;
  doc_count: TDocCount | null;
}

export interface ValueFacets {
  name: string;
  docCount: TDocCount | null;
  values: Array<FilterValue>;
  activeValue: string | null;
  localizedName: TLocalizedName;
}

export interface RangeFacets {
  name: string;
  min: number;
  max: number;
  activeMin: number;
  activeMax: number;
  docCount: TDocCount | null;
  localizedName: TLocalizedName;
}

export interface FlyoutSearch {
  suggestions: Array<IProductCard> | null;
  categories: Array<{[name: string]: string}> | null;
  completion: string[] | null;
  pending: boolean;
}

export interface IProductLabelResponse {
  type: string;
  id: string;
}

export interface IAvailableLabel {
  id: string;
  frontEndReference: string;
  isExclusive: boolean;
  name: string;
  position: number;
}

export interface IProductsLabeledCollection {
  [id: string]: Array<TLabelId>;
}

export interface IAvailableLabelsCollection {
  [id: string]: IAvailableLabel;
}

export interface ILocalizedNamesMap {
  [key: string]: TLocalizedName;
}

export interface ICatalogSearchDataParsed {
  items: Array<IProductCard> | null;
  filters: Array<ValueFacets> | null;
  category: Array<FilterValue>;
  currentCategory: string | null;
  currentSort: string | null;
  rangeFilters: Array<RangeFacets> | null;
  sortParams: Array<string> | null;
  sortParamLocalizedNames: ILocalizedNamesMap | null;
  categoriesLocalizedName: TLocalizedName | null;
  pagination: IPagination;
  spellingSuggestion: TSpellingSuggestion | null;
  productsLabeled: IProductsLabeledCollection | null;
  availableLabels: IAvailableLabelsCollection | null;
}

export interface ISearchPageData extends ICatalogSearchDataParsed {
  dispatch?: Function;
  flyoutSearch?: FlyoutSearch;
  searchTerm?: string;
  currency?: TAppCurrency;
}

export interface ISearchQuery {
  q?: string;
  currency?: TAppCurrency;
  sort?: string;
  category?: TCategoryId;
  ipp?: number;
  label?: string;
  page?: string | number;
  [key: string]: string | number | string[];
}
