
import {IProductCard} from "../productCard/index";

export interface ISearchPageData {
  items: Array<IProductCard> | null;
  searchTerm: string | null;
  currency: string | null;
}
