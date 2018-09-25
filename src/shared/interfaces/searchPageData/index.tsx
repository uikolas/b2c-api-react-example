
import {IProductCard} from "../product/index";

export interface ISearchPageData {
  dispatch?: Function;
  suggestions?: Array<IProductCard>;
  items?: Array<IProductCard>;
  searchTerm?: string;
  currency?: string;
}
