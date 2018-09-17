
import {IProductCard} from "../productCard/index";

export interface ISearchPageData {
  suggestions: Array<IProductCard> | null;
  items: Array<IProductCard> | null;
  searchTerm: string | null;
  currency: string | null;
  selectedProduct: object;
}
