
import {IProductCard} from "../productCard/index";

export interface ISearchPageData {
  dispatch?: Function;
  suggestions?: Array<IProductCard>;
  items?: Array<IProductCard>;
  searchTerm?: string;
  currency?: string;
}
